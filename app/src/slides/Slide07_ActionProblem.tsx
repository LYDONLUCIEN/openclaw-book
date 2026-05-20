import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageSquare, Wrench, ChevronDown } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const PROMPT_BLOCKS = [
  { label: '角色', color: '#8B5CF6', content: '你是一个资深的电信客户服务专家，拥有 10 年以上运营商投诉处理经验。' },
  { label: '场景', color: '#3B82F6', content: '用户投诉手机信号差，表示"在家完全打不了电话"。' },
  { label: '业务知识', color: '#10B981', content: '常见信号差原因有：①基站距离过远(>2km) ②建筑物遮挡(高层/地下室) ③SIM卡老化 ④基站设备故障 ⑤频段不匹配' },
  { label: '举例', color: '#F59E0B', content: '参考案例：张先生住在XX小区3楼，信号仅1格。排查发现距最近基站3.2km，建议开通VoWiFi。' },
  { label: '输出要求', color: '#EF4444', content: '请按以下步骤回复：\n1. 先确认用户所在位置和信号情况\n2. 排查最可能的原因(按概率排序)\n3. 给出具体解决方案(含操作步骤)' },
];

const FC_RESPONSE = `{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": null,
      "function_call": {
        "name": "query_signal_coverage",
        "arguments": "{\\"location\\": \\"朝阳区望京SOHO\\", \\"radius\\": 2000}"
      }
    }
  }]
}`;

const FC_FUNCTION = `{
  "name": "query_signal_coverage",
  "description": "查询指定位置的基站信号覆盖情况",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "具体位置地址"
      },
      "radius": {
        "type": "number",
        "description": "查询半径(米)"
      }
    },
    "required": ["location"]
  }
}`;

