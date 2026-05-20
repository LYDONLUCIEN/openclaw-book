import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Zap, Cable, Play, RotateCcw, Code } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const REACT_STEPS = [
  { type: 'thought', label: '🤔 思考', content: '用户想查询信号覆盖，我需要先获取用户位置信息。', color: '#8B5CF6' },
  { type: 'action', label: '🔧 调用工具', content: '调用 query_signal_coverage(location="朝阳区望京", radius=2000)', color: '#3B82F6' },
  { type: 'observation', label: '👀 观察结果', content: '结果：距最近基站 2.8km，信号强度 -95dBm，覆盖等级：差', color: '#10B981' },
  { type: 'error', label: '⚠️ 发现不足', content: '仅知道信号差不够，还需要排查原因。需要查询基站详情和用户终端信息。', color: '#EF4444' },
  { type: 'thought', label: '🤔 再思考', content: '信号差可能是基站距离太远。我需要查询附近是否有新基站建设计划，以及用户是否支持VoWiFi。', color: '#8B5CF6' },
  { type: 'action', label: '🔧 再调用', content: '调用 check_device_support(user="张先生", feature="VoWiFi")', color: '#3B82F6' },
  { type: 'observation', label: '👀 观察结果', content: '结果：用户设备 iPhone 15 Pro，支持 VoWiFi，运营商已开通该功能。', color: '#10B981' },
  { type: 'answer', label: '✅ 解决', content: '建议用户开启 VoWiFi 功能，通过 WiFi 进行通话。同时告知附近新基站预计下月启用。', color: '#F59E0B' },
];

const MCP_PROTOCOLS = [
  { name: 'HTTP API', icon: '🌐', color: '#3B82F6' },
  { name: '数据库', icon: '🗄️', color: '#10B981' },
  { name: '文件系统', icon: '📁', color: '#F59E0B' },
  { name: '消息队列', icon: '📨', color: '#8B5CF6' },
  { name: 'SaaS 服务', icon: '☁️', color: '#EF4444' },
  { name: '内部系统', icon: '🏢', color: '#F97316' },
];

