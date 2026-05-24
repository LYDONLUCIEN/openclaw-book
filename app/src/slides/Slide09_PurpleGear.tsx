import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

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
      tl.fromTo('.pg-react-flow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.5);
      tl.fromTo('.pg-react-trace', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.7);
      tl.fromTo('.pg-react-insights', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.9);
      tl.fromTo('.pg-react-warning', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.3)' }, 1.1);

      // Right column - MCP
      tl.fromTo('.pg-right', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.pg-mcp-hub', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6);
      tl.fromTo('.pg-mcp-json', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.8);
      tl.fromTo('.pg-mcp-primitives', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.0);
      tl.fromTo('.pg-mcp-example', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.1);
      // Bottom
      tl.fromTo('.pg-stats', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.15);
      tl.fromTo('.pg-cost', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.4);
      tl.fromTo('.pg-transition', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.6);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const REACT_TRACE = [
    { role: 'Think', text: '需要获取北京实时天气数据，判断降水概率', color: '#8B5CF6' },
    { role: 'Act', text: 'call weather_api("北京")', color: '#7C3AED', mono: true },
    { role: 'Observe', text: '晴转多云，降水概率 15%', color: '#6D28D9' },
    { role: 'Think', text: '降水概率低，不需要带伞', color: '#8B5CF6' },
    { role: 'Act', text: '回复用户"今天不需要带伞"', color: '#7C3AED' },
  ];

  const MCP_TOOLS = ['🗺️ 地图', '🔍 搜索', '🗄️ 数据库', '📁 文件'];

  const MCP_PRIMITIVES = [
    { name: 'Tools', desc: '函数调用' },
    { name: 'Resources', desc: '数据源读取' },
    { name: 'Prompts', desc: '提示模板' },
  ];

  const FLOW_STEPS = [
    { label: '思考 Think', bg: '#8B5CF6', textColor: '#fff' },
    { label: '行动 Act', bg: '#7C3AED', textColor: '#fff' },
    { label: '观察 Observe', bg: '#6D28D9', textColor: '#fff' },
  ];

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Title */}
      <div className="flex items-center gap-3 mb-3">
        <h2 className="pg-title text-h1 md:text-display font-bold text-[var(--text-primary)] opacity-0 flex items-center gap-2">
          <ChapterBadge chapter={1} />
          v3.0 紫装 — 自主调度
        </h2>
        <span className="pg-badge text-caption px-2.5 py-1 rounded-full font-bold text-white opacity-0"
          style={{ backgroundColor: '#8B5CF6' }}>紫装</span>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {/* Left: ReAct */}
        <div className="pg-left rounded-2xl border-2 p-4 md:p-5 opacity-0 flex flex-col"
          style={{ borderColor: '#8B5CF650', backgroundColor: '#8B5CF608' }}>
          <h3 className="text-h3 font-bold mb-3" style={{ color: '#8B5CF6' }}>ReAct 推理-行动循环</h3>

          {/* Vertical flow chart */}
          <div className="pg-react-flow flex flex-col items-center mb-3 opacity-0">
            {FLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <span className="text-body-sm px-4 py-2 rounded-lg font-bold min-w-[140px] text-center"
                  style={{ backgroundColor: step.bg, color: step.textColor }}>
                  {step.label}
                </span>
                {i < FLOW_STEPS.length - 1 && (
                  <span className="text-body-sm font-bold my-0.5" style={{ color: '#8B5CF6' }}>↓</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-body-sm font-bold my-0.5" style={{ color: '#8B5CF6' }}>↓</span>
            <span className="text-body-sm px-4 py-2 rounded-lg font-bold min-w-[140px] text-center"
              style={{ backgroundColor: '#8B5CF620', color: '#8B5CF6', border: '1.5px solid #8B5CF650' }}>
              迭代 ↩
            </span>
            {/* Loop-back arrow */}
            <svg width="120" height="24" viewBox="0 0 120 24" className="mt-1 opacity-60">
              <path d="M10,12 Q60,24 110,12" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowhead)" />
              <defs><marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="#8B5CF6" /></marker></defs>
            </svg>
          </div>

          {/* Example trace */}
          <div className="pg-react-trace rounded-lg p-3 mb-3 opacity-0"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-caption font-bold mb-2" style={{ color: '#8B5CF6' }}>
              示例：用户询问 "北京今天需要带伞吗？"
            </p>
            <div className="space-y-1.5">
              {REACT_TRACE.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-caption font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}>
                    {step.role}
                  </span>
                  <span className={`text-caption ${step.mono ? 'font-mono' : ''}`}
                    style={{ color: 'var(--text-secondary)' }}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key insights */}
          <div className="pg-react-insights grid grid-cols-2 gap-2 mb-3 opacity-0">
            {[
              { title: '推理透明', desc: '中间步骤可追溯审计' },
              { title: '动态规划', desc: '根据观察调整后续行动' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg px-3 py-2"
                style={{ backgroundColor: '#8B5CF610' }}>
                <p className="text-body-sm font-bold" style={{ color: '#8B5CF6' }}>{item.title}</p>
                <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="pg-react-warning rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-center mt-auto opacity-0">
            <p className="text-caption font-bold text-amber-400">便利性↑↑ 但 确定性↓</p>
          </div>
        </div>

        {/* Right: MCP */}
        <div className="pg-right rounded-2xl border-2 p-4 md:p-5 opacity-0 flex flex-col"
          style={{ borderColor: '#8B5CF650', backgroundColor: '#8B5CF608' }}>
          <h3 className="text-h3 font-bold mb-3" style={{ color: '#8B5CF6' }}>MCP 统一工具协议</h3>

          {/* Hub concept */}
          <div className="pg-mcp-hub flex items-center justify-center gap-1.5 mb-3 flex-wrap opacity-0">
            {MCP_TOOLS.map((tool) => (
              <span key={tool} className="text-caption px-2 py-1 rounded-md"
                style={{ backgroundColor: '#8B5CF615', border: '1px solid #8B5CF640' }}>
                {tool}
              </span>
            ))}
            <span className="text-caption font-bold" style={{ color: '#8B5CF6' }}>→</span>
            <span className="text-caption px-2.5 py-1 rounded-md font-bold text-white"
              style={{ backgroundColor: '#8B5CF6' }}>MCP Hub</span>
            <span className="text-caption font-bold" style={{ color: '#8B5CF6' }}>→</span>
            <span className="text-caption px-2.5 py-1 rounded-md font-bold"
              style={{ backgroundColor: '#8B5CF620', color: '#8B5CF6' }}>Agent</span>
          </div>

          {/* Tool definition JSON */}
          <div className="pg-mcp-json rounded-lg p-3 mb-3 opacity-0"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-caption font-bold mb-1.5" style={{ color: '#8B5CF6' }}>
              工具定义格式
            </p>
            <pre className="text-[10px] md:text-[11px] font-mono leading-relaxed whitespace-pre-wrap"
              style={{ color: 'var(--text-secondary)' }}>
{`{
  "name": "get_weather",
  "description": "查询城市天气",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": { "type": "string" }
    },
    "required": ["city"]
  }
}`}
            </pre>
          </div>

          {/* Three primitives */}
          <div className="pg-mcp-primitives grid grid-cols-3 gap-2 mb-3 opacity-0">
            {MCP_PRIMITIVES.map((p) => (
              <div key={p.name} className="rounded-lg px-2 py-2 text-center"
                style={{ backgroundColor: '#8B5CF610' }}>
                <p className="text-body-sm font-bold" style={{ color: '#8B5CF6' }}>{p.name}</p>
                <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Example: one MCP = many capabilities */}
          <div className="pg-mcp-example rounded-lg p-3 mb-3 opacity-0"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-caption font-bold mb-2" style={{ color: '#8B5CF6' }}>
              示例：高德地图 MCP 提供 16 项能力
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {['🗺️ 地理编码', '🔄 逆地理编码', '📍 POI 搜索', '🚗 驾车路径', '🌤️ 天气查询', '📐 距离测量', '🏙️ 行政区划', '🖼️ 静态地图', '🚌 公交路线', '🚶 步行导航', '🚕 实时路况', '🏠 周边搜索', '📊 坐标转换', '🛣️ 货车路径', '⛽ 加油站', '🅿️ 停车场'].map((tag) => (
                <span key={tag} className="text-[10px] md:text-[11px] px-2 py-1 rounded-md font-medium text-center"
                  style={{ backgroundColor: '#8B5CF618', border: '1px solid #8B5CF630', color: 'var(--text-primary)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Protocol note */}
          <div className="rounded-lg px-3 py-2 text-center mt-auto"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-caption" style={{ color: 'var(--text-secondary)' }}>
              基于 JSON-RPC 2.0 协议 · 标准化工具接入 · 类比 USB 即插即用
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="pg-stats flex items-center gap-3 mt-3 opacity-0">
        <span className="text-caption font-bold px-2.5 py-1 rounded" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>便利性↑↑</span>
        <span className="text-caption font-bold px-2.5 py-1 rounded" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>完备性↑</span>
        <span className="text-caption font-bold px-2.5 py-1 rounded" style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>确定性↓</span>
      </div>

      {/* Cost */}
      <div className="pg-cost text-center mt-2 opacity-0">
        <span className="text-caption px-3 py-1 rounded-full font-semibold"
          style={{ backgroundColor: '#8B5CF610', color: '#8B5CF6' }}>
          确认成本↑↑（自主决策需增加人工校验）
        </span>
      </div>

      {/* Transition note */}
      <div className="pg-transition text-center mt-2 opacity-0">
        <p className="text-body-sm font-semibold" style={{ color: '#8B5CF6' }}>
          确定性下降，需要 v4.0 补回 →
        </p>
      </div>
    </section>
  );
};

export default memo(Slide09_PurpleGear);
