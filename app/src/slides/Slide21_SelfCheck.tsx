import React, { useRef, memo, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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
  collab:   { tag: '分工合作', color: '#10B981', bg: '#D1FAE5', border: '#A7F3D0', dot: '#10B981' },
  loop:     { tag: '人在回路', color: '#EF4444', bg: '#FEE2E2', border: '#FECACA', dot: '#EF4444' },
  '':       { tag: '待确认',   color: '#94A3B8', bg: '#F1F5F9', border: '#E2E8F0', dot: '#94A3B8' },
};

// ── 决策矩阵（右侧表格） ──
const MATRIX_ROWS = [
  { condition: '<b>内网敏感</b> 或 <b>高准确性</b>', plan: '人在回路', reason: '安全/正确性优先，人工校验兜底' },
  { condition: '<b>未闭环</b>（人也不知道怎么做）', plan: '继续氪金', reason: '龙虾当老师，增加开发成本学习验证' },
  { condition: '<b>频繁</b> + <b>值得开发</b>', plan: '分工合作', reason: '持续沉淀知识/文档，越用越稳' },
  { condition: '<b>有定时需求</b>', plan: '分工合作', reason: '适合自动化调度与稳定运行' },
  { condition: '<b>不值得开发</b> 或 <b>低频</b>', plan: '继续氪金', reason: '用更强模型快速降低不确定性' },
  { condition: '其他组合', plan: '分工合作', reason: '默认沉淀过程，长期提效' },
];

interface Answers {
  dataScope: string | null;
  frequency: string | null;
  accuracy: string | null;
  devWorth: string | null;
  closedLoop: string | null;
  timed: string | null;
}

