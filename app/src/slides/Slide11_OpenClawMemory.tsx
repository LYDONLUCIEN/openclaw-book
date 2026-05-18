import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { GitBranch, Cpu, Smartphone, Layers } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const ARCH = [
  {
    name: 'Gateway', subtitle: '通信枢纽', icon: GitBranch, color: '#3B82F6',
    desc: '所有 AI 通信统一经过 Gateway',
    points: ['清晰可追溯：每条请求响应完整记录', '可控可审计：拦截、过滤、限流', '协议标准化：后端切换模型无感'],
  },
  {
    name: 'Node', subtitle: '执行节点', icon: Cpu, color: '#10B981',
    desc: '将 AI 操作封装为标准化节点',
    points: ['可规划：输入输出明确', '确定性更强：结果可预测', '性能更好：可并行、可缓存'],
  },
  {
    name: 'Channel', subtitle: '用户通道', icon: Smartphone, color: '#F59E0B',
    desc: '打通各种用户触达渠道',
    points: ['多渠道：企微/飞书/钉钉/邮件一键接入', '统一体验：AI 能力和记忆完全一致', '用户无感：不关心背后是哪个模型'],
  },
  {
    name: 'Memory', subtitle: '记忆系统', icon: Layers, color: '#8B5CF6',
    desc: '四层记忆：Session → User → Tools → Soul',
    points: ['会话记忆：当前对话上下文', '用户记忆：偏好和历史经验', '工具记忆：工具使用经验', '灵魂记忆：Agent 核心身份'],
  },
];

const Slide11_OpenClawMemory: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.a11-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.a11-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.a11-card', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || expanded === null || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.a11-detail', { opacity: 0 }, { opacity: 1, duration: 0.25 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, expanded] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="a11-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        龙虾的更多能力
      </h2>
      <p className="a11-subtitle text-body text-[var(--text-secondary)] mb-5 max-w-2xl text-center opacity-0">
        除了核心的 Skills 和 Harness，OpenClaw 还有这些重要的架构设计。点击展开详情。
      </p>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {ARCH.map((item, i) => {
          const Icon = item.icon;
          const isExp = expanded === i;
          return (
            <div key={i}
              className={`a11-card rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${isExp ? 'ring-1 col-span-1 md:col-span-2' : ''}`}
              style={{ borderColor: isExp ? item.color : `${item.color}60`, backgroundColor: isExp ? `${item.color}08` : `${item.color}04` }}
              onClick={(e) => { e.stopPropagation(); setExpanded(isExp ? null : i); }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-bold" style={{ color: item.color }}>{item.name}</span>
                    <span className="text-caption text-[var(--text-light)]">{item.subtitle}</span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
                </div>
              </div>

              {isExp && (
                <div className="a11-detail mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                  {item.points.map((pt, j) => (
                    <div key={j} className="rounded-lg p-2.5" style={{ backgroundColor: `${item.color}06` }}>
                      <p className="text-caption text-[var(--text-primary)]">{pt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-caption text-[var(--text-light)] mt-5">
        这些架构 + Skills + Harness = OpenClaw 火爆的完整原因
      </p>
    </section>
  );
};

export default memo(Slide11_OpenClawMemory);
