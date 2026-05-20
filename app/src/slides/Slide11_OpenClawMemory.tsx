import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Info } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const LAYERS = [
  {
    id: 'gateway',
    name: 'Gateway 网关层',
    desc: '统一入口：请求路由、会话管理、命令队列',
    color: '#3B82F6',
  },
  {
    id: 'cognitive',
    name: '认知层',
    desc: 'Context Assembly 上下文组装 + Memory 持久记忆',
    color: '#8B5CF6',
  },
  {
    id: 'execution',
    name: '执行层',
    desc: 'ReAct Loop 推理循环 + Skills 技能引擎',
    color: '#F97316',
  },
  {
    id: 'reach',
    name: '触达层',
    desc: 'Node 执行节点 + Channel 多端通道（飞书/企微/钉钉）',
    color: '#10B981',
  },
];

const LAYER_DETAILS: Record<string, { items: { name: string; desc: string }[]; insight: string }> = {
  gateway: {
    items: [
      { name: 'Gateway', desc: '所有通信的统一路由中枢，负责请求分发、会话保持、命令队列管理' },
      { name: 'Heartbeat', desc: '定时唤醒机制，支持主动巡检、周期任务触发、Agent 存活检测' },
    ],
    insight: 'Gateway 是 Harness 的调度中心——决定请求往哪走、何时走、走几次',
  },
  cognitive: {
    items: [
      { name: 'Context Assembly', desc: '动态拼装系统提示：角色设定 + Skill 列表 + 记忆 + 工具定义' },
      { name: 'Memory', desc: 'Markdown 文件持久化（soul.md / user.md / tool.md）+ SQLite 索引' },
      { name: '渐进式加载', desc: 'Skill 仅注入摘要（~97字符/项），按需读取完整 SKILL.md' },
    ],
    insight: '200 个 Skill 仅占 ~4.8k tokens，按需加载而非全量注入',
  },
  execution: {
    items: [
      { name: 'ReAct Loop', desc: '推理 → 执行 → 观察 → 再推理的持续循环，非单次调用' },
      { name: 'Skill Engine', desc: '自动发现、按需加载、版本管理、Marketplace 分发' },
    ],
    insight: '执行层的核心：把一次 LLM 调用变成持续思考和行动的闭环',
  },
  reach: {
    items: [
      { name: 'Node', desc: '工具执行环境，Agent 持久化运行，支持节点任务分配' },
      { name: 'Channel', desc: '飞书/企微/钉钉/邮件多端统一接入' },
      { name: '未来', desc: '沙箱隔离环境，确保 Agent 操作不影响宿主系统' },
    ],
    insight: '让能力触达每一个终端，无论用户在哪里',
  },
};

const Slide11_OpenClawMemory: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ocm-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.ocm-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.arch-layer', { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.4 });
      gsap.fromTo('.arch-label', { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !selectedLayer || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.arch-detail', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, selectedLayer] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="ocm-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        OpenClaw 架构：Harness 工程全景
      </h2>
      <p className="ocm-subtitle text-body text-[var(--text-secondary)] mb-5 max-w-2xl text-center opacity-0">
        模型是引擎，Harness 是整车。点击每一层查看内部结构。
      </p>

      <div className="max-w-4xl w-full">
        {/* Architecture diagram */}
        <div className="relative rounded-2xl border-2 p-4 mb-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          {/* Top label */}
          <div className="text-center mb-3">
            <span className="text-caption font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
              用户消息入口
            </span>
          </div>

          {/* Layers - stacked vertically */}
          <div className="space-y-0">
            {LAYERS.map((layer, i) => {
              const isSelected = selectedLayer === layer.id;
              return (
                <React.Fragment key={layer.id}>
                  {/* Layer block */}
                  <div
                    className={`arch-layer cursor-pointer rounded-xl border-2 p-3.5 transition-all duration-200 ${isSelected ? 'ring-2' : ''}`}
                    style={{
                      borderColor: isSelected ? layer.color : `${layer.color}50`,
                      backgroundColor: isSelected ? `${layer.color}12` : `${layer.color}06`,
                      boxShadow: isSelected ? `0 0 15px ${layer.color}20` : 'none',
                    }}
                    onClick={() => setSelectedLayer(isSelected ? null : layer.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }} />
                        <span className="text-body font-bold" style={{ color: layer.color }}>{layer.name}</span>
                      </div>
                      <span className="text-caption text-[var(--text-secondary)] hidden md:block">{layer.desc}</span>
                      <Info size={14} style={{ color: `${layer.color}80` }} className="shrink-0 md:hidden" />
                    </div>
                  </div>

                  {/* Connector arrow between layers */}
                  {i < LAYERS.length - 1 && (
                    <div className="flex items-center justify-center py-1">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-3" style={{ backgroundColor: `${layer.color}30` }} />
                        <span className="text-[8px]" style={{ color: `${layer.color}60` }}>▼</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom label */}
          <div className="text-center mt-3">
            <span className="text-caption font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#10B98115', color: '#10B981' }}>
              外部工具 & 数据源（MCP / API / 文件系统）
            </span>
          </div>
        </div>

        {/* Side label: this is not a tech stack, it's a harness */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {LAYERS.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <span className="arch-label text-caption font-bold px-2 py-0.5 rounded opacity-0"
                style={{ backgroundColor: `${layer.color}10`, color: layer.color }}>
                {layer.name.split(' ')[0]}
              </span>
              {i < LAYERS.length - 1 && <span className="text-[var(--text-light)] text-caption">→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Detail panel when layer is selected */}
        {selectedLayer && (
          <div className="arch-detail rounded-xl border-2 p-4"
            style={{ borderColor: LAYERS.find(l => l.id === selectedLayer)!.color + '60' }}>
            {(() => {
              const layer = LAYERS.find(l => l.id === selectedLayer)!;
              const detail = LAYER_DETAILS[selectedLayer];
              return (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }} />
                    <span className="text-body font-bold" style={{ color: layer.color }}>{layer.name}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    {detail.items.map((item, j) => (
                      <div key={j} className="rounded-lg p-2.5" style={{ backgroundColor: `${layer.color}06` }}>
                        <span className="text-caption font-bold block mb-0.5" style={{ color: layer.color }}>{item.name}</span>
                        <p className="text-caption text-[var(--text-secondary)]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg px-3 py-2 text-center" style={{ backgroundColor: `${layer.color}08` }}>
                    <p className="text-caption font-semibold" style={{ color: layer.color }}>{detail.insight}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide11_OpenClawMemory);
