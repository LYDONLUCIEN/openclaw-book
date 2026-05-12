import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Brain, Globe, BookOpen, Shield, Users, PiggyBank } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide19_Summary: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.summary-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.summary-recap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, 0.3)
        .fromTo('.summary-conclusion', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15 }, 1.0)
        .fromTo('.summary-quote', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6 }, 1.6)
        .fromTo('.summary-path', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1.9)
        .fromTo('.summary-cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 2.2);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="summary-title text-center mb-8">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">总结：从问题到解决方案</h2>
      </div>

      {/* Three problems recap */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl w-full mb-8">
        {[
          { icon: Brain, color: 'var(--primary)', label: '记忆问题', solutions: '渐进式披露 + 上下文压缩 + Harness工程' },
          { icon: BookOpen, color: 'var(--success)', label: '知识问题', solutions: 'RAG + 知识图谱 + Skills' },
          { icon: Globe, color: 'var(--accent)', label: '行动问题', solutions: 'MCP协议 + 工作流 + Tools' },
        ].map((item, i) => (
          <div key={i} className="summary-recap rounded-xl p-5 border-2" style={{ borderColor: item.color, backgroundColor: `${item.color}08` }}>
            <div className="flex items-center gap-2 mb-2">
              <item.icon className="w-5 h-5" style={{ color: item.color }} strokeWidth={2} />
              <span className="text-h3 font-bold" style={{ color: item.color }}>{item.label}</span>
            </div>
            <p className="text-body-sm text-[var(--text-secondary)]">{item.solutions}</p>
          </div>
        ))}
      </div>

      <p className="summary-recap text-body font-semibold text-[var(--text-primary)] mb-8 text-center">
        解决了这三个问题 → 大模型进化为AI Agent（ReAct循环）
      </p>

      {/* Three conclusions */}
      <div className="space-y-4 max-w-3xl w-full mb-8">
        {[
          { icon: Brain, title: '模型底座决定Agent的"智商"', desc: '优先建设内部大模型能力' },
          { icon: Globe, title: '浏览器自动化是打通内部系统的关键', desc: 'Agent + RPA升级是必要路径' },
          { icon: BookOpen, title: 'Skills生态决定Agent的"专业能力"', desc: '内部Skills仓库建设是当务之急' },
        ].map((item, i) => (
          <div key={i} className="summary-conclusion flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-accent)] flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-body font-bold text-[var(--text-primary)]">{item.title}</h4>
              <p className="text-body-sm text-[var(--text-secondary)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="summary-quote max-w-3xl w-full rounded-2xl p-6 mb-8 text-center" style={{ background: 'linear-gradient(135deg, var(--bg-accent), var(--bg-secondary))', border: '1px solid var(--border)' }}>
        <p className="text-h3 font-bold text-[var(--primary)] mb-2">
          "Agent不是取代人类，而是增强人类"
        </p>
        <p className="text-body text-[var(--text-secondary)]">
          碳硅协同 — 每个人都可以通过指挥多个Agent成为"超级个体"
        </p>
      </div>

      {/* Deployment path */}
      <div className="summary-path flex items-center justify-center gap-2 mb-6">
        {['试点', '验证', '持久化技能', '规模化'].map((step, i) => (
          <React.Fragment key={i}>
            <div className="px-4 py-2 rounded-full text-caption font-bold text-white" style={{ backgroundColor: 'var(--primary)' }}>
              {step}
            </div>
            {i < 3 && <span className="text-[var(--text-light)]">→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* CTA */}
      <div className="summary-cta px-8 py-3 rounded-full text-body font-bold text-white" style={{ background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}>
        🚀 今天就选一个高频重复任务，让Agent试运行！
      </div>

      <div className="max-w-3xl w-full mt-6">
        <ExpandableSection toggleLabel="组织保障建议" hintText="点击展开">
          <div className="space-y-3">
            <div className="flex items-start gap-2"><Users className="w-4 h-4 text-[var(--primary)] mt-1" /><div><strong>人才培养</strong>：设立"Agent指挥官"角色，培养Agent使用和技能开发能力</div></div>
            <div className="flex items-start gap-2"><Shield className="w-4 h-4 text-[var(--primary)] mt-1" /><div><strong>安全合规</strong>：审计日志 + 最小权限原则 + 人工审核机制</div></div>
            <div className="flex items-start gap-2"><PiggyBank className="w-4 h-4 text-[var(--primary)] mt-1" /><div><strong>成本管理</strong>：内部模型优先 + 设置每日预算上限</div></div>
          </div>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide19_Summary);
