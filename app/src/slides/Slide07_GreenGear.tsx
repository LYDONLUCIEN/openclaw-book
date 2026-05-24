import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FileText, Code, ArrowUp, CheckCircle } from 'lucide-react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean }

const PROMPT_ITEMS = [
  { label: '角色定义', detail: '明确模型扮演的身份与专业领域，约束输出视角' },
  { label: '任务描述', detail: '精确描述期望完成的任务目标与交付物' },
  { label: '格式约束', detail: '规定输出的结构、长度、编码等格式要求' },
  { label: '示例引导', detail: '提供 Few-shot 示例，校准模型输出模式' },
  { label: '边界限定', detail: '明确任务边界与拒绝条件，避免越界输出' },
];

const GREEN = '#10B981';

const Slide07_GreenGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.gg-title', { opacity: 0, y: -25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.gg-badge', { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)', delay: 0.15 });
      gsap.fromTo('.gg-columns', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.35 });
      gsap.fromTo('.gg-stats', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('.gg-analogy', { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <h2 className="gg-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={1} />
        v1.0 绿装 — 人工教学
      </h2>

      {/* Version badge */}
      <div className="gg-badge inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 opacity-0"
        style={{ backgroundColor: `${GREEN}15`, border: `1px solid ${GREEN}40` }}>
        <span className="text-caption font-bold" style={{ color: GREEN }}>Green Gear</span>
      </div>

      {/* Two-column content */}
      <div className="gg-columns grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full opacity-0">

        {/* Left: Prompt Engineering */}
        <div className="rounded-xl border-2 p-5 md:p-6"
          style={{ borderColor: GREEN, backgroundColor: `${GREEN}06` }}>
          <div className="flex items-center gap-2 mb-4">
            <FileText size={22} style={{ color: GREEN }} />
            <h3 className="text-h3 font-bold" style={{ color: GREEN }}>提示词工程 Prompt Engineering</h3>
          </div>

          <div className="space-y-2.5">
            {PROMPT_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg"
                style={{ backgroundColor: `${GREEN}08` }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: GREEN }}>{i + 1}</span>
                <div>
                  <span className="text-body-sm font-bold text-[var(--text-primary)]">{item.label}</span>
                  <span className="text-caption text-[var(--text-light)] block">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <CheckCircle size={16} style={{ color: GREEN }} />
            <span className="text-body-sm font-bold" style={{ color: GREEN }}>通过结构化输入降低意图模糊度</span>
          </div>
        </div>

        {/* Right: Function Call */}
        <div className="rounded-xl border-2 p-5 md:p-6"
          style={{ borderColor: GREEN, backgroundColor: `${GREEN}06` }}>
          <div className="flex items-center gap-2 mb-4">
            <Code size={22} style={{ color: GREEN }} />
            <h3 className="text-h3 font-bold" style={{ color: GREEN }}>函数调用 Function Call</h3>
          </div>

          <div className="rounded-lg p-4 font-mono text-caption leading-relaxed mb-3"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div className="text-[var(--text-light)] text-[11px] mb-2">// 工具定义结构</div>
            <span style={{ color: '#8B5CF6' }}>tools</span>
            <span className="text-[var(--text-secondary)]">: [{'{'}</span>
            <br />
            <span className="ml-4" style={{ color: '#8B5CF6' }}>name</span>
            <span className="text-[var(--text-secondary)]">: </span>
            <span style={{ color: GREEN }}>"get_weather"</span>
            <span className="text-[var(--text-secondary)]">,</span>
            <br />
            <span className="ml-4" style={{ color: '#8B5CF6' }}>description</span>
            <span className="text-[var(--text-secondary)]">: </span>
            <span style={{ color: GREEN }}>"查询指定城市天气"</span>
            <span className="text-[var(--text-secondary)]">,</span>
            <br />
            <span className="ml-4" style={{ color: '#8B5CF6' }}>parameters</span>
            <span className="text-[var(--text-secondary)]">: {'{'}</span>
            <br />
            <span className="ml-8" style={{ color: '#F59E0B' }}>city</span>
            <span className="text-[var(--text-secondary)]">: </span>
            <span style={{ color: '#3B82F6' }}>string</span>
            <span className="text-[var(--text-secondary)]"> (required),</span>
            <br />
            <span className="ml-8" style={{ color: '#F59E0B' }}>unit</span>
            <span className="text-[var(--text-secondary)]">: </span>
            <span style={{ color: '#3B82F6' }}>string</span>
            <br />
            <span className="ml-4 text-[var(--text-secondary)]">{'}'}</span>
            <br />
            <span className="text-[var(--text-secondary)]">{'}'}]</span>
          </div>

          <p className="text-[11px] text-[var(--text-light)] leading-relaxed mb-3">
            模型通过结构化 JSON Schema 定义外部工具接口，实现确定性输出与系统对接，避免自由文本解析的不确定性。
          </p>

          <div className="flex items-center gap-2">
            <CheckCircle size={14} style={{ color: GREEN }} />
            <span className="text-caption font-bold" style={{ color: GREEN }}>通过结构化输出接口提升处理确定性</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="gg-stats mt-5 flex items-center gap-6 flex-wrap justify-center opacity-0">
        <div className="flex items-center gap-2">
          <span className="text-body font-bold" style={{ color: GREEN }}>确定性↑</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body font-bold" style={{ color: GREEN }}>完备性↑</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body font-bold text-[var(--text-secondary)]">便利性·</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg"
          style={{ backgroundColor: '#F59E0B10' }}>
          <ArrowUp size={14} style={{ color: '#F59E0B' }} />
          <span className="text-caption font-bold" style={{ color: '#F59E0B' }}>操作成本↑（需精心构造 Prompt）</span>
        </div>
      </div>

      {/* Analogy */}
      <div className="gg-analogy mt-4 text-center opacity-0">
        <p className="text-caption text-[var(--text-light)]">
          类比：手把手教学 —— 每一步都需要人工明确指令
        </p>
      </div>
    </section>
  );
};

export default memo(Slide07_GreenGear);
