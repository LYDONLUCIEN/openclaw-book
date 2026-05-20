import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Search, FileText, Hash, Layers, GitBranch, Network, Share2, GitGraph } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const FULL_DOC = `5G-Advanced（5G-A）网络技术概述

5G-Advanced（简称5G-A）是5G的演进版本，也被称为5.5G。3GPP在Rel-18标准中正式定义了5G-A的技术框架，目标是实现10倍于5G的网络能力提升。5G-A在下行速率可达10Gbps，上行速率可达1Gbps，相比5G有显著提升。

关键特性方面，5G-A引入了多项核心技术。通感一体化（ISAC）使得基站可以同时实现通信和感知功能，能够检测周围环境的物体位置和运动状态，精度可达厘米级。无源物联网（Passive IoT）支持无电池终端的通信，适用于物流追踪、资产管理等场景，通信距离可达200米。大规模MIMO增强将天线阵列从64T64R提升至128T128R甚至更高，显著提升频谱效率。

网络架构方面，5G-A继续深化云原生设计。核心网引入了AI原生能力，支持网络自优化和智能切片。无线接入网（RAN）支持多频段协同，包括Sub-6GHz和毫米波的动态调度。网络切片管理实现了端到端的自动化，可根据业务需求实时调整资源分配。

应用场景上，5G-A主要面向三大方向。增强移动宽带（eMBB+）支持裸眼3D、沉浸式XR等新业务。确定性网络为工业自动化提供微秒级时延保障。低空经济支持无人机物流配送、低空监测等新兴应用，覆盖高度从120米提升至300米。

在运营商部署方面，中国移动已在北京、上海、深圳等城市启动5G-A商用试点。主要采用3.5GHz+2.6GHz双频组网策略，并逐步引入毫米波补充热点容量。预计2026年将实现全国主要城市的5G-A覆盖。终端方面，主流芯片厂商已发布支持5G-A的基带芯片，预计2026年下半年将有更多商用终端上市。`;

interface Chunk {
  id: string;
  text: string;
  vector: number[];
  shortText: string;
}

const CHUNKS: Chunk[] = [
  {
    id: 'chunk_1',
    text: '5G-Advanced（简称5G-A）是5G的演进版本，也被称为5.5G。3GPP在Rel-18标准中正式定义了5G-A的技术框架，目标是实现10倍于5G的网络能力提升。5G-A在下行速率可达10Gbps，上行速率可达1Gbps，相比5G有显著提升。',
    shortText: '5G-Advanced（简称5G-A）是5G的演进版本...',
    vector: [0.0234, -0.1567, 0.0891, 0.2345, -0.0678, 0.1456, -0.0823, 0.1987],
  },
  {
    id: 'chunk_2',
    text: '关键特性方面，5G-A引入了多项核心技术。通感一体化（ISAC）使得基站可以同时实现通信和感知功能，能够检测周围环境的物体位置和运动状态，精度可达厘米级。无源物联网（Passive IoT）支持无电池终端的通信，适用于物流追踪、资产管理等场景，通信距离可达200米。',
    shortText: '关键特性方面，5G-A引入了多项核心技术...',
    vector: [-0.0891, 0.1234, 0.0678, -0.1456, 0.2345, -0.0123, 0.1567, -0.0789],
  },
  {
    id: 'chunk_3',
    text: '大规模MIMO增强将天线阵列从64T64R提升至128T128R甚至更高，显著提升频谱效率。网络架构方面，5G-A继续深化云原生设计。核心网引入了AI原生能力，支持网络自优化和智能切片。',
    shortText: '大规模MIMO增强将天线阵列从64T64R提升...',
    vector: [0.1567, -0.0234, -0.0987, 0.0891, -0.1456, 0.2345, 0.0678, -0.1234],
  },
  {
    id: 'chunk_4',
    text: '应用场景上，5G-A主要面向三大方向。增强移动宽带（eMBB+）支持裸眼3D、沉浸式XR等新业务。确定性网络为工业自动化提供微秒级时延保障。低空经济支持无人机物流配送、低空监测等新兴应用，覆盖高度从120米提升至300米。',
    shortText: '应用场景上，5G-A主要面向三大方向...',
    vector: [-0.0678, 0.0891, 0.1456, -0.0234, 0.1987, -0.1567, -0.0345, 0.1234],
  },
  {
    id: 'chunk_5',
    text: '在运营商部署方面，中国移动已在北京、上海、深圳等城市启动5G-A商用试点。主要采用3.5GHz+2.6GHz双频组网策略，并逐步引入毫米波补充热点容量。预计2026年将实现全国主要城市的5G-A覆盖。',
    shortText: '在运营商部署方面，中国移动已在...',
    vector: [0.1234, 0.0678, -0.1987, 0.0234, -0.0891, 0.1456, 0.0234, -0.0678],
  },
];