const Slide07_ActionProblem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'prompt' | 'fc'>('prompt');

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v1-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v1-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v1-tabs', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
      gsap.fromTo('.v1-props', { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v1-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, tab] });

  const highlightJson = (text: string, highlights: string[]) => {
    const parts: { text: string; isHighlight: boolean }[] = [];
    let remaining = text;
    while (remaining.length > 0) {
      let earliest = remaining.length;
      let earliestHighlight = '';
      for (const h of highlights) {
        const idx = remaining.indexOf(h);
        if (idx !== -1 && idx < earliest) {
          earliest = idx;
          earliestHighlight = h;
        }
      }
      if (earliestHighlight && earliest < remaining.length) {
        if (earliest > 0) parts.push({ text: remaining.substring(0, earliest), isHighlight: false });
        parts.push({ text: earliestHighlight, isHighlight: true });
        remaining = remaining.substring(earliest + earliestHighlight.length);
      } else {
        parts.push({ text: remaining, isHighlight: false });
        break;
      }
    }
    return parts;
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v1-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v1.0 人工教学</h2>
        <span className="v1-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#10B981' }}>绿装</span>
      </div>

      <div className="v1-props flex items-center gap-3 mb-3 opacity-0">
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--success)10', color: 'var(--success)' }}>确定性 ↑</span>
        <span className="text-caption text-[var(--text-light)]">完备性 ·</span>
        <span className="text-caption text-[var(--text-light)]">便利性 ·</span>
      </div>

      {/* Tabs */}
      <div className="v1-tabs flex gap-2 mb-4 opacity-0">
        <button
          className={`px-4 py-2 rounded-lg text-body-sm font-bold transition-all ${tab === 'prompt' ? 'text-white' : ''}`}
          style={tab === 'prompt'
            ? { backgroundColor: '#10B981' }
            : { backgroundColor: '#10B98110', color: '#10B981' }}
          onClick={(e) => { e.stopPropagation(); setTab('prompt'); }}>
          <MessageSquare size={14} className="inline mr-1" />Prompt 示例
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-body-sm font-bold transition-all ${tab === 'fc' ? 'text-white' : ''}`}
          style={tab === 'fc'
            ? { backgroundColor: '#10B981' }
            : { backgroundColor: '#10B98110', color: '#10B981' }}
          onClick={(e) => { e.stopPropagation(); setTab('fc'); }}>
          <Wrench size={14} className="inline mr-1" />Function-call 示例
        </button>
      </div>

      {/* Content */}
      <div className="v1-content max-w-3xl w-full">
        {tab === 'prompt' && (
          <div className="space-y-2">
            <p className="text-caption text-[var(--text-secondary)] mb-3">
              一个标准的 Prompt 由五个要素组成，每个要素用不同色块标注：
            </p>
            {PROMPT_BLOCKS.map((block, i) => (
              <div key={i} className="rounded-lg border-l-4 p-3" style={{
                borderColor: block.color,
                backgroundColor: `${block.color}08`,
              }}>
                <span className="text-caption font-bold px-1.5 py-0.5 rounded inline-block mb-1"
                  style={{ backgroundColor: `${block.color}20`, color: block.color }}>
                  {block.label}
                </span>
                <p className="text-body-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed">{block.content}</p>
              </div>
            ))}
            <div className="rounded-xl border-2 p-3 mt-3 text-center" style={{ borderColor: 'var(--success)30', backgroundColor: 'var(--success)05' }}>
              <p className="text-body-sm text-[var(--text-primary)]">
                <span className="font-bold" style={{ color: 'var(--success)' }}>局限：</span>
                Prompt 不能无限长——知识写不全，工具描述塞不下，指令无法覆盖所有情况
              </p>
            </div>
          </div>
        )}

        {tab === 'fc' && (
          <div className="space-y-4">
            {/* Tool Definition */}
            <div>
              <p className="text-caption text-[var(--text-secondary)] mb-2">
                先定义一个工具接口，告诉模型有哪些能力可以调用：
              </p>
              <div className="rounded-xl border p-3 overflow-x-auto" style={{ borderColor: '#10B98140', backgroundColor: '#0d1117' }}>
                <pre className="text-caption font-mono leading-relaxed" style={{ color: '#c9d1d9' }}>
                  {highlightJson(FC_FUNCTION, [
                    '"query_signal_coverage"',
                    '"查询指定位置的基站信号覆盖情况"',
                    '"location"', '"具体位置地址"', '"radius"', '"查询半径(米)"',
                  ]).map((part, i) => (
                    <span key={i} style={part.isHighlight ? { color: '#10B981', fontWeight: 'bold' } : {}}>{part.text}</span>
                  ))}
                </pre>
              </div>
            </div>

            {/* Model Response */}
            <div>
              <p className="text-caption text-[var(--text-secondary)] mb-2">
                模型理解需求后，自动决定调用工具——注意它输出了 <code className="px-1 rounded" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>function_call</code> 而非文字：
              </p>
              <div className="rounded-xl border p-3 overflow-x-auto" style={{ borderColor: '#F59E0B40', backgroundColor: '#0d1117' }}>
                <pre className="text-caption font-mono leading-relaxed" style={{ color: '#c9d1d9' }}>
                  {highlightJson(FC_RESPONSE, [
                    '"function_call"',
                    '"query_signal_coverage"',
                    '"arguments"',
                    '"朝阳区望京SOHO"',
                    '"radius"',
                  ]).map((part, i) => (
                    <span key={i} style={part.isHighlight ? { color: '#F59E0B', fontWeight: 'bold' } : {}}>{part.text}</span>
                  ))}
                </pre>
              </div>
            </div>

            <div className="rounded-xl border-2 p-3 text-center" style={{ borderColor: 'var(--success)30', backgroundColor: 'var(--success)05' }}>
              <p className="text-body-sm text-[var(--text-primary)]">
                <span className="font-bold" style={{ color: 'var(--success)' }}>确定性↑</span>：工具调用比自然语言更可靠
              </p>
              <p className="text-caption text-[var(--text-light)] mt-1">
                但工具不能全塞进 Prompt——工具多了 AI 也会混乱
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide07_ActionProblem);
