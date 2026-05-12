import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Brain, Cpu, Bot, Wrench, Globe, Database, Zap, Users, BarChart3, Shield } from 'lucide-react';
import Badge from '@/components/Badge';

interface SlideProps { isActive: boolean; }

const Slide18_Status: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.status-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.status-left', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.3)
        .fromTo('.status-right', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 0.4)
        .fromTo('.status-path', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.7);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="status-title text-center mb-10">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">我们已有的AI能力</h2>
        <p className="text-body text-[var(--text-secondary)] mt-2">聚智智能体平台 + 磐匠数字员工</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* 聚智智能体平台 */}
        <div className="status-left rounded-2xl p-7 border-2 border-[var(--primary)] bg-[var(--bg-accent)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-h2 font-bold text-[var(--primary)]">聚智智能体平台</h3>
              <span className="text-caption text-[var(--text-secondary)]">Agent能力中枢</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: Database, label: '300+ 模型接入', desc: 'MoMA平台智能路由' },
              { icon: Wrench, label: '150+ 内置行业技能', desc: 'MobileClaw框架' },
              { icon: Cpu, label: '九天大模型', desc: '全栈自控，适配17个国产AI芯片' },
              { icon: Globe, label: '多渠道部署', desc: '内网环境安全运行' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-primary)]">
                <item.icon className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <span className="text-body-sm font-semibold text-[var(--text-primary)]">{item.label}</span>
                  <p className="text-caption text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 磐匠数字员工 */}
        <div className="status-right rounded-2xl p-7 border-2 border-[var(--secondary)] bg-[var(--bg-accent)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-[var(--secondary)] flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-h2 font-bold text-[var(--secondary)]">磐匠数字员工</h3>
              <span className="text-caption text-[var(--text-secondary)]">RPA自动化基座</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { icon: Users, label: '17,000+ 数字员工', desc: '年节省70万人天' },
              { icon: Zap, label: '"观摩式"无代码生成', desc: '降低使用门槛' },
              { icon: BarChart3, label: 'RPA → IPA → Agent', desc: '持续演进升级' },
              { icon: Shield, label: '浏览器自动化', desc: '打通内部系统壁垒' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-primary)]">
                <item.icon className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <span className="text-body-sm font-semibold text-[var(--text-primary)]">{item.label}</span>
                  <p className="text-caption text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 升级路径 */}
      <div className="status-path mt-10 max-w-4xl w-full rounded-2xl p-6 bg-[var(--bg-secondary)] border border-[var(--border)]">
        <h4 className="text-h3 font-bold text-[var(--text-primary)] text-center mb-4">Agent升级路径</h4>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { label: '九天大模型', color: 'var(--primary)', sub: '模型底座' },
            { label: '聚智平台', color: 'var(--secondary)', sub: '技能市场' },
            { label: 'OpenClaw/Hermes', color: 'var(--accent)', sub: 'Agent框架' },
            { label: '磐匠RPA', color: 'var(--success)', sub: '浏览器自动化' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center px-5 py-3 rounded-xl border-2 min-w-[120px]" style={{ borderColor: item.color, backgroundColor: `${item.color}10` }}>
                <span className="text-body-sm font-bold" style={{ color: item.color }}>{item.label}</span>
                <span className="text-caption text-[var(--text-light)]">{item.sub}</span>
              </div>
              {i < 3 && <span className="text-[var(--text-light)] text-2xl">+</span>}
            </React.Fragment>
          ))}
          <span className="text-2xl text-[var(--text-light)]">=</span>
          <Badge variant="accent">企业级AI Agent</Badge>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide18_Status);
