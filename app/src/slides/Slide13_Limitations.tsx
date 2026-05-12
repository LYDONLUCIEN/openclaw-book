import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Database, FileText, Globe, BarChart3, Settings, Calculator, AlertTriangle, Scale } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide13_Limitations: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.lim-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.lim-good', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3 });
      gsap.fromTo('.lim-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.5, delay: 0.8 });
      gsap.fromTo('.lim-bad', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 1.0 });
      gsap.fromTo('.lim-risk', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 1.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="lim-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">理性看待Agent</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">它很强，但不是万能的</p>
      </div>

      <div className="max-w-4xl w-full mb-4">
        <h3 className="text-h3 font-bold text-[var(--success)] mb-3">✅ Agent擅长的</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {[
            { icon: Database, label: '信息处理', desc: '文档总结、知识问答' },
            { icon: FileText, label: '内容生成', desc: '报告、邮件、代码' },
            { icon: Globe, label: '系统操作', desc: '浏览器自动化、API调用' },
            { icon: BarChart3, label: '数据分析', desc: '提取、清洗、可视化' },
            { icon: Settings, label: '流程自动化', desc: '定时任务、编排、审批' },
          ].map((item, i) => (
            <div key={i} className="lim-good flex items-start gap-2 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
              <item.icon className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div><p className="text-body-sm font-semibold text-[var(--text-primary)]">{item.label}</p><p className="text-caption text-[var(--text-secondary)]">{item.desc}</p></div>
            </div>
          ))}
        </div>

        <div className="lim-divider h-px my-4" style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }} />
        <p className="text-center text-body font-bold text-[var(--text-primary)] mb-3"><AlertTriangle className="w-4 h-4 inline text-[var(--accent)]" /> Agent = 超级助手，不是超级英雄</p>

        <h3 className="text-h3 font-bold text-[var(--accent)] mb-3">❌ Agent做不好的</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { icon: Calculator, label: '精确数学计算', desc: '大模型本质是概率模型' },
            { icon: Globe, label: '物理世界操作', desc: '无法直接操控硬件' },
            { icon: AlertTriangle, label: '创造性判断', desc: '战略决策需要人类' },
            { icon: Scale, label: '授权决策', desc: '人事财务需人类审批' },
          ].map((item, i) => (
            <div key={i} className="lim-bad flex items-start gap-2 p-3 rounded-lg border border-dashed" style={{ borderColor: 'var(--accent)' }}>
              <item.icon className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div><p className="text-body-sm font-semibold text-[var(--text-primary)]">{item.label}</p><p className="text-caption text-[var(--text-secondary)]">{item.desc}</p></div>
            </div>
          ))}
        </div>

        <h3 className="text-h3 font-bold text-red-500 mb-2">⚠️ 关键风险</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {['幻觉问题：模型会"一本正经地胡说八道"', '安全风险：ClawHavoc事件影响135,000+设备', '质量参差：OpenClaw超50% Skills为低质量', '成本陷阱：重度使用Claude API可达$800-1200/月'].map((r, i) => (
            <div key={i} className="lim-risk p-3 rounded-lg bg-red-50 border border-red-200 text-body-sm text-red-700">{r}</div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl w-full mt-4">
        <ExpandableSection toggleLabel="如何降低Agent的风险？" hintText="点击展开">
          <div className="space-y-1 text-body-sm text-[var(--text-secondary)]">
            <p>• 最小权限原则：Agent只访问必需的系统</p>
            <p>• 审计日志：所有操作留痕，可追溯</p>
            <p>• 人工审核：关键决策前由人类确认</p>
            <p>• 成本控制：内部模型优先，设置每日预算上限</p>
          </div>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide13_Limitations);
