import React, { useRef, memo, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, ShieldAlert, Coins, Shield, Play, RotateCcw } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const WEAKNESSES = [
  {
    title: '模型幻觉',
    tagline: 'AI 无法区分"做不到"和"编一个"',
    color: '#EF4444',
    icon: AlertTriangle,
    points: [
      '无法下载发票 → 直接编造发票内容',
      '本质：概率模型不是事实数据库',
    ],
  },
  {
    title: '自主决策风险',
    tagline: '为达目的不择手段',
    color: '#F97316',
    icon: ShieldAlert,
    points: [
      '整理电脑太慢 → 删除 100 万条数据库记录',
      '本质：缺少常识和风险意识',
    ],
  },
  {
    title: 'Token 消耗',
    tagline: '一句"你好"背后的成本',
    color: '#F59E0B',
    icon: Coins,
    points: [
      '多步骤流程消耗叠加，成本迅速攀升',
      '公网 Key 价格高，模型能力有限',
    ],
  },
  {
    title: '安全边界',
    tagline: '权限、环境、数据的三重风险',
    color: '#EF4444',
    icon: Shield,
    points: [
      '环境污染：Agent 操作影响宿主系统',
      '权限过大：缺乏最小权限约束',
      '数据泄露：反向代理与数据外泄风险',
    ],
  },
];

const TOKEN_STEPS = [
  {
    step: '系统提示注入',
    detail: '注入角色设定、技能列表、记忆文件、安全规则...',
    tokens: 2847,
    accumulated: 2847,
  },
  {
    step: 'Skill 列表加载',
    detail: '加载 200 个 Skill 的 name + description（每个约 24 tokens）',
    tokens: 4800,
    accumulated: 7647,
  },
  {
    step: 'Memory 上下文',
    detail: '读取 MEMORY.md + 当日日志 + 用户偏好文件',
    tokens: 1520,
    accumulated: 9167,
  },
  {
    step: '工具定义注入',
    detail: 'MCP 注册的 14 个工具的 JSON Schema 定义',
    tokens: 3200,
    accumulated: 12367,
  },
  {
    step: '用户消息处理',
    detail: '用户说："你好" — 2 个字，约 3 tokens',
    tokens: 3,
    accumulated: 12370,
  },
  {
    step: '模型推理输出',
    detail: '模型生成回复（含 ReAct 思考过程）',
    tokens: 450,
    accumulated: 12820,
  },
  {
    step: '记忆持久化',
    detail: '将对话关键信息写回记忆文件（"silent turn"）',
    tokens: 680,
    accumulated: 13500,
  },
];

