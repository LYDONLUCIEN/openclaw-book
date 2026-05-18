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
    stats: { C: 90, P: 15, U: 5 },
    special: '绝对确定性',
    specialDesc: '逻辑完全可控，输出零偏差',
    pro: '结果100%可预测，边界最清晰',
    con: '开发周期长，灵活度最低',
    tagline: '可靠准确，但灵活度低',
  },
  {
    name: '工作流/低代码开发',
    classType: '【工匠职业】调度者',
    icon: ClipboardList,
    color: '#F97316',
    stats: { C: 80, P: 25, U: 10 },
    special: '流程确定性',
    specialDesc: '善用工具，流程标准化',
    pro: '可视化配置，流程固化后输出确定',
    con: '开发成本众包给用户，使用者=开发者',
    tagline: '善用工具，但成本转移',
  },
  {
    name: '传统机器学习',
    classType: '【游侠职业】判断者',
    icon: BarChart3,
    color: '#10B981',
    stats: { C: 65, P: 20, U: 35 },
    special: '经验封装',
    specialDesc: '一套方法论应对各类问题',
    pro: '简单粗暴，可处理非结构化数据',
    con: '大量数据标注，场景迁移成本高',
    tagline: '简单粗暴，但标注成本高',
  },
  {
    name: '普通大模型',
    classType: '【法师职业】通才',
    icon: Sparkles,
    color: '#8B5CF6',
    stats: { C: 10, P: 40, U: 80 },
    special: '通用智能',
    specialDesc: '组合技能多，覆盖面极广',
    pro: '零门槛使用，覆盖场景最多',
    con: '对用户要求高，好效果差，不确定性极高',
    tagline: '组合技多，但操作要求高',
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
          const target = [CHARACTERS[i].stats.C, CHARACTERS[i].stats.P, CHARACTERS[i].stats.U][j];
          gsap.to(bar, { width: `${target}%`, duration: 0.6, ease: 'power3.out', delay: 0.4 + i * 0.1 });
        });
        gsap.fromTo(`.g3-card-${i}`, { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.3)', delay: 0.3 + i * 0.1 });
      });
      gsap.fromTo('.g3-footer', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, phase] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={() => setPhase(phase < 1 ? phase + 1 : 0)}>

      <h2 className="g3-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        游戏加点：职业图鉴
      </h2>
      <p className="g3-subtitle text-body text-[var(--text-secondary)] mb-5 opacity-0">
        四种思维模式，四种 C·P·U 加点策略
      </p>

      {/* Phase 0: Three equal bars at 35 */}
      {phase === 0 && (
        <div className="g3-base-section opacity-0">
          <div className="g3-base-bars max-w-sm w-full rounded-xl border p-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
            <p className="text-body font-bold text-[var(--text-primary)] mb-4 text-center">
              假设初始状态：三个维度都是 {BASE_VALUE}
            </p>
            {[
              { label: 'C 复杂度', color: 'var(--accent)' },
              { label: 'P 参与度', color: 'var(--primary)' },
              { label: 'U 不确定度', color: 'var(--success)' },
            ].map((s) => (
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
            不同职业会在这三个维度上重新分配点数。点击查看 →
          </p>
        </div>
      )}

      {/* Phase 1: Four character cards with animated bars */}
      {phase === 1 && (
        <div className="g3-cards max-w-6xl w-full opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CHARACTERS.map((char, i) => {
              const Icon = char.icon;
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
                    {[
                      { label: 'C', name: '复杂度', val: char.stats.C, color: 'var(--accent)' },
                      { label: 'P', name: '参与度', val: char.stats.P, color: 'var(--primary)' },
                      { label: 'U', name: '不确定度', val: char.stats.U, color: 'var(--success)' },
                    ].map((s) => (
                      <div key={s.label} className="mb-1">
                        <div className="flex justify-between text-caption">
                          <span className="font-bold" style={{ color: s.color }}>{s.label} {s.name}</span>
                          <span className="font-mono" style={{ color: s.color }}>{s.val}</span>
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
                      <span className="text-[var(--success)] shrink-0">+</span>
                      <span className="text-[var(--text-secondary)]">{char.pro}</span>
                    </div>
                    <div className="flex gap-1 text-caption">
                      <span className="text-[var(--accent)] shrink-0">−</span>
                      <span className="text-[var(--text-secondary)]">{char.con}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="g3-footer flex items-center justify-center gap-4 mt-5 text-caption">
            <span className="font-bold" style={{ color: 'var(--accent)' }}>C = 复杂度（开发成本）</span>
            <span className="font-bold" style={{ color: 'var(--primary)' }}>P = 参与度（操作成本）</span>
            <span className="font-bold" style={{ color: 'var(--success)' }}>U = 不确定度（确认成本）</span>
          </div>

          <p className="text-body text-[var(--text-light)] mt-3 text-center">
            四种职业，四种取舍——都绕不开不可能三角。下一页，让我们看看氪金后的形态 →
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
