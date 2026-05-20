import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Shield, ClipboardList, BarChart3, Sparkles } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const CHARACTERS = [
  {
    name: '传统代码开发',
    classType: '【重盾职业】执行者',
    icon: Shield,
    color: '#3B82F6',
    stats: { certainty: 95, completeness: 10, convenience: 85 },
    special: '绝对确定性',
    specialDesc: '逻辑完全可控，输出零偏差',
    pro: '结果100%可预测，边界最清晰',
    con: '覆盖场景窄，灵活度最低',
    tagline: '确定又可靠，但灵活度低',
  },
  {
    name: '工作流/低代码开发',
    classType: '【工匠职业】调度者',
    icon: ClipboardList,
    color: '#F97316',
    stats: { certainty: 90, completeness: 20, convenience: 75 },
    special: '流程确定性',
    specialDesc: '善用工具，流程标准化',
    pro: '流程可控，工具善用，输出确定',
    con: '使用者也是开发者，灵活性有限',
    tagline: '善用工具，但灵活度有限',
  },
  {
    name: '传统机器学习',
    classType: '【游侠职业】判断者',
    icon: BarChart3,
    color: '#10B981',
    stats: { certainty: 65, completeness: 35, convenience: 80 },
    special: '经验封装',
    specialDesc: '一套方法论应对各类问题',
    pro: '简单粗暴，可处理非结构化数据',
    con: '标注成本高，场景迁移难',
    tagline: '经验可封装，但标注成本高',
  },
  {
    name: '普通大模型',
    classType: '【法师职业】通才',
    icon: Sparkles,
    color: '#8B5CF6',
    stats: { certainty: 20, completeness: 90, convenience: 60 },
    special: '通用智能',
    specialDesc: '覆盖面极广，零门槛启动',
    pro: '零门槛使用，覆盖场景最多',
    con: '输出不确定性极高，需要用户反复纠正',
    tagline: '覆盖面最广，但不确定度极高',
  },
];

const BASE_VALUE = 35;

const Slide03_Ecosystem: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  // Phase 0: entrance animation
  useGSAP(() => {
    if (!isActive || phase !== 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.g3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.g3-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.g3-base-bars', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.5 });
      gsap.fromTo('.g3-hint', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 1.0 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  // Phase 1: cards animate in
  useGSAP(() => {
    if (!isActive || phase !== 1 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.g3-base-section', { opacity: 0, duration: 0.3 });
      gsap.fromTo('.g3-cards', { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.2 });
      CHARACTERS.forEach((_, i) => {
        const bars = containerRef.current!.querySelectorAll(`.g3-bar-fill-${i}`);
        bars.forEach((bar, j) => {
          const target = [CHARACTERS[i].stats.certainty, CHARACTERS[i].stats.completeness, CHARACTERS[i].stats.convenience][j];
          gsap.to(bar, { width: `${target}%`, duration: 0.6, ease: 'power3.out', delay: 0.4 + i * 0.1 });
        });
        gsap.fromTo(`.g3-card-${i}`, { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.3)', delay: 0.3 + i * 0.1 });
      });
      gsap.fromTo('.g3-footer', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  const statDefs = [
    { label: '确定性', name: 'Certainty', color: 'var(--success)' },
    { label: '完备性', name: 'Completeness', color: 'var(--accent)' },
    { label: '便利性', name: 'Convenience', color: 'var(--primary)' },
  ];

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase < 1 ? phase + 1 : 0)}>

      <h2 className="g3-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        游戏加点：职业图鉴
      </h2>
      <p className="g3-subtitle text-body text-[var(--text-secondary)] mb-5 opacity-0">
        四种技术路线，四种特性加点策略——各有擅长，也各有代价
      </p>

      {/* Phase 0: Three equal bars at 35 */}
      {phase === 0 && (
        <div className="g3-base-section opacity-0">
          <div className="g3-base-bars max-w-sm w-full rounded-xl border p-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <p className="text-body font-bold text-[var(--text-primary)] mb-4 text-center">
              我们希望系统同时具备三个特性
            </p>
            {statDefs.map((s) => (
              <div key={s.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-caption mb-1">
                  <span className="font-bold" style={{ color: s.color }}>{s.label}</span>
                  <span className="font-mono font-bold" style={{ color: s.color }}>{BASE_VALUE}</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
                  <div className="h-full rounded-full" style={{ width: `${BASE_VALUE}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <p className="g3-hint text-body text-[var(--text-light)] mt-5 text-center opacity-0">
            不同技术路线会在三个特性上有不同的侧重。点击查看 →
          </p>
        </div>
      )}

      {/* Phase 1: Four character cards with animated bars */}
      {phase === 1 && (
        <div className="g3-cards max-w-6xl w-full opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CHARACTERS.map((char, i) => {
              const Icon = char.icon;
              const statValues = [char.stats.certainty, char.stats.completeness, char.stats.convenience];
              return (
                <div key={i} className={`g3-card-${i} rounded-xl border-2 p-3 md:p-4 transition-all duration-300`}
                  style={{ borderColor: char.color, backgroundColor: `${char.color}06` }}>
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${char.color}15`, color: char.color }}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-body-sm font-bold text-[var(--text-primary)] block truncate">{char.name}</span>
                      <span className="text-caption" style={{ color: char.color }}>{char.classType}</span>
                    </div>
                  </div>

                  {/* Stats with animated bars */}
                  <div className="mb-2">
                    {statDefs.map((s, j) => (
                      <div key={s.label} className="mb-1">
                        <div className="flex justify-between text-caption">
                          <span className="font-bold" style={{ color: s.color }}>{s.label}</span>
                          <span className="font-mono" style={{ color: s.color }}>{statValues[j]}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${s.color}20` }}>
                          <div className={`g3-bar-fill-${i} h-full rounded-full`} style={{ width: `${BASE_VALUE}%`, backgroundColor: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Special + tagline */}
                  <div className="rounded-lg px-2 py-1.5 mb-1.5" style={{ backgroundColor: `${char.color}10` }}>
                    <span className="text-caption font-bold" style={{ color: char.color }}>{char.special}</span>
                    <span className="text-caption text-[var(--text-secondary)] block">{char.specialDesc}</span>
                  </div>
                  <p className="text-caption font-semibold text-[var(--text-primary)]">{char.tagline}</p>
                  <div className="mt-1 space-y-0.5">
                    <div className="flex gap-1 text-caption">
                      <span className="text-[var(--success)] shrink-0">✓</span>
                      <span className="text-[var(--text-secondary)]">{char.pro}</span>
                    </div>
                    <div className="flex gap-1 text-caption">
                      <span className="text-[var(--text-light)] shrink-0">△</span>
                      <span className="text-[var(--text-secondary)]">{char.con}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="g3-footer flex items-center justify-center gap-4 mt-5 text-caption">
            <span className="font-bold" style={{ color: 'var(--success)' }}>确定性 — 输出可靠可预测</span>
            <span className="font-bold" style={{ color: 'var(--accent)' }}>完备性 — 场景覆盖广</span>
            <span className="font-bold" style={{ color: 'var(--primary)' }}>便利性 — 使用简单高效</span>
          </div>

          <p className="text-body text-[var(--text-light)] mt-3 text-center">
            四种路线，各有擅长——都朝着三个特性的不同方向发力。下一页，让我们看看升级后的形态 →
          </p>
        </div>
      )}

      <div className="absolute bottom-5 text-caption text-[var(--text-light)]">
        {phase === 0 ? '点击查看四种职业' : '点击重置'}
      </div>
    </section>
  );
};

export default memo(Slide03_Ecosystem);