const Slide13_Limitations: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [tokenPlaying, setTokenPlaying] = useState(false);
  const [tokenStep, setTokenStep] = useState(-1);
  const tokenIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePlayToken = useCallback(() => {
    if (tokenIntervalRef.current) {
      clearInterval(tokenIntervalRef.current);
    }
    setTokenStep(-1);
    setTokenPlaying(true);
    // Small delay so the reset renders before we start advancing
    setTimeout(() => {
      setTokenStep(0);
      let idx = 0;
      tokenIntervalRef.current = setInterval(() => {
        idx++;
        if (idx >= TOKEN_STEPS.length) {
          if (tokenIntervalRef.current) clearInterval(tokenIntervalRef.current);
          setTokenPlaying(false);
          return;
        }
        setTokenStep(idx);
      }, 1200);
    }, 100);
  }, []);

  // Clean up interval on unmount or when card collapses
  useEffect(() => {
    if (expanded !== 2 && tokenIntervalRef.current) {
      clearInterval(tokenIntervalRef.current);
      tokenIntervalRef.current = null;
      setTokenPlaying(false);
      setTokenStep(-1);
    }
  }, [expanded]);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.lim-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.lim-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.lim-card', { opacity: 0, x: (i: number) => (i % 2 === 0 ? -30 : 30), scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.lim-conclusion', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || expanded === null || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.lim-placeholder', { opacity: 0 }, { opacity: 1, duration: 0.25 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, expanded] });

  useGSAP(() => {
    if (!isActive || tokenStep < 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.token-step-item', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, tokenStep] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="lim-title text-h1 font-bold text-[var(--text-primary)] mb-2 opacity-0">
        龙虾的局限性
      </h2>
      <p className="lim-subtitle text-body text-[var(--text-secondary)] mb-6 max-w-xl text-center opacity-0">
        不是用不好，而是能力边界清晰
      </p>

      {/* 4 warning cards in 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
        {WEAKNESSES.map((w, i) => {
          const Icon = w.icon;
          const isExp = expanded === i;
          return (
            <div key={i}
              className={`lim-card rounded-xl border-2 p-5 transition-all duration-300 cursor-pointer opacity-0 ${isExp ? 'col-span-1 sm:col-span-2' : ''}`}
              style={{
                borderColor: isExp ? w.color : w.color,
                backgroundColor: `${w.color}06`,
              }}
              onClick={() => setExpanded(isExp ? null : i)}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${w.color}15`, color: w.color }}>
                  <Icon size={18} />
                </div>
                <span className="text-body font-bold" style={{ color: w.color }}>{w.title}</span>
              </div>

              {/* Tagline */}
              <p className="text-caption font-semibold text-[var(--text-primary)] mb-2 pl-1">
                {w.tagline}
              </p>

              {/* Points */}
              <ul className="space-y-1.5 pl-1">
                {w.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-caption text-[var(--text-secondary)]">
                    <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: w.color }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Expanded content */}
              {isExp && i === 2 && (
                <div className="lim-placeholder mt-3 rounded-lg border-2 p-4"
                  style={{ borderColor: '#F59E0B40', backgroundColor: '#F59E0B06' }}
                  onClick={(e) => e.stopPropagation()}>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-body-sm font-bold" style={{ color: '#F59E0B' }}>
                        一句「你好」背后的 Token 流
                      </span>
                      <span className="text-caption font-mono ml-2 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#F59E0B15', color: '#F59E0B' }}>
                        ≈ 13,500 tokens
                      </span>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption font-bold transition-all"
                      style={{
                        backgroundColor: tokenPlaying ? '#F59E0B20' : '#F59E0B',
                        color: tokenPlaying ? '#F59E0B' : 'white',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayToken();
                      }}>
                      {tokenPlaying ? (
                        <><RotateCcw size={12} />播放中...</>
                      ) : (
                        <><Play size={12} />播放模拟</>
                      )}
                    </button>
                  </div>

                  {/* Steps list */}
                  <div className="space-y-2">
                    {TOKEN_STEPS.map((ts, idx) => {
                      if (idx > tokenStep) return null;
                      return (
                        <div key={idx}
                          className="token-step-item rounded-lg border p-2.5"
                          style={{
                            borderColor: idx === tokenStep ? '#F59E0B60' : '#F59E0B20',
                            backgroundColor: idx === tokenStep ? '#F59E0B10' : '#F59E0B04',
                          }}>
                          {/* Step name + token count */}
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-body-sm font-bold" style={{ color: '#F59E0B' }}>
                              {ts.step}
                            </span>
                            <span className="text-caption font-mono font-bold" style={{ color: '#F59E0B' }}>
                              +{ts.tokens.toLocaleString()} tokens
                            </span>
                          </div>
                          {/* Detail */}
                          <p className="text-caption text-[var(--text-secondary)] mb-1.5">
                            {ts.detail}
                          </p>
                          {/* Accumulated bar */}
                          <div className="flex items-center gap-2">
                            <span className="text-caption text-[var(--text-light)] shrink-0">
                              累计: {ts.accumulated.toLocaleString()} tokens
                            </span>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                              style={{ backgroundColor: '#F59E0B15' }}>
                              <div className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(ts.accumulated / 15000) * 100}%`,
                                  backgroundColor: '#F59E0B',
                                }} />
                            </div>
                            <span className="text-caption text-[var(--text-light)] shrink-0">
                              {((ts.accumulated / 15000) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary card - shown when all steps complete */}
                  {tokenStep >= TOKEN_STEPS.length - 1 && (
                    <div className="mt-3 rounded-lg p-3 text-center"
                      style={{ backgroundColor: '#F59E0B12', borderLeft: '3px solid #F59E0B' }}>
                      <p className="text-body-sm font-bold text-[var(--text-primary)]">
                        用户说了 2 个字，系统消耗了约 13,500 tokens。
                      </p>
                      <p className="text-caption text-[var(--text-secondary)] mt-1">
                        其中模型推理仅占 3%，97% 是 Harness 工程开销。
                      </p>
                    </div>
                  )}

                  {/* Initial prompt when not started */}
                  {tokenStep < 0 && (
                    <div className="text-center py-4">
                      <p className="text-caption text-[var(--text-light)]">
                        点击「播放模拟」按钮，观看一句「你好」背后的完整 Token 消耗过程
                      </p>
                    </div>
                  )}
                </div>
              )}
              {isExp && i !== 2 && (
                <div className="lim-placeholder mt-3 rounded-lg border-2 border-dashed p-4 text-center"
                  style={{ borderColor: `${w.color}40`, backgroundColor: `${w.color}04` }}>
                  <p className="text-caption text-[var(--text-light)]">截图 / 动画占位</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom conclusion */}
      <div className="lim-conclusion rounded-xl border-2 p-4 max-w-3xl w-full mt-5 text-center opacity-0"
        style={{ borderColor: '#EF4444', backgroundColor: '#EF444408' }}>
        <p className="text-body font-bold text-[var(--text-primary)]">
          模型能力有上限、Token 有成本、自主性有风险 —— 理解边界，才能用对场景。
        </p>
      </div>
    </section>
  );
};

export default memo(Slide13_Limitations);
