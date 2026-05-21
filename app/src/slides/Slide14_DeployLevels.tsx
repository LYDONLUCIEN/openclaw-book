import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cloud, Server } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const DEPLOY_CARDS = [
  {
    title: '开箱即用方案',
    icon: Cloud,
    color: '#10B981',
    desc: '云电脑/预配置App下载，厂商托管运维',
    tag: '低门槛、高稳定性',
  },
  {
    title: '自主部署方案',
    icon: Server,
    color: '#F97316',
    desc: '自有服务器/容器化部署，完全可控',
    tag: '高灵活度、需运维投入',
  },
];

const LEVELS = [
  {
    level: 1,
    title: '人设对话',
    tag: '确定性 · 完备性↑',
    detail: '角色设定与知识注入',
    color: '#10B981',
  },
  {
    level: 2,
    title: '任务助理',
    tag: '完备性↑ 便利性↑',
    detail: '多轮对话完成任务',
    color: '#3B82F6',
  },
  {
    level: 3,
    title: '定时调度',
    tag: '便利性↑↑ 确定性·',
    detail: 'Cron自动化执行',
    color: '#8B5CF6',
  },
  {
    level: 4,
    title: '自主决策',
    tag: '三特性↑',
    detail: '自主规划执行，需监管兜底',
    color: '#F97316',
  },
];

const Slide14_DeployLevels: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.dl-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.dl-section-label', { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.15 });
      gsap.fromTo('.dl-deploy-card', { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)', delay: 0.4 });
      gsap.fromTo('.dl-level', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('.dl-level-arrow', { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, delay: 1.0 });
      gsap.fromTo('.dl-recommend', { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, delay: 1.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center justify-between pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="dl-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-6 opacity-0">
        部署方式与使用层级
      </h2>

      {/* Deploy Section */}
      <div className="w-full max-w-5xl mb-6 flex-1">
        <p className="dl-section-label text-body-sm font-bold mb-3 opacity-0"
          style={{ color: 'var(--text-secondary)' }}>
          部署方式
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEPLOY_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i}
                className="dl-deploy-card rounded-xl border-2 p-5 opacity-0"
                style={{
                  borderColor: card.color,
                  backgroundColor: `${card.color}06`,
                }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                    <Icon size={20} />
                  </div>
                  <span className="text-h3 font-bold" style={{ color: card.color }}>{card.title}</span>
                </div>
                <p className="text-body-sm text-[var(--text-primary)] mb-2 pl-1">
                  {card.desc}
                </p>
                <span className="inline-block rounded-full px-3 py-1 text-caption font-semibold"
                  style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                  {card.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage Levels Section */}
      <div className="w-full max-w-5xl mb-4 flex-1">
        <p className="dl-section-label text-body-sm font-bold mb-3 opacity-0"
          style={{ color: 'var(--text-secondary)' }}>
          四层使用模型
        </p>
        <div className="flex items-stretch justify-center gap-3 sm:gap-4">
          {LEVELS.map((lv, i) => (
            <React.Fragment key={i}>
              <div
                className="dl-level rounded-xl border-2 p-3 sm:p-4 flex-1 max-w-[180px] flex flex-col items-center text-center opacity-0"
                style={{
                  borderColor: lv.color,
                  backgroundColor: `${lv.color}06`,
                }}>
                <span className="text-body-sm font-bold mb-1" style={{ color: lv.color }}>
                  L{lv.level}
                </span>
                <span className="text-body-sm font-bold text-[var(--text-primary)] mb-1">
                  {lv.title}
                </span>
                <span className="text-caption text-[var(--text-secondary)] mb-1" style={{ fontSize: '10px' }}>
                  {lv.tag}
                </span>
                <span className="text-caption text-[var(--text-light)]" style={{ fontSize: '10px' }}>
                  {lv.detail}
                </span>
              </div>
              {i < LEVELS.length - 1 && (
                <div className="dl-level-arrow flex items-center opacity-0" style={{ color: 'var(--text-light)' }}>
                  <span className="text-body-sm font-bold">{'→'}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="dl-recommend rounded-xl border-2 p-3 max-w-4xl w-full text-center opacity-0"
        style={{ borderColor: '#F97316', backgroundColor: '#F9731608' }}>
        <p className="text-body-sm font-bold" style={{ color: '#F97316' }}>
          建议从L1起步验证，逐步向高层级迁移
        </p>
      </div>
    </section>
  );
};

export default memo(Slide14_DeployLevels);
