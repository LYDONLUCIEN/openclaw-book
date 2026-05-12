import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, User, Wrench, Brain } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const PYRAMID = [
  { name: 'Session 会话层', icon: Sparkles, desc: '当前对话实时上下文', example: '"用户刚说：帮我查一下今天的告警"', color: '#94A3B8', width: '100%' },
  { name: 'USER 用户层', icon: User, desc: '用户偏好，MEMORY.md持久化', example: '"用户偏好简体中文，关注网络KPI"', color: '#00B4D8', width: '80%' },
  { name: 'TOOLS 工具层', icon: Wrench, desc: 'Skills动态渐进式加载', example: '"当前加载：日报生成 + 告警查询"', color: '#10B981', width: '60%' },
  { name: 'SOUL 灵魂层', icon: Brain, desc: 'Agent身份，永久存储', example: '"你是网络运维专家Agent，风格简洁专业"', color: '#0066CC', width: '40%' },
];

const Slide11_OpenClawMemory: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.mem-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      // Build pyramid from bottom up
      const layers = containerRef.current!.querySelectorAll('.pyr-layer');
      gsap.fromTo(layers, { opacity: 0, scaleY: 0, transformOrigin: 'bottom center' }, { opacity: 1, scaleY: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.3)', delay: 0.3 });
      gsap.fromTo('.mem-process', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5, delay: 1.2 });
      gsap.fromTo('.mem-detail', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.5 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="mem-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">四层记忆系统</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">从身份到实时 — Agent如何"记住"一切</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6 max-w-5xl w-full mb-6">
        {/* Pyramid */}
        <div className="md:col-span-3 flex flex-col-reverse items-center gap-2">
          {PYRAMID.map((layer, i) => (
            <div key={i} className="pyr-layer rounded-xl p-4 border-2 transition-all duration-300 hover:scale-[1.02]" style={{ width: layer.width, borderColor: layer.color, background: `linear-gradient(135deg, ${layer.color}10, ${layer.color}05)` }}>
              <div className="flex items-center gap-2 mb-1">
                <layer.icon className="w-4 h-4" style={{ color: layer.color }} strokeWidth={2} />
                <span className="text-body-sm font-bold" style={{ color: layer.color }}>{layer.name}</span>
              </div>
              <p className="text-caption text-[var(--text-secondary)]">{layer.desc}</p>
              <p className="text-caption text-[var(--text-light)] mt-1 italic">{layer.example}</p>
            </div>
          ))}
        </div>

        {/* Retrieval process */}
        <div className="md:col-span-2">
          <h4 className="text-h3 font-bold text-[var(--text-primary)] mb-3">记忆检索过程</h4>
          <div className="mem-process space-y-2">
            {['用户提问', 'SOUL提供身份约束', 'TOOLS加载相关Skills', 'USER提供偏好', 'Session提供当前上下文', '综合生成回答'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-body-sm">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-caption font-bold text-white flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}>{i + 1}</span>
                <span className="text-[var(--text-primary)]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mem-detail grid grid-cols-3 gap-3 max-w-3xl w-full mb-4">
        {[
          { label: '预压缩机制', desc: '长对话自动摘要保留关键信息' },
          { label: '语义搜索', desc: 'Embedding + BM25混合检索' },
          { label: '检索延迟', desc: '平均200ms' },
        ].map((d, i) => (
          <div key={i} className="rounded-lg p-3 bg-[var(--bg-secondary)] border border-[var(--border)] text-center">
            <p className="text-body-sm font-bold text-[var(--text-primary)]">{d.label}</p>
            <p className="text-caption text-[var(--text-secondary)]">{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl w-full">
        <ExpandableSection toggleLabel="为什么Harness工程（SOUL层）很重要？" hintText="点击展开">
          <p className="text-body-sm text-[var(--text-secondary)]">SOUL层是Agent的"身份锚点"。没有SOUL，模型在长对话中容易偏离角色定位，产生不一致的行为。Harness工程通过预设约束（如"你是XX专家"、"回答风格简洁"等），减少模型的无效探索空间，从根本上降低了上下文消耗。这和渐进式披露、上下文压缩一起构成了记忆管理的三板斧。</p>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide11_OpenClawMemory);