const Slide21_SelfCheck: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Answers>({
    dataScope: null,
    frequency: null,
    accuracy: null,
    devWorth: null,
    closedLoop: null,
    timed: null,
  });
  const [result, setResult] = useState<RecKey>('');
  const [resultWhy, setResultWhy] = useState('');

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
    // 选择后清空旧结果
    setResult('');
    setResultWhy('');
  }, []);

  const handleReset = useCallback(() => {
    setAnswers({ dataScope: null, frequency: null, accuracy: null, devWorth: null, closedLoop: null, timed: null });
    setResult('');
    setResultWhy('');
  }, []);

  const handleCompute = useCallback(() => {
    const { dataScope, frequency, accuracy, devWorth, closedLoop, timed } = answers;

    if (!dataScope || !frequency || !accuracy || !devWorth || !closedLoop || !timed) {
      setResult('');
      setResultWhy('请先完成全部 6 个问题的选择。');
      return;
    }

    // 优先级 1：安全/正确性
    if (dataScope === 'internal' || accuracy === 'high') {
      setResult('loop');
      setResultWhy(`你选择了 <b>${dataScope === 'internal' ? '内网/敏感数据' : '高准确性'}</b>，数据风险或准确性要求更高。<br/>推荐 <b>人在回路</b>：让人对关键结果持续校验、拦截错误与兜底。`);
      return;
    }

    // 优先级 2：未闭环
    if (closedLoop === 'no') {
      setResult('continue');
      setResultWhy('你选择了 <b>未闭环</b>——人自己也不完全知道该怎么做。<br/>推荐 <b>继续氪金</b>：让龙虾当老师，增加开发成本来学习和验证。');
      return;
    }

    // 优先级 3：频繁 + 值得开发
    if (frequency === 'often' && devWorth === 'yes') {
      setResult('collab');
      setResultWhy('你选择了 <b>频繁使用</b> 且 <b>值得投入开发</b>。<br/>推荐 <b>分工合作</b>：持续沉淀知识/文档，让模型越用越稳。');
      return;
    }

    // 优先级 4：有定时需求
    if (timed === 'yes') {
      setResult('collab');
      setResultWhy('你选择了 <b>有定时需求</b>。<br/>推荐 <b>分工合作</b>：适合自动化调度与稳定运行，沉淀流程。');
      return;
    }

    // 优先级 5：不值得开发 或 低频
    if (devWorth === 'no' || frequency === 'rare') {
      setResult('continue');
      setResultWhy('你选择了 <b>不值得开发</b> 或 <b>低频</b>。<br/>推荐 <b>继续氪金</b>：用更强模型快速降低不确定性并上线。');
      return;
    }

    // 兜底
    setResult('collab');
    setResultWhy('综合判断未触发强约束，默认 <b>分工合作</b>：把过程沉淀下来，长期提效。');
  }, [answers]);

  const allAnswered = Object.values(answers).every(v => v !== null);
  const meta = REC_META[result];
  const answeredCount = Object.values(answers).filter(v => v !== null).length;

  return (
    <section ref={containerRef}
      className="w-full h-[100dvh] flex flex-col items-center pt-14 pb-16 px-4 md:px-6 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* ── 标题 ── */}
      <h2 className="sc-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-0.5 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={3} />
        方案自评
      </h2>
      <p className="sc-subtitle text-body-sm text-[var(--text-secondary)] text-center mb-3 opacity-0">
        按 6 个问题依次选择，系统给出推荐方案
      </p>

      {/* ── 两栏布局 ── */}
      <div className="sc-left sc-right max-w-6xl w-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 items-start opacity-0">

        {/* ══ 左：6 个问题 ══ */}
        <div className="rounded-xl border p-3 flex flex-col gap-1.5"
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
            <span className="text-[10px] text-[var(--text-light)]">未选完 6 项前给出"待确认"</span>
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

        {/* ══ 右：推荐 + 矩阵 ══ */}
        <div className="flex flex-col gap-2.5">

          {/* 推荐结果 */}
          <div className="rounded-xl border p-3 flex flex-col gap-2"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.25)' }} />
              <span className="text-body-sm font-bold text-[var(--text-primary)]">推荐与解释</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-body-sm font-bold text-[var(--text-primary)]">推荐主方案</span>
              <span className="px-3 py-1 rounded-full text-caption font-bold"
                style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
                {meta.tag}
              </span>
            </div>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: resultWhy || '请先在左侧完成 1~6 的选择。' }} />

            <div className="text-[10px] text-[var(--text-light)] leading-relaxed p-1.5 rounded-lg"
              style={{ backgroundColor: 'var(--bg-primary)' }}>
              <b className="text-[var(--text-secondary)]">三类方案含义</b><br />
              <span style={{ color: REC_META.continue.color }}>继续氪金</span>：换更强模型/更确定性实现，提升开发成本来降低不确定性<br />
              <span style={{ color: REC_META.collab.color }}>分工合作</span>：多人协作调度与知识沉淀，让模型越做越好<br />
              <span style={{ color: REC_META.loop.color }}>人在回路</span>：对结果持续校验、兜底与签发
            </div>
          </div>

          {/* 决策矩阵 */}
          <div className="rounded-xl border p-2.5 flex flex-col"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <span className="text-body-sm font-bold text-[var(--text-primary)] mb-1.5">压缩版决策表（复核用）</span>
            <table className="w-full text-[10px]">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="py-1 px-2 text-left font-bold text-[var(--text-secondary)]" style={{ width: '38%', backgroundColor: 'var(--bg-primary)' }}>关键条件</th>
                  <th className="py-1 px-2 text-left font-bold text-[var(--text-secondary)]" style={{ width: '32%', backgroundColor: 'var(--bg-primary)' }}>倾向方案</th>
                  <th className="py-1 px-2 text-left font-bold text-[var(--text-secondary)]" style={{ width: '30%', backgroundColor: 'var(--bg-primary)' }}>原因</th>
                </tr>
              </thead>
                <tbody>
                  {MATRIX_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="py-1 px-2 text-[var(--text-primary)]" dangerouslySetInnerHTML={{ __html: row.condition }} />
                      <td className="py-1 px-2 font-bold text-[var(--text-primary)]">{row.plan}</td>
                      <td className="py-1 px-2 text-[var(--text-light)]">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide21_SelfCheck);