const Slide09_OpenClawArch: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'react' | 'mcp'>('react');
  const [reactStep, setReactStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mcpExample, setMcpExample] = useState(false);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v3-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v3-tabs', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v3-content', { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, tab] });

  useGSAP(() => {
    if (!isActive || reactStep <= 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(`.react-step-${reactStep}`, { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3 });
      gsap.fromTo(`.react-step-${reactStep} .react-inner`, { backgroundColor: 'var(--accent)15' },
        { backgroundColor: 'transparent', duration: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, reactStep] });

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setReactStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= REACT_STEPS.length) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      setReactStep(step);
    }, 1500);
  };

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v3-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v3.0 自主调度</h2>
        <span className="v3-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#8B5CF6' }}>紫装</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--primary)10', color: 'var(--primary)' }}>便利性 ↑↑</span>
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)10', color: 'var(--accent)' }}>完备性 ↑</span>
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--success)10', color: 'var(--success)' }}>确定性 ↓</span>
      </div>

      {/* Tabs */}
      <div className="v3-tabs flex gap-2 mb-4 opacity-0">
        <button
          className="px-4 py-2 rounded-lg text-body-sm font-bold transition-all"
          style={tab === 'react' ? { backgroundColor: '#8B5CF6', color: 'white' } : { backgroundColor: '#8B5CF610', color: '#8B5CF6' }}
          onClick={(e) => { e.stopPropagation(); setTab('react'); setReactStep(0); }}>
          <Zap size={14} className="inline mr-1" />ReAct 范式演示
        </button>
        <button
          className="px-4 py-2 rounded-lg text-body-sm font-bold transition-all"
          style={tab === 'mcp' ? { backgroundColor: '#8B5CF6', color: 'white' } : { backgroundColor: '#8B5CF610', color: '#8B5CF6' }}
          onClick={(e) => { e.stopPropagation(); setTab('mcp'); }}>
          <Cable size={14} className="inline mr-1" />MCP 统一协议
        </button>
      </div>

      {/* Content */}
      <div className="v3-content max-w-3xl w-full">
        {tab === 'react' && (
          <div>
            {/* ReAct paradigm summary */}
            <div className="flex items-center justify-center gap-2 mb-3">
              {['🤔 思考', '🔧 行动', '👀 观察'].map((step, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-[var(--text-light)]">→</span>}
                  <span className="px-3 py-1 rounded-lg text-caption font-semibold" style={{ backgroundColor: '#8B5CF610' }}>{step}</span>
                </React.Fragment>
              ))}
              <span className="text-[var(--text-light)]">→</span>
              <span className="px-3 py-1 rounded-lg text-caption font-semibold" style={{ backgroundColor: '#8B5CF610' }}>🔁 循环</span>
            </div>

            {/* Play button */}
            <div className="flex items-center gap-3 mb-3">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption font-bold text-white"
                style={{ backgroundColor: '#8B5CF6' }}
                onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                disabled={isPlaying}>
                {isPlaying ? <RotateCcw size={12} className="animate-spin" /> : <Play size={12} />}
                {isPlaying ? '播放中...' : '播放完整示例'}
              </button>
              <span className="text-caption text-[var(--text-light)]">
                或手动点击每步展开（已显示 {reactStep + 1}/{REACT_STEPS.length} 步）
              </span>
            </div>

            {/* Steps display */}
            <div className="space-y-1.5 max-h-[45dvh] overflow-y-auto pr-1">
              {REACT_STEPS.map((step, i) => {
                const isVisible = i <= reactStep;
                return (
                  <div key={i} className={`react-step-${i} ${isVisible ? '' : 'opacity-20'}`}
                    onClick={(e) => { e.stopPropagation(); if (i <= reactStep) return; setReactStep(i); }}>
                    <div className="react-inner rounded-lg border p-2.5 cursor-pointer transition-all"
                      style={{
                        borderColor: `${step.color}40`,
                        backgroundColor: i === reactStep ? `${step.color}08` : 'transparent',
                      }}>
                      <div className="flex items-start gap-2">
                        <span className="text-caption font-bold shrink-0 px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                          {step.label}
                        </span>
                        <p className="text-caption text-[var(--text-secondary)] leading-relaxed">{step.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border-2 p-3 mt-3 text-center" style={{ borderColor: '#8B5CF630', backgroundColor: '#8B5CF605' }}>
              <p className="text-body-sm text-[var(--text-primary)]">
                <span className="font-bold" style={{ color: 'var(--primary)' }}>便利性↑↑</span>：AI 自主规划和调度，
                但 <span className="font-bold" style={{ color: 'var(--success)' }}>确定性↓</span>：自主决策带来不确定
              </p>
            </div>
          </div>
        )}

        {tab === 'mcp' && (
          <div>
            <p className="text-caption text-[var(--text-secondary)] mb-3 text-center">
              MCP（Model Context Protocol）像一个 USB Hub——把各种不同协议的接口统一成一种标准。
            </p>

            {/* USB Hub SVG */}
            <svg viewBox="0 0 500 280" className="w-full max-w-md mx-auto mb-3">
              <rect x="185" y="100" width="130" height="80" rx="12"
                fill="#8B5CF615" stroke="#8B5CF6" strokeWidth="2" />
              <text x="250" y="137" textAnchor="middle" fill="#8B5CF6" fontSize="14" fontWeight="bold">MCP Hub</text>
              <text x="250" y="155" textAnchor="middle" fill="#8B5CF680" fontSize="10">统一协议</text>
              <text x="250" y="170" textAnchor="middle" fill="#8B5CF660" fontSize="9">就像 USB-C</text>
              <rect x="205" y="10" width="90" height="40" rx="8"
                fill="#8B5CF615" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="250" y="35" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">🤖 AI 模型</text>
              <line x1="250" y1="50" x2="250" y2="100" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5" />
              <text x="260" y="78" fill="#8B5CF680" fontSize="9">统一接口</text>
              {[
                { name: 'HTTP API', icon: '🌐', x: 30, y: 35, color: '#3B82F6' },
                { name: '数据库', icon: '🗄️', x: 30, y: 125, color: '#10B981' },
                { name: '文件系统', icon: '📁', x: 30, y: 210, color: '#F59E0B' },
              ].map((d, i) => (
                <React.Fragment key={i}>
                  <rect x={d.x} y={d.y} width="100" height="35" rx="6" fill={`${d.color}10`} stroke={d.color} strokeWidth="1.5" />
                  <text x={d.x + 50} y={d.y + 22} textAnchor="middle" fill={d.color} fontSize="11">{d.icon} {d.name}</text>
                  <line x1={d.x + 100} y1={d.y + 17} x2="185" y2="140" stroke={d.color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                </React.Fragment>
              ))}
              {[
                { name: '高德地图', icon: '🗺️', x: 370, y: 35, color: '#EF4444' },
                { name: 'SaaS 服务', icon: '☁️', x: 370, y: 125, color: '#8B5CF6' },
                { name: '内部系统', icon: '🏢', x: 370, y: 210, color: '#F97316' },
              ].map((d, i) => (
                <React.Fragment key={i}>
                  <rect x={d.x} y={d.y} width="100" height="35" rx="6" fill={`${d.color}10`} stroke={d.color} strokeWidth="1.5" />
                  <text x={d.x + 50} y={d.y + 22} textAnchor="middle" fill={d.color} fontSize="11">{d.icon} {d.name}</text>
                  <line x1="315" y1="140" x2={d.x} y2={d.y + 17} stroke={d.color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                </React.Fragment>
              ))}
            </svg>

            {/* Example button */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border-2 mb-3 transition-all"
              style={{ borderColor: '#8B5CF650', backgroundColor: '#8B5CF608' }}
              onClick={(e) => { e.stopPropagation(); setMcpExample(!mcpExample); }}>
              <Code size={16} style={{ color: '#8B5CF6' }} />
              <span className="text-body-sm font-bold" style={{ color: '#8B5CF6' }}>
                {mcpExample ? '收起代码示例' : '点击查看真实 MCP 代码示例（高德地图）'}
              </span>
            </button>

            {mcpExample && (
              <div className="space-y-3 max-h-[65dvh] overflow-y-auto pr-1">
                {/* Tool definition */}
                <div>
                  <span className="text-caption font-bold block mb-1" style={{ color: '#8B5CF6' }}>工具定义（Tool Definition）</span>
                  <div className="rounded-xl border p-3 overflow-x-auto" style={{ borderColor: '#8B5CF630', backgroundColor: '#0d1117' }}>
                    <pre className="text-caption font-mono leading-relaxed" style={{ color: '#c9d1d9' }}>{`const GEO_TOOL = {
  name: "maps_geo",
  description: "将详细的结构化地址转换为经纬度坐标",
  inputSchema: {
    type: "object",
    properties: {
      address: {
        type: "string",
        description: "待解析的结构化地址信息"
      },
      city: {
        type: "string",
        description: "指定查询的城市"
      }
    },
    required: ["address"]
  }
};

const WEATHER_TOOL = {
  name: "maps_weather",
  description: "根据城市名称查询指定城市的天气",
  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "城市名称或者adcode"
      }
    },
    required: ["city"]
  }
};

const SEARCH_TOOL = {
  name: "maps_text_search",
  description: "关键词搜索，根据用户传入关键词搜索相关POI",
  inputSchema: {
    type: "object",
    properties: {
      keywords: {
        type: "string",
        description: "搜索关键词"
      },
      city: {
        type: "string",
        description: "查询城市"
      }
    },
    required: ["keywords"]
  }
};`}</pre>
                  </div>
                </div>

                {/* Client config */}
                <div>
                  <span className="text-caption font-bold block mb-1" style={{ color: '#10B981' }}>客户端配置（claude_desktop_config.json）</span>
                  <div className="rounded-xl border p-3 overflow-x-auto" style={{ borderColor: '#10B98130', backgroundColor: '#0d1117' }}>
                    <pre className="text-caption font-mono leading-relaxed" style={{ color: '#c9d1d9' }}>{`{
  "mcpServers": {
    "amap-maps": {
      "command": "npx",
      "args": [
        "-y",
        "@amap/amap-maps-mcp-server"
      ],
      "env": {
        "AMAP_MAPS_API_KEY": "your-api-key"
      }
    }
  }
}`}</pre>
                  </div>
                </div>

                {/* Tool list */}
                <div>
                  <span className="text-caption font-bold block mb-1" style={{ color: '#F59E0B' }}>高德地图 MCP 注册的全部工具（14个）</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { name: 'maps_geo', desc: '地址→坐标', color: '#3B82F6' },
                      { name: 'maps_regeocode', desc: '坐标→地址', color: '#3B82F6' },
                      { name: 'maps_weather', desc: '天气查询', color: '#10B981' },
                      { name: 'maps_ip_location', desc: 'IP定位', color: '#10B981' },
                      { name: 'maps_direction_driving', desc: '驾车路线', color: '#F59E0B' },
                      { name: 'maps_direction_walking', desc: '步行路线', color: '#F59E0B' },
                      { name: 'maps_direction_transit', desc: '公交路线', color: '#8B5CF6' },
                      { name: 'maps_bicycling', desc: '骑行路线', color: '#8B5CF6' },
                      { name: 'maps_text_search', desc: '关键词搜POI', color: '#EF4444' },
                      { name: 'maps_around_search', desc: '周边搜索', color: '#EF4444' },
                      { name: 'maps_search_detail', desc: 'POI详情', color: '#F97316' },
                      { name: 'maps_distance', desc: '距离测量', color: '#F97316' },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-1.5 rounded px-2 py-1" style={{ backgroundColor: `${t.color}08` }}>
                        <span className="text-caption font-mono font-bold" style={{ color: t.color }}>{t.name}</span>
                        <span className="text-caption text-[var(--text-light)]">{t.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl border-2 p-3 text-center mt-3" style={{ borderColor: '#8B5CF630', backgroundColor: '#8B5CF605' }}>
              <p className="text-body-sm text-[var(--text-primary)]">
                <span className="font-bold" style={{ color: 'var(--primary)' }}>便利性↑</span>：所有工具统一接入，
                <span className="font-bold" style={{ color: 'var(--accent)' }}>完备性↑</span>：工具生态可无限扩展
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide09_OpenClawArch);