const RAG_STEPS = [
  { icon: FileText, label: '文档分块', color: '#3B82F6' },
  { icon: Hash, label: '向量化', color: '#8B5CF6' },
  { icon: Search, label: '相似度检索', color: '#10B981' },
  { icon: Layers, label: '注入上下文', color: '#F59E0B' },
];

// KG-RAG constants
const KG_STEPS = [
  { icon: Network, label: '实体抽取', color: '#EC4899' },
  { icon: Share2, label: '关系构建', color: '#F97316' },
  { icon: GitGraph, label: '图谱检索', color: '#06B6D4' },
];

interface KGEntity {
  name: string;
  type: string;
  color: string;
}

const KG_ENTITIES: KGEntity[] = [
  { name: '5G-A', type: '技术标准', color: '#EC4899' },
  { name: '3GPP', type: '组织', color: '#6366F1' },
  { name: 'ISAC', type: '技术', color: '#10B981' },
  { name: 'MIMO', type: '技术', color: '#3B82F6' },
  { name: 'eMBB', type: '场景', color: '#8B5CF6' },
  { name: '低空经济', type: '场景', color: '#F59E0B' },
  { name: '中国移动', type: '运营商', color: '#EF4444' },
];

interface KGNode {
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

const KG_NODES: KGNode[] = [
  { label: '5G-A', x: 50, y: 30, size: 64, color: '#EC4899' },
  { label: '3GPP', x: 15, y: 15, size: 48, color: '#6366F1' },
  { label: 'ISAC', x: 20, y: 55, size: 52, color: '#10B981' },
  { label: 'MIMO', x: 80, y: 55, size: 52, color: '#3B82F6' },
  { label: 'eMBB', x: 25, y: 82, size: 44, color: '#8B5CF6' },
  { label: '低空经济', x: 75, y: 82, size: 44, color: '#F59E0B' },
  { label: '中国移动', x: 85, y: 15, size: 48, color: '#EF4444' },
];

interface KGEdge {
  from: number;
  to: number;
  label: string;
  color?: string;
  dashed?: boolean;
}

const KG_EDGES: KGEdge[] = [
  { from: 0, to: 1, label: '定义于', color: '#6366F1' },
  { from: 0, to: 2, label: '包含', color: '#10B981' },
  { from: 0, to: 3, label: '包含', color: '#3B82F6' },
  { from: 0, to: 4, label: '应用', color: '#8B5CF6' },
  { from: 0, to: 5, label: '应用', color: '#F59E0B' },
  { from: 6, to: 0, label: '试点', color: '#EF4444', dashed: true },
];

const KG_LEGEND = [
  { label: '技术标准', color: '#EC4899' },
  { label: '组织', color: '#6366F1' },
  { label: '技术', color: '#10B981' },
  { label: '场景', color: '#8B5CF6' },
  { label: '运营商', color: '#EF4444' },
];

const Slide08_ReAct: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'rag' | 'workflow'>('rag');
  const [ragStep, setRagStep] = useState(-1);
  const [kgStep, setKgStep] = useState(-1);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v2-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.v2-badge', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.2 });
      gsap.fromTo('.v2-tabs', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.v2-content', { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, tab] });

  useGSAP(() => {
    if (!isActive || ragStep < 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.rag-step-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, ragStep] });

  useGSAP(() => {
    if (!isActive || kgStep < 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.kg-step-content', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, kgStep] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <div className="flex items-center gap-3 mb-2">
        <h2 className="v2-title text-h1 font-bold text-[var(--text-primary)] opacity-0">v2.0 流程标准化</h2>
        <span className="v2-badge text-caption px-2 py-1 rounded-full font-bold text-white opacity-0" style={{ backgroundColor: '#3B82F6' }}>蓝装</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--success)10', color: 'var(--success)' }}>确定性 ↑</span>
        <span className="text-caption font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)10', color: 'var(--accent)' }}>完备性 ↑</span>
        <span className="text-caption text-[var(--text-light)]">便利性 ·</span>
      </div>

      {/* Tabs */}
      <div className="v2-tabs flex gap-2 mb-4 opacity-0">
        <button className="px-4 py-2 rounded-lg text-body-sm font-bold transition-all"
          style={tab === 'rag' ? { backgroundColor: '#3B82F6', color: 'white' } : { backgroundColor: '#3B82F610', color: '#3B82F6' }}
          onClick={(e) => { e.stopPropagation(); setTab('rag'); setRagStep(-1); }}>
          <Search size={14} className="inline mr-1" />RAG 检索机制
        </button>
        <button className="px-4 py-2 rounded-lg text-body-sm font-bold transition-all"
          style={tab === 'workflow' ? { backgroundColor: '#3B82F6', color: 'white' } : { backgroundColor: '#3B82F610', color: '#3B82F6' }}
          onClick={(e) => { e.stopPropagation(); setTab('workflow'); setKgStep(-1); }}>
          <GitBranch size={14} className="inline mr-1" />Workflow 工作流
        </button>
      </div>

      <div className="v2-content max-w-3xl w-full">
        {tab === 'rag' && (
          <div>
            {/* Step buttons */}
            <div className="flex items-center gap-2 mb-3">
              {RAG_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-[var(--text-light)] text-caption">→</span>}
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-caption font-bold transition-all"
                      style={ragStep === i
                        ? { backgroundColor: step.color, color: 'white' }
                        : { backgroundColor: `${step.color}10`, color: step.color }}
                      onClick={(e) => { e.stopPropagation(); setRagStep(ragStep === i ? -1 : i); }}>
                      <Icon size={12} />{step.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="rag-step-content">
              {/* Step 0: No step selected - show overview */}
              {ragStep === -1 && (
                <div className="text-center py-6">
                  <p className="text-body text-[var(--text-secondary)]">点击上方步骤，查看 RAG 每个环节的详细过程</p>
                  <p className="text-caption text-[var(--text-light)] mt-2">以"5G-A 网络技术概述"文档为示例</p>
                </div>
              )}

              {/* Step 1: Document chunking */}
              {ragStep === 0 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#3B82F6' }}>完整知识文档 → 分块切割</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg border p-3 max-h-[40dvh] overflow-y-auto" style={{ borderColor: '#3B82F630', backgroundColor: '#3B82F605' }}>
                      <span className="text-caption font-bold block mb-1" style={{ color: '#3B82F6' }}>原始文档（约800字）</span>
                      <p className="text-caption text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{FULL_DOC}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-caption font-bold block" style={{ color: '#3B82F6' }}>分块结果（5块）</span>
                      {CHUNKS.map((chunk, i) => (
                        <div key={i} className="rounded-lg border-l-3 p-2" style={{ borderLeftWidth: 3, borderColor: `hsl(${210 + i * 20}, 70%, 55%)`, backgroundColor: `hsl(${210 + i * 20}, 70%, 97%)` }}>
                          <span className="text-caption font-mono font-bold" style={{ color: `hsl(${210 + i * 20}, 70%, 45%)` }}>{chunk.id}</span>
                          <p className="text-caption text-[var(--text-secondary)] mt-0.5">{chunk.shortText}</p>
                          <span className="text-caption text-[var(--text-light)]">{chunk.text.length}字</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Vectorization */}
              {ragStep === 1 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#8B5CF6' }}>每个文本块 → 向量（数字序列）</p>
                  <p className="text-caption text-[var(--text-secondary)] mb-3">实际维度通常为 768 或 1536 维，此处简化展示 8 维</p>
                  <div className="space-y-2">
                    {CHUNKS.map((chunk, i) => (
                      <div key={i} className="rounded-lg border p-2.5" style={{ borderColor: '#8B5CF630', backgroundColor: '#8B5CF605' }}>
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <span className="text-caption font-mono font-bold" style={{ color: '#8B5CF6' }}>{chunk.id}</span>
                            <p className="text-caption text-[var(--text-light)] mt-0.5 truncate">{chunk.shortText}</p>
                          </div>
                          <div className="rounded px-2 py-1 shrink-0" style={{ backgroundColor: '#8B5CF610' }}>
                            <p className="text-caption font-mono" style={{ color: '#8B5CF6' }}>
                              [{chunk.vector.map(v => v.toFixed(4)).join(', ')}, ...]
                            </p>
                            <p className="text-caption text-[var(--text-light)] text-center">dim={chunk.vector.length}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Similarity search */}
              {ragStep === 2 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#10B981' }}>用户问题 → 向量化 → 余弦相似度匹配</p>
                  <div className="rounded-lg border-2 p-3 mb-3" style={{ borderColor: '#10B981', backgroundColor: '#10B98108' }}>
                    <span className="text-caption font-bold" style={{ color: '#10B981' }}>用户问题：</span>
                    <span className="text-body-sm text-[var(--text-primary)] ml-1">"5G-A 的关键特性有哪些？"</span>
                    <div className="mt-1 rounded px-2 py-1 inline-block" style={{ backgroundColor: '#10B98110' }}>
                      <span className="text-caption font-mono" style={{ color: '#10B981' }}>→ 问题向量: [0.0156, -0.0823, 0.0678, 0.1890, -0.0234, 0.1234, -0.0456, 0.1567, ...]</span>
                    </div>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)] mb-2">计算问题向量与每个文本块向量的余弦相似度，取 Top-K：</p>
                  <div className="space-y-2">
                    {[
                      { chunk: CHUNKS[1], score: 0.94, rank: 1, match: '🟢 高度相关' },
                      { chunk: CHUNKS[2], score: 0.72, rank: 2, match: '🟡 部分相关' },
                      { chunk: CHUNKS[3], score: 0.68, rank: 3, match: '🟡 部分相关' },
                      { chunk: CHUNKS[0], score: 0.35, rank: 4, match: '⚪ 低相关' },
                      { chunk: CHUNKS[4], score: 0.12, rank: 5, match: '⚪ 无关' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border p-2"
                        style={{
                          borderColor: item.score > 0.7 ? '#10B98140' : item.score > 0.5 ? '#F59E0B40' : 'var(--border)',
                          backgroundColor: item.score > 0.7 ? '#10B98108' : item.score > 0.5 ? '#F59E0B05' : 'transparent',
                        }}>
                        <span className="text-caption font-bold w-6 text-center" style={{ color: item.rank <= 2 ? '#10B981' : 'var(--text-light)' }}>#{item.rank}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-caption text-[var(--text-secondary)] truncate">{item.chunk.shortText}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-caption font-mono font-bold" style={{ color: item.score > 0.7 ? '#10B981' : item.score > 0.5 ? '#F59E0B' : 'var(--text-light)' }}>
                            {item.score.toFixed(2)}
                          </span>
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#10B98120' }}>
                            <div className="h-full rounded-full" style={{ width: `${item.score * 100}%`, backgroundColor: item.score > 0.7 ? '#10B981' : item.score > 0.5 ? '#F59E0B' : 'var(--text-light)' }} />
                          </div>
                          <span className="text-caption">{item.match}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-caption text-[var(--text-light)] mt-2 text-center">取相似度 Top-2 的文本块注入上下文</p>
                </div>
              )}

              {/* Step 4: Context injection */}
              {ragStep === 3 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#F59E0B' }}>拼接：用户问题 + 提示词 + 检索结果 → AI 回答</p>
                  <div className="rounded-xl border-2 p-3 space-y-2" style={{ borderColor: '#F59E0B30', backgroundColor: '#0d1117' }}>
                    {/* System prompt */}
                    <div>
                      <span className="text-caption font-bold px-1.5 rounded" style={{ backgroundColor: '#8B5CF620', color: '#8B5CF6' }}>系统提示</span>
                      <p className="text-caption font-mono mt-0.5" style={{ color: '#8B5CF6' }}>你是电信技术专家。请根据提供的知识回答用户问题。</p>
                    </div>
                    {/* Retrieved context */}
                    <div>
                      <span className="text-caption font-bold px-1.5 rounded" style={{ backgroundColor: '#10B98120', color: '#10B981' }}>检索结果</span>
                      <p className="text-caption font-mono mt-0.5 whitespace-pre-wrap" style={{ color: '#10B981' }}>
{`[参考资料1] ${CHUNKS[1].text}

[参考资料2] ${CHUNKS[2].text}`}
                      </p>
                    </div>
                    {/* User question */}
                    <div>
                      <span className="text-caption font-bold px-1.5 rounded" style={{ backgroundColor: '#3B82F620', color: '#3B82F6' }}>用户问题</span>
                      <p className="text-caption font-mono mt-0.5" style={{ color: '#3B82F6' }}>5G-A 的关键特性有哪些？</p>
                    </div>
                    {/* AI output */}
                    <div className="border-t pt-2 mt-2" style={{ borderColor: '#30363d' }}>
                      <span className="text-caption font-bold px-1.5 rounded" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>AI 回答</span>
                      <p className="text-caption font-mono mt-0.5 leading-relaxed" style={{ color: '#F59E0B' }}>
                        5G-A 的关键特性包括：①通感一体化（ISAC），基站可同时通信和感知，精度达厘米级；②无源物联网，支持无电池终端通信，距离达200米；③大规模MIMO增强，天线阵列从64T64R提升至128T128R以上，显著提升频谱效率。
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'workflow' && (
          <div>
            <p className="text-body-sm font-bold mb-1" style={{ color: '#10B981' }}>知识图谱 RAG：结构化关系增强检索</p>
            <p className="text-caption text-[var(--text-secondary)] mb-3">
              通过构建实体与关系的知识图谱，实现基于图结构的语义检索，比向量检索更精确。
            </p>

            {/* Step buttons */}
            <div className="flex items-center gap-2 mb-3">
              {KG_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-[var(--text-light)] text-caption">→</span>}
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-caption font-bold transition-all"
                      style={kgStep === i
                        ? { backgroundColor: step.color, color: 'white' }
                        : { backgroundColor: `${step.color}10`, color: step.color }}
                      onClick={(e) => { e.stopPropagation(); setKgStep(kgStep === i ? -1 : i); }}>
                      <Icon size={12} />{step.label}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="kg-step-content">
              {/* No step selected */}
              {kgStep === -1 && (
                <div className="text-center py-6">
                  <p className="text-body text-[var(--text-secondary)]">点击上方步骤，查看知识图谱 RAG 的完整流程</p>
                  <p className="text-caption text-[var(--text-light)] mt-2">以"5G-A 网络技术概述"文档为示例</p>
                </div>
              )}

              {/* Step 1: Entity Extraction */}
              {kgStep === 0 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#EC4899' }}>从文档中抽取实体（Entity Extraction）</p>
                  <div className="rounded-lg border-2 p-3 mb-3" style={{ borderColor: '#EC489930', backgroundColor: '#EC489908' }}>
                    <span className="text-caption font-bold" style={{ color: '#EC4899' }}>源文档：</span>
                    <span className="text-caption text-[var(--text-secondary)] ml-1">5G-A 网络技术概述（同一份文档）</span>
                  </div>
                  <p className="text-caption text-[var(--text-secondary)] mb-2">NER 模型识别出以下实体：</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {KG_ENTITIES.map((ent, i) => (
                      <div key={i} className="rounded-lg border p-2 text-center"
                        style={{ borderColor: `${ent.color}40`, backgroundColor: `${ent.color}08` }}>
                        <div className="flex items-center justify-center gap-1 mb-0.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ent.color }} />
                          <span className="text-body-sm font-bold" style={{ color: ent.color }}>{ent.name}</span>
                        </div>
                        <span className="text-caption px-1.5 rounded" style={{ backgroundColor: `${ent.color}15`, color: ent.color }}>{ent.type}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-caption text-[var(--text-light)] mt-2 text-center">
                    共抽取 {KG_ENTITIES.length} 个实体，涵盖 {new Set(KG_ENTITIES.map(e => e.type)).size} 种类型
                  </p>
                </div>
              )}

              {/* Step 2: Relationship Building (Knowledge Graph) */}
              {kgStep === 1 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#F97316' }}>构建知识图谱（Knowledge Graph）</p>
                  <div className="rounded-xl border-2 p-4 relative" style={{ borderColor: '#F9731630', backgroundColor: '#0d1117', minHeight: '320px' }}>
                    {/* Graph visualization using absolute positioning */}
                    {KG_NODES.map((node, i) => (
                      <div key={`node-${i}`}
                        className="absolute flex items-center justify-center rounded-full font-bold text-white shadow-lg"
                        style={{
                          width: node.size, height: node.size,
                          left: `calc(${node.x}% - ${node.size / 2}px)`,
                          top: `calc(${node.y}% - ${node.size / 2}px)`,
                          backgroundColor: node.color,
                          fontSize: node.size > 56 ? '11px' : '9px',
                          zIndex: 10,
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}>
                        {node.label}
                      </div>
                    ))}
                    {/* Edges as SVG */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5, overflow: 'visible' }}>
                      <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                          <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
                        </marker>
                      </defs>
                      {KG_EDGES.map((edge, i) => {
                        const from = KG_NODES[edge.from];
                        const to = KG_NODES[edge.to];
                        return (
                          <g key={`edge-${i}`}>
                            <line
                              x1={`${from.x}%`} y1={`${from.y}%`}
                              x2={`${to.x}%`} y2={`${to.y}%`}
                              stroke={edge.color || '#4B5563'}
                              strokeWidth={1.5}
                              strokeDasharray={edge.dashed ? '4 3' : 'none'}
                              markerEnd="url(#arrowhead)"
                            />
                            <text
                              x={`${(from.x + to.x) / 2}%`}
                              y={`${(from.y + to.y) / 2}%`}
                              fill={edge.color || '#9CA3AF'}
                              fontSize="9"
                              textAnchor="middle"
                              dy="-4"
                            >
                              {edge.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    {KG_LEGEND.map((item, i) => (
                      <span key={i} className="flex items-center gap-1 text-caption">
                        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span style={{ color: item.color }}>{item.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Graph Retrieval */}
              {kgStep === 2 && (
                <div>
                  <p className="text-caption font-bold mb-2" style={{ color: '#06B6D4' }}>图谱检索（Graph Traversal）</p>
                  {/* Query */}
                  <div className="rounded-lg border-2 p-3 mb-3" style={{ borderColor: '#06B6D4', backgroundColor: '#06B6D408' }}>
                    <span className="text-caption font-bold" style={{ color: '#06B6D4' }}>用户问题：</span>
                    <span className="text-body-sm text-[var(--text-primary)] ml-1">"5G-A 的核心技术有哪些？"</span>
                  </div>
                  {/* Traversal steps */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: '#EC489940', backgroundColor: '#EC489908' }}>
                      <span className="text-caption font-bold w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EC4899', color: 'white' }}>1</span>
                      <span className="text-caption" style={{ color: '#EC4899' }}>定位起始节点：</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-bold text-white" style={{ backgroundColor: '#EC4899' }}>5G-A</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: '#F9731640', backgroundColor: '#F9731608' }}>
                      <span className="text-caption font-bold w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F97316', color: 'white' }}>2</span>
                      <span className="text-caption" style={{ color: '#F97316' }}>遍历 [包含] 边：</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-bold text-white" style={{ backgroundColor: '#10B981' }}>ISAC</span>
                      <span className="text-[var(--text-light)]">,</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-bold text-white" style={{ backgroundColor: '#3B82F6' }}>MIMO</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: '#10B98140', backgroundColor: '#10B98108' }}>
                      <span className="text-caption font-bold w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981', color: 'white' }}>3</span>
                      <span className="text-caption" style={{ color: '#10B981' }}>遍历 [应用] 边：</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-caption font-bold text-white" style={{ backgroundColor: '#8B5CF6' }}>eMBB</span>
                    </div>
                  </div>
                  {/* Final answer */}
                  <div className="rounded-xl border-2 p-3 space-y-2" style={{ borderColor: '#06B6D430', backgroundColor: '#0d1117' }}>
                    <div>
                      <span className="text-caption font-bold px-1.5 rounded" style={{ backgroundColor: '#06B6D420', color: '#06B6D4' }}>结构化检索结果</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: '#10B981' }} />
                        <div>
                          <span className="text-caption font-bold" style={{ color: '#10B981' }}>ISAC（通感一体化）</span>
                          <span className="text-caption text-[var(--text-light)] ml-1">- 类型: 技术</span>
                          <p className="text-caption font-mono" style={{ color: '#10B98180' }}>基站同时通信+感知，精度达厘米级</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: '#3B82F6' }} />
                        <div>
                          <span className="text-caption font-bold" style={{ color: '#3B82F6' }}>MIMO（大规模天线增强）</span>
                          <span className="text-caption text-[var(--text-light)] ml-1">- 类型: 技术</span>
                          <p className="text-caption font-mono" style={{ color: '#3B82F680' }}>天线阵列从64T64R提升至128T128R</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: '#8B5CF6' }} />
                        <div>
                          <span className="text-caption font-bold" style={{ color: '#8B5CF6' }}>eMBB+（增强移动宽带）</span>
                          <span className="text-caption text-[var(--text-light)] ml-1">- 类型: 场景</span>
                          <p className="text-caption font-mono" style={{ color: '#8B5CF680' }}>支持裸眼3D、沉浸式XR等新业务</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-2 mt-2" style={{ borderColor: '#30363d' }}>
                      <span className="text-caption font-bold px-1.5 rounded" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>AI 结构化回答</span>
                      <p className="text-caption font-mono mt-0.5 leading-relaxed" style={{ color: '#F59E0B' }}>
                        5G-A 的核心技术包括三项：①通感一体化（ISAC），实现通信与感知融合，精度达厘米级；②大规模MIMO增强，天线阵列提升至128T128R，显著提升频谱效率；③增强移动宽带（eMBB+），支持裸眼3D和沉浸式XR等新业务。
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide08_ReAct);
