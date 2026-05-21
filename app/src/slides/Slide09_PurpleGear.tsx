import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SlideProps { isActive: boolean; }

const Slide09_PurpleGear: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Title
      tl.fromTo('.pg-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.pg-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 0.1);

      // Left column - ReAct
      tl.fromTo('.pg-left', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.pg-react-detail', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.8);
      tl.fromTo('.pg-react-warning', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.3)' }, 1.1);

      // Right column - MCP
      tl.fromTo('.pg-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.pg-mcp-detail', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.9);

      // Bottom stats
      tl.fromTo('.pg-stats', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);

      // Cost
      tl.fromTo('.pg-cost', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.4);

      // Transition note
      tl.fromTo('.pg-transition', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.6);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="pg-title text-h1 md:text-display font-bold text-[var(--text-primary)] opacity-0">
          v3.0 紫装 — 自主调度
        </h2>
        <span className="pg-badge text-caption px-2.5 py-1 rounded-full font-bold text-white opacity-0"
          style={{ backgroundColor: '#8B5CF6' }}>紫装</span>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        {/* Left: ReAct */}
        <div className="pg-left rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#8B5CF650', backgroundColor: '#8B5CF608' }}>
          <h3 className="text-h3 font-bold mb-3" style={{ color: '#8B5CF6' }}>ReAct 推理-行动循环</h3>

          {/* Circular flow SVG */}
          <div className="flex items-center justify-center mb-3">
            <svg width="340" height="160" viewBox="0 0 340 160" className="max-w-full">
              <defs>
                <marker id="pg-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
                </marker>
              </defs>

              {/* Think */}
              <rect x="10" y="10" width="95" height="38" rx="8" fill="#8B5CF620" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="57" y="34" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">思考(Think)</text>

              <line x1="105" y1="29" x2="130" y2="29" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#pg-arrow)" />

              {/* Act */}
              <rect x="135" y="10" width="80" height="38" rx="8" fill="#8B5CF620" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="175" y="34" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">行动(Act)</text>

              <line x1="215" y1="29" x2="240" y2="29" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#pg-arrow)" />

              {/* Observe */}
              <rect x="245" y="10" width="85" height="38" rx="8" fill="#8B5CF620" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="287" y="34" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">观察(Observe)</text>

              {/* Arrow down from Observe */}
              <path d="M 287 48 L 287 65 Q 287 78 275 78 L 180 78" stroke="#8B5CF6" strokeWidth="1.5" fill="none" markerEnd="url(#pg-arrow)" />

              {/* Iterate box */}
              <rect x="100" y="60" width="80" height="38" rx="8" fill="#8B5CF630" stroke="#8B5CF6" strokeWidth="2" />
              <text x="140" y="84" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">迭代</text>

              {/* Arrow back to Think */}
              <path d="M 100 79 L 57 79 Q 45 79 45 67 L 45 48" stroke="#8B5CF6" strokeWidth="1.5" fill="none" markerEnd="url(#pg-arrow)" />
            </svg>
          </div>

          {/* Detail text */}
          <div className="pg-react-detail rounded-lg px-3 py-2 mb-3 opacity-0"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>
              自主规划执行路径，降低人工操作介入，但引入决策不确定性
            </p>
          </div>

          {/* Warning */}
          <div className="pg-react-warning rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-center opacity-0">
            <p className="text-caption font-bold text-amber-400">便利性↑↑ 但 确定性↓</p>
          </div>
        </div>

        {/* Right: MCP */}
        <div className="pg-right rounded-2xl border-2 p-5 opacity-0"
          style={{ borderColor: '#8B5CF650', backgroundColor: '#8B5CF608' }}>
          <h3 className="text-h3 font-bold mb-3" style={{ color: '#8B5CF6' }}>MCP 统一工具协议</h3>

          {/* Hub diagram SVG */}
          <div className="flex items-center justify-center mb-3">
            <svg width="320" height="170" viewBox="0 0 320 170" className="max-w-full">
              <defs>
                <marker id="pg-arrow2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
                </marker>
              </defs>

              {/* Center Hub */}
              <rect x="105" y="55" width="110" height="50" rx="12" fill="#8B5CF625" stroke="#8B5CF6" strokeWidth="2" />
              <text x="160" y="78" textAnchor="middle" fill="#8B5CF6" fontSize="14" fontWeight="bold">MCP</text>
              <text x="160" y="96" textAnchor="middle" fill="#8B5CF680" fontSize="10">统一协议</text>

              {/* Top-left: 地图 */}
              <rect x="10" y="10" width="70" height="40" rx="8" fill="#8B5CF615" stroke="#8B5CF680" strokeWidth="1" />
              <text x="45" y="27" textAnchor="middle" fill="#8B5CF6" fontSize="16">🗺️</text>
              <text x="45" y="43" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="bold">地图</text>
              <line x1="80" y1="35" x2="105" y2="65" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#pg-arrow2)" />

              {/* Top-right: 搜索 */}
              <rect x="240" y="10" width="70" height="40" rx="8" fill="#8B5CF615" stroke="#8B5CF680" strokeWidth="1" />
              <text x="275" y="27" textAnchor="middle" fill="#8B5CF6" fontSize="16">🔍</text>
              <text x="275" y="43" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="bold">搜索</text>
              <line x1="240" y1="35" x2="215" y2="65" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#pg-arrow2)" />

              {/* Bottom-left: 数据库 */}
              <rect x="10" y="120" width="70" height="40" rx="8" fill="#8B5CF615" stroke="#8B5CF680" strokeWidth="1" />
              <text x="45" y="137" textAnchor="middle" fill="#8B5CF6" fontSize="16">🗄️</text>
              <text x="45" y="153" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="bold">数据库</text>
              <line x1="80" y1="135" x2="105" y2="105" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#pg-arrow2)" />

              {/* Bottom-right: 文件系统 */}
              <rect x="240" y="120" width="70" height="40" rx="8" fill="#8B5CF615" stroke="#8B5CF680" strokeWidth="1" />
              <text x="275" y="137" textAnchor="middle" fill="#8B5CF6" fontSize="16">📁</text>
              <text x="275" y="153" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="bold">文件系统</text>
              <line x1="240" y1="135" x2="215" y2="105" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#pg-arrow2)" />
            </svg>
          </div>

          {/* Detail text */}
          <div className="pg-mcp-detail rounded-lg px-3 py-2 opacity-0"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>
              标准化工具接入接口，类比USB Hub即插即用
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="pg-stats flex items-center gap-3 mb-3 opacity-0">
        <span className="text-caption font-bold px-2.5 py-1 rounded" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>便利性↑↑</span>
        <span className="text-caption font-bold px-2.5 py-1 rounded" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>完备性↑</span>
        <span className="text-caption font-bold px-2.5 py-1 rounded" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>确定性↓</span>
      </div>

      {/* Cost */}
      <div className="pg-cost text-center mb-3 opacity-0">
        <span className="text-caption px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>
          确认成本↑↑（自主决策需增加人工校验）
        </span>
      </div>

      {/* Transition note */}
      <div className="pg-transition text-center opacity-0">
        <p className="text-body-sm font-semibold" style={{ color: '#8B5CF6' }}>
          确定性下降，需要v4.0补回 →
        </p>
      </div>
    </section>
  );
};

export default memo(Slide09_PurpleGear);
