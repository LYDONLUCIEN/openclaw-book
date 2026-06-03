import React, { useRef, memo, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

// ── 6 个判定问题 ──
const QUESTIONS = [
  {
    key: 'dataScope' as const,
    title: '数据范围',
    icon: '1',
    options: [
      { value: 'internal', label: '内网 / 敏感数据', hint: '需要更强隔离、可控与校验' },
      { value: 'public', label: '公网可开放数据', hint: '限制相对少，可更高效迭代' },
    ],
  },
  {
    key: 'frequency' as const,
    title: '使用频率',
    icon: '2',
    options: [
      { value: 'often', label: '频繁使用', hint: '值得沉淀流程与自动化' },
      { value: 'rare', label: '偶尔 / 低频', hint: '可先用轻量方案兜底' },
    ],
  },
  {
    key: 'accuracy' as const,
    title: '准确性要求',
    icon: '3',
    options: [
      { value: 'high', label: '高准确性', hint: '结果需要被严格校验 / 签发' },
      { value: 'low', label: '中低准确性', hint: '允许一定误差与迭代纠正' },
    ],
  },
  {
    key: 'devWorth' as const,
    title: '是否值得开发',
    icon: '4',
    options: [
      { value: 'yes', label: '值得投入开发', hint: '能做流程 / 工具 / 知识沉淀' },
      { value: 'no', label: '不值得 / 赶时间', hint: '优先降低不确定性成本' },
    ],
  },
  {
    key: 'closedLoop' as const,
    title: '是否已闭环',
    icon: '5',
    options: [
      { value: 'yes', label: '已闭环', hint: '人完全知道这件事该怎么做' },
      { value: 'no', label: '未闭环', hint: '流程不清晰，需要龙虾当老师' },
    ],
  },
  {
    key: 'timed' as const,
    title: '是否有定时需求',
    icon: '6',
    options: [
      { value: 'yes', label: '有定时需求', hint: '需固定时间触发或稳定运行' },
      { value: 'no', label: '无定时需求', hint: '按需手动触发即可' },
    ],
  },
];

// ── 三类方案 ──
type RecKey = 'continue' | 'collab' | 'loop' | '';

const REC_META: Record<string, { tag: string; color: string; bg: string; border: string; dot: string }> = {
  continue: { tag: '继续氪金', color: '#F59E0B', bg: '#FEF3C7', border: '#FDE68A', dot: '#F59E0B' },
  collab:   { tag: '扬长避短', color: '#10B981', bg: '#D1FAE5', border: '#A7F3D0', dot: '#10B981' },
  loop:     { tag: '人在回路', color: '#EF4444', bg: '#FEE2E2', border: '#FECACA', dot: '#EF4444' },
  '':       { tag: '待确认',   color: '#94A3B8', bg: '#F1F5F9', border: '#E2E8F0', dot: '#94A3B8' },
};

// ── 问题选项的中文映射 ──
const ANSWER_LABELS: Record<string, Record<string, string>> = {
  dataScope:  { internal: '内网/敏感数据', public: '公网可开放数据' },
  frequency:  { often: '频繁使用', rare: '偶尔/低频' },
  accuracy:   { high: '高准确性', low: '中低准确性' },
  devWorth:   { yes: '值得投入开发', no: '不值得/赶时间' },
  closedLoop: { yes: '已闭环', no: '未闭环' },
  timed:      { yes: '有定时需求', no: '无定时需求' },
};

const QUESTION_LABELS: Record<string, string> = {
  dataScope: '数据范围',
  frequency: '使用频率',
  accuracy: '准确性要求',
  devWorth: '是否值得开发',
  closedLoop: '是否已闭环',
  timed: '是否有定时需求',
};

interface Answers {
  dataScope: string | null;
  frequency: string | null;
  accuracy: string | null;
  devWorth: string | null;
  closedLoop: string | null;
  timed: string | null;
}

// ── API Key 管理 ──
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const API_KEY_STORAGE = 'deepseek_api_key';

function getStoredApiKey(): string {
  try { return localStorage.getItem(API_KEY_STORAGE) || ''; } catch { return ''; }
}
function setStoredApiKey(key: string) {
  try { localStorage.setItem(API_KEY_STORAGE, key); } catch { /* ignore */ }
}

// ── Prompt 模板 ──
import SYSTEM_PROMPT from '@/prompts/openclaw-guider.md?raw';

function buildPrompt(answers: Answers, primaryTag: string, secondaryTag: string, scenario: string): { system: string; user: string } {
  const system = SYSTEM_PROMPT.trim();
  const lines = Object.entries(answers).map(([key, value]) => {
    const qLabel = QUESTION_LABELS[key];
    const aLabel = value ? ANSWER_LABELS[key]?.[value] : '未选择';
    return `- ${qLabel}：${aLabel}`;
  });

  const tags = [primaryTag, secondaryTag].filter(Boolean).join(' + ');
  const scenarioPart = scenario.trim() ? `\n\n用户补充描述的场景：${scenario.trim()}` : '';

  const user = `用户根据以下 6 个维度评估了一个场景：\n${lines.join('\n')}\n\n系统推荐方案：${tags}${scenarioPart}\n\n请基于以上信息，给出具体的落地建议，包括：\n1. 当前阶段最应关注什么\n2. 具体可以怎么做\n3. 需要注意的风险或误区`;

  return { system, user };
}

// ── SSE 流式请求 ──
async function streamDeepSeek(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void,
  abortSignal: AbortSignal,
) {
  try {
    const res = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
      signal: abortSignal,
    });

    if (!res.ok) {
      if (res.status === 401) { onError('API Key 无效，请重新配置'); return; }
      onError(`请求失败 (${res.status})，请检查网络和 API Key`); return;
    }

    const reader = res.body?.getReader();
    if (!reader) { onError('无法读取响应流'); return; }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;
        if (!trimmed.startsWith('data: ')) continue;

        try {
          const json = JSON.parse(trimmed.slice(6));
          const content = json.choices?.[0]?.delta?.content;
          if (content) onChunk(content);
        } catch { /* skip malformed chunk */ }
      }
    }

    onDone();
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') return; // 正常取消
    onError('网络请求失败，请检查网络连接');
  }
}

