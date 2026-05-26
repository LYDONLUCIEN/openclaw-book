import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cloud, Server, Layers } from 'lucide-react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const CLAW_COLS = [
  {
    title: '云厂商方案',
    subtitle: '云端虾',
    icon: Cloud,
    color: '#3B82F6',
    desc: '托管服务，开箱即用，7*24小时在线',
    claws: [
      { name: 'ArkClaw', img: 'ArkClaw.png' },
      { name: 'KimiClaw', img: 'kimiclaw.png' },
      { name: 'MaxClaw', img: 'MaxClaw.png' },
      { name: 'DuClaw', img: 'duClaw.png' },
    ],
  },
  {
    title: '本机部署方案',
    subtitle: '本地虾',
    icon: Server,
    color: '#F97316',
    desc: '自有服务器，完全可控，操作范围最广',
    claws: [
      { name: 'AutoClaw', img: 'autoClaw.png' },
      { name: 'WorkClaw', img: 'workbuddy.png' },
      { name: 'OpenClaw', img: 'openClaw.png' },
      { name: 'EasyClaw', img: 'easyclaw.jpg' },
    ],
  },
  {
    title: '生态推荐方案',
    subtitle: '生态虾',
    icon: Layers,
    color: '#8B5CF6',
    desc: '社区方案，快速上手，产品生态内无敌',
    claws: [
      { name: 'QClaw', img: 'QClaw.png' },
      { name: '360Claw', img: '360claw.png' },
      { name: 'MiClaw', img: 'miclaw.png' },
      { name: 'RedClaw', img: 'RedClaw.png' },
    ],
  },
];

const RECOMMENDS = [
  {
    name: 'QClaw',
    img: 'QClaw.png',
    color: '#8B5CF6',
    tag: '首推 · 免费',
    desc: '最便宜，最简单，免费白嫖，微信友好',
  },
  {
    name: 'ArkClaw',
    img: 'ArkClaw.png',
    color: '#3B82F6',
    tag: '打工人 · 友好',
    desc: '24小时在线，飞书工具生态完整，',
  },
  {
    name: 'AutoClaw',
    img: 'autoClaw.png',
    color: '#F97316',
    tag: '本地 · 实用',
    desc: '浏览器自动化，安装快，能力强',
  },
  {
    name: 'OpenClaw',
    img: 'openClaw.png',
    color: '#10B981',
    tag: '折腾 · 上限高',
    desc: '迭代快，门槛高，能力上限也最高',
  },
];

const Slide14_DeployLevels: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.dl-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.dl-col', { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)', delay: 0.3 });
      gsap.fromTo('.dl-claw-item', { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.5)', delay: 0.8 });
      gsap.fromTo('.dl-recommend', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="dl-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-4 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={2} />
        翻过三座山（1）:部署龙虾
      </h2>

      {/* Three claw columns */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4">
        {CLAW_COLS.map((col) => {
          const Icon = col.icon;
          return (
            <div key={col.title}
              className="dl-col rounded-xl border-2 p-4 md:p-5 opacity-0"
              style={{ borderColor: `${col.color}50`, backgroundColor: `${col.color}08` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${col.color}15`, color: col.color }}>
                  <Icon size={16} />
                </div>
                <h3 className="text-body font-bold" style={{ color: col.color }}>{col.title}</h3>
                <span className="text-caption text-[var(--text-secondary)]">{col.subtitle}</span>
              </div>
              <p className="text-caption text-[var(--text-secondary)] mb-3">{col.desc}</p>

              {/* 2x2 claw grid */}
              <div className="grid grid-cols-2 gap-2">
                {col.claws.map((claw) => (
                  <div key={claw.name}
                    className="dl-claw-item rounded-lg border flex flex-col items-center justify-center p-2 aspect-square"
                    style={{ borderColor: `${col.color}20`, backgroundColor: `${col.color}05` }}>
                    <img src={`/images/claws/${claw.img}`} alt={claw.name}
                      className="w-full h-full object-contain" />
                    <span className="text-caption font-semibold mt-1" style={{ color: col.color }}>
                      {claw.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Four recommended claws */}
      <div className="max-w-6xl w-full">
        <p className="text-body-sm font-bold text-[var(--text-secondary)] mb-2 text-center">精选推荐</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RECOMMENDS.map((rec) => (
            <div key={rec.name}
              className="dl-recommend rounded-xl border-2 p-3 flex flex-col items-center text-center opacity-0 relative"
              style={{ borderColor: `${rec.color}40`, backgroundColor: `${rec.color}08` }}>
              {rec.name === 'QClaw' && (
                <svg className="absolute -top-1.5 -right-1.5 w-5 h-5 text-amber-400 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
              <img src={`/images/claws/${rec.img}`} alt={rec.name}
                className="w-12 h-12 object-contain mb-2" />
              <span className="text-body-sm font-bold mb-0.5" style={{ color: rec.color }}>{rec.name}</span>
              <span className="text-caption font-semibold px-2 py-0.5 rounded-full mb-1.5"
                style={{ backgroundColor: `${rec.color}15`, color: rec.color }}>
                {rec.tag}
              </span>
              <p className="text-caption text-[var(--text-secondary)]">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Slide14_DeployLevels);
