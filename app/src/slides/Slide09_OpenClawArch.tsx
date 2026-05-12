import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Server, Cpu, MessageSquare, Star } from 'lucide-react';
import DataCard from '@/components/DataCard';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const CHANNELS = ['飞书', '钉钉', '企微', 'QQ', 'Telegram', 'Slack', 'Discord', 'WhatsApp', 'iMessage'];
const LAYERS = [
  { icon: Server, name: 'Gateway 网关', role: '大脑', desc: '始终运行，协调一切，路由请求', color: '#0066CC' },
  { icon: Cpu, name: 'Node 节点', role: '手脚', desc: '执行具体任务，调用工具，运行Skills', color: '#10B981' },
  { icon: MessageSquare, name: 'Channel 渠道', role: '感官', desc: '20+平台消息接入', color: '#FF6B35' },
];

const Slide09_OpenClawArch: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [starCount, setStarCount] = useState(0);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.arch-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.arch-layer', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, delay: 0.3 });
      gsap.fromTo('.arch-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useEffect(() => {
    if (!isActive) return;
    const end = 278932; const dur = 2000; const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / dur, 1);
      setStarCount(Math.floor(end * progress));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="arch-title text-center mb-4">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">OpenClaw架构拆解</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">开源AI Agent操作系统 — 全球GitHub Star第一</p>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-data font-mono font-extrabold text-[var(--accent)]">{starCount.toLocaleString()}</span>
        <Star className="w-6 h-6 text-[var(--accent)]" strokeWidth={2} fill="var(--accent)" />
        <span className="text-body-sm text-[var(--text-secondary)]">发布不到4个月</span>
      </div>

      <div className="max-w-3xl w-full space-y-3 mb-6">
        {LAYERS.map((l, i) => (
          <div key={i} className="arch-layer rounded-xl p-5 border-2" style={{ borderColor: l.color, background: `linear-gradient(135deg, ${l.color}08, var(--bg-primary))` }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${l.color}15` }}>
                <l.icon className="w-5 h-5" style={{ color: l.color }} strokeWidth={2} />
              </div>
              <div>
                <span className="text-h3 font-bold" style={{ color: l.color }}>{l.name}</span>
                <span className="text-caption text-[var(--text-light)] ml-2">— "{l.role}"</span>
              </div>
            </div>
            <p className="text-body-sm text-[var(--text-secondary)] ml-13">{l.desc}</p>
            {i === 2 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-13">
                {CHANNELS.map((ch) => (
                  <span key={ch} className="px-2 py-0.5 rounded text-caption font-semibold" style={{ backgroundColor: `${l.color}10`, color: l.color }}>{ch}</span>
                ))}
              </div>
            )}
            {i < 2 && <div className="flex justify-center mt-2"><div className="w-0.5 h-4" style={{ backgroundColor: l.color, opacity: 0.3 }} /></div>}
          </div>
        ))}
      </div>

      <div className="arch-stats grid grid-cols-3 gap-4 max-w-3xl w-full mb-4">
        <DataCard value="13,729" label="注册Skills" suffix="个" />
        <DataCard value="100%" label="完全开源" />
        <DataCard value="20+" label="平台接入" suffix="个" />
      </div>

      <div className="max-w-3xl w-full">
        <ExpandableSection toggleLabel="OpenClaw的设计哲学" hintText="点击展开">
          <p className="text-body-sm text-[var(--text-secondary)]">Unix哲学：只有4个核心工具（Read、Write、Edit、Bash），复杂功能通过Skills组合实现。Gateway常驻运行（loopback-first安全设计），Node按需启停，Channel即插即用。</p>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide09_OpenClawArch);