const Slide21_SelfCheck: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Answers>({
    dataScope: null, frequency: null, accuracy: null,
    devWorth: null, closedLoop: null, timed: null,
  });
  const [result, setResult] = useState<RecKey>('');
  const [resultSecondary, setResultSecondary] = useState<RecKey>('');
  const [scenario, setScenario] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const aiScrollRef = useRef<HTMLDivElement>(null);

  // API Key state
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());
  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  const apiKeySaved = getStoredApiKey().length > 0;

  // 自动滚动 AI 回复
  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
    }
  }, [aiResponse]);

  // 入场动画
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.sc-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.sc-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 });
      gsap.fromTo('.sc-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.sc-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.4, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const handleSelect = useCallback((key: keyof Answers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setResult(''); setResultSecondary(''); setAiResponse(''); setAiError('');
  }, []);

  const handleReset = useCallback(() => {
    setAnswers({ dataScope: null, frequency: null, accuracy: null, devWorth: null, closedLoop: null, timed: null });
    setResult(''); setResultSecondary(''); setAiResponse(''); setAiError('');
    // 取消进行中的请求
    if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; }
    setAiLoading(false);
  }, []);

  const handleCompute = useCallback(() => {
    const { dataScope, frequency, accuracy, devWorth, closedLoop, timed } = answers;

    if (!dataScope || !frequency || !accuracy || !devWorth || !closedLoop || !timed) {
      setResult(''); setAiError(''); return;
    }

    // ── 组合决策逻辑 ──
    const needCheck = dataScope === 'internal' || accuracy === 'high';
    const isUnclosed = closedLoop === 'no';
    const isMature = frequency === 'often' && devWorth === 'yes';
    const hasSchedule = timed === 'yes';

    let primary: RecKey;
    let secondary: RecKey = '';

    if (isUnclosed) {
      primary = 'continue';
      if (needCheck) secondary = 'loop';
    } else {
      if (isMature) {
        primary = 'collab';
        if (needCheck) secondary = 'loop';
      } else if (!isMature && hasSchedule && devWorth === 'yes') {
        primary = 'collab';
        if (needCheck) secondary = 'loop';
      } else {
        primary = 'continue';
        if (needCheck) secondary = 'loop';
      }
    }

    setResult(primary);
    setResultSecondary(secondary);

    // ── 触发 AI 分析 ──
    const apiKey = getStoredApiKey();
    if (!apiKey) {
      setAiError('请先配置 API Key（右下角钥匙图标）');
      setAiResponse(''); setAiLoading(false);
      return;
    }

    // 取消上一次请求
    if (abortRef.current) { abortRef.current.abort(); }

    const abort = new AbortController();
    abortRef.current = abort;

    setAiLoading(true);
    setAiError('');
    setAiResponse('');

    const primaryTag = REC_META[primary].tag;
    const secondaryTag = secondary ? REC_META[secondary].tag : '';
    const { system: sysPrompt, user: usrPrompt } = buildPrompt(answers, primaryTag, secondaryTag, scenario);

    streamDeepSeek(
      apiKey, sysPrompt, usrPrompt,
      (chunk) => { setAiResponse(prev => prev + chunk); },
      () => { setAiLoading(false); abortRef.current = null; },
      (msg) => { setAiError(msg); setAiLoading(false); abortRef.current = null; },
      abort.signal,
    );
  }, [answers, scenario]);

  // ── API Key 保存 ──
  const handleSaveApiKey = useCallback(() => {
    setStoredApiKey(apiKeyInput.trim());
    setApiKeyOpen(false);
  }, [apiKeyInput]);

  const allAnswered = Object.values(answers).every(v => v !== null);
  const meta = REC_META[result];
  const secondaryMeta = resultSecondary ? REC_META[resultSecondary] : null;
  const answeredCount = Object.values(answers).filter(v => v !== null).length;

  return (
    <section ref={containerRef}
      className="w-full h-[100dvh] flex flex-col items-center pt-14 pb-16 px-4 md:px-6 overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* ── 标题 ── */}
      <h2 className="sc-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-0.5 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={3} />
        场景筛选与方案自评
      </h2>
      <p className="sc-subtitle text-body-sm text-[var(--text-secondary)] text-center mb-3 opacity-0">
        描述场景、完成判定，AI 给出落地建议
      </p>

      {/* ── 两栏布局 ── */}
      <div className="sc-left sc-right max-w-6xl w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch opacity-0">

        {/* ══ 左：场景输入 + 6 个问题 ══ */}
        <div className="flex flex-col gap-2.5 min-h-0">

          {/* 补充场景输入 */}
          <div className="rounded-xl border p-3 flex flex-col gap-1.5"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#8B5CF6', boxShadow: '0 0 0 3px rgba(139,92,246,0.25)' }} />
              <span className="text-body-sm font-bold text-[var(--text-primary)]">补充场景描述</span>
            </div>
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="描述你的具体场景，例如：每日自动汇总团队周报并发送邮件..."
              className="w-full rounded-lg border px-3 py-2 text-body-sm resize-none focus:outline-none transition-colors"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                minHeight: '56px',
                height: '56px',
              }}
              rows={2}
            />
          </div>

          {/* 6 个判定问题 */}
          <div className="rounded-xl border p-3 flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--primary)', boxShadow: '0 0 0 3px var(--primary)' }} />
              <span className="text-body-sm font-bold text-[var(--text-primary)]">判定路线（依次选择）</span>
              <span className="ml-auto text-caption text-[var(--text-light)]">{answeredCount}/6</span>
            </div>

            {QUESTIONS.map((q) => (
              <div key={q.key} className="rounded-lg border p-1.5 px-2"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-4 h-4 rounded text-[9px] font-bold text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--primary)' }}>{q.icon}</span>
                  <span className="text-caption font-bold text-[var(--text-primary)]">{q.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.key] === opt.value;
                    return (
                      <button key={opt.value}
                        onClick={() => handleSelect(q.key, opt.value)}
                        className="rounded-md border px-2 py-1 text-left transition-all duration-150"
                        style={{
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                          backgroundColor: isSelected ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                          boxShadow: isSelected ? '0 0 0 1px var(--primary)' : 'none',
                        }}>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                            style={{
                              borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                              backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                            }}>
                            {isSelected && <span className="w-1 h-1 rounded-full bg-white" />}
                          </span>
                          <span className="text-[11px] font-bold leading-tight"
                            style={{ color: isSelected ? 'var(--primary)' : 'var(--text-secondary)' }}>
                            {opt.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 操作按钮 */}
            <div className="flex items-center justify-between mt-1 pt-1.5" style={{ borderTop: '1px solid var(--border)' }}>
              <span className="text-[10px] text-[var(--text-light)]">完成后点击推荐，AI 自动分析</span>
              <div className="flex gap-2">
                <button onClick={handleReset}
                  className="px-3 py-1 rounded-lg text-caption font-bold transition-all"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', backgroundColor: 'transparent' }}>
                  清空
                </button>
                <button onClick={handleCompute}
                  className="px-3 py-1 rounded-lg text-caption font-bold text-white transition-all"
                  style={{ backgroundColor: allAnswered ? 'var(--primary)' : 'var(--text-light)' }}>
                  给出推荐
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 右：推荐结果 + AI 回复 ══ */}
        <div className="flex flex-col gap-2.5 min-h-0">

          {/* 推荐结果（仅 tags） */}
          <div className="rounded-xl border p-3"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.25)' }} />
              <span className="text-body-sm font-bold text-[var(--text-primary)]">推荐方案</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
                {meta.tag}
              </span>
              {secondaryMeta && (
                <>
                  <span className="text-caption text-[var(--text-light)]">+</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: secondaryMeta.bg, color: secondaryMeta.color, border: `1px solid ${secondaryMeta.border}` }}>
                    {secondaryMeta.tag}
                  </span>
                </>
              )}
            </div>
            <div className="text-[10px] text-[var(--text-light)] leading-relaxed p-1.5 rounded-lg mt-2"
              style={{ backgroundColor: 'var(--bg-primary)' }}>
              <b className="text-[var(--text-secondary)]">三类方案含义</b><br />
              <span style={{ color: REC_META.continue.color }}>继续氪金</span>：换更强模型/更确定性实现，提升开发成本来降低不确定性<br />
              <span style={{ color: REC_META.collab.color }}>扬长避短</span>：多人协作调度与知识沉淀，让模型越做越好<br />
              <span style={{ color: REC_META.loop.color }}>人在回路</span>：对结果持续校验、兜底与签发
            </div>
          </div>

          {/* AI 回复区域 */}
          <div className="rounded-xl border p-3 flex flex-col flex-1 min-h-0"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 0 3px rgba(59,130,246,0.25)' }} />
              <span className="text-body-sm font-bold text-[var(--text-primary)]">AI 分析建议</span>
              {aiLoading && (
                <span className="text-[10px] text-[var(--text-light)] animate-pulse">生成中...</span>
              )}
            </div>

            <div ref={aiScrollRef}
              className="flex-1 min-h-0 overflow-y-auto rounded-lg p-2.5 text-body-sm text-[var(--text-secondary)] leading-relaxed ai-markdown"
              style={{ backgroundColor: 'var(--bg-primary)' }}>
              {aiError ? (
                <span className="text-[#EF4444]">{aiError}</span>
              ) : aiResponse ? (
                <>
                  <Markdown remarkPlugins={[remarkGfm]}>{aiResponse}</Markdown>
                  <span className="inline-block w-[2px] h-[1em] ml-0.5 align-text-bottom animate-pulse" style={{ backgroundColor: aiLoading ? 'var(--primary)' : 'transparent' }} />
                </>
              ) : (
                <span className="text-[var(--text-light)]">完成左侧判定后，AI 将给出具体落地建议。</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 右下角 API Key 配置 ══ */}
      <div className="fixed bottom-[72px] right-4 md:right-6 z-50">
        <button onClick={() => setApiKeyOpen(!apiKeyOpen)}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-md hover:shadow-lg"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: apiKeySaved ? 'var(--bg-accent)' : 'var(--bg-secondary)',
          }}
          title="配置 DeepSeek API Key">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ color: apiKeySaved ? 'var(--primary)' : 'var(--text-light)' }}>
            <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </button>

        {apiKeyOpen && (
          <div className="absolute bottom-11 right-0 w-64 rounded-xl border p-3 shadow-lg"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="text-caption font-bold text-[var(--text-primary)] mb-1.5">DeepSeek API Key</div>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-..."
              className="w-full rounded-lg border px-2.5 py-1.5 text-body-sm focus:outline-none transition-colors mb-2"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSaveApiKey(); }}
            />
            <div className="flex gap-2">
              <button onClick={handleSaveApiKey}
                className="flex-1 px-2.5 py-1 rounded-lg text-caption font-bold text-white transition-all"
                style={{ backgroundColor: 'var(--primary)' }}>
                保存
              </button>
              <button onClick={() => setApiKeyOpen(false)}
                className="px-2.5 py-1 rounded-lg text-caption font-bold transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                关闭
              </button>
            </div>
            {apiKeySaved && (
              <div className="text-[10px] text-[var(--text-light)] mt-1.5 flex items-center gap-1">
                <span style={{ color: '#10B981' }}>&#10003;</span> 已保存
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide21_SelfCheck);
