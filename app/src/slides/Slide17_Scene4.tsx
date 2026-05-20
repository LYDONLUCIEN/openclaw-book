import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Users, Bot, RefreshCw, Share2, Image, CheckCircle, Clock, MessageSquare } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const TEAM_ROLES = [
  {
    role: '产品经理',
    action: '描述需求、验收结果',
    color: '#3B82F6',
    icon: MessageSquare,
  },
  {
    role: 'OpenClaw Agent',
    action: '理解需求、生成方案、执行任务',
    color: '#8B5CF6',
    icon: Bot,
  },
  {
    role: '审核者',
    action: '质量把关、反馈修正',
    color: '#10B981',
    icon: CheckCircle,
  },
  {
    role: '调度器',
    action: '定时触发、进度追踪、异常告警',
    color: '#F97316',
    icon: Clock,
  },
];

const WORKFLOW_CYCLE = [
  '产品经理描述需求 → Agent 理解并拆解',
  'Agent 生成初版方案 → 审核者评审反馈',
  'Agent 根据反馈迭代 → 直至审核通过',
  '调度器按周期自动触发 → 持续输出稳定',
];

const Slide17_Scene4: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState(false);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s4-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s4-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.s4-role', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.4 });
      gsap.fromTo('.s4-cycle', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.9 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || !showDetail || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s4-detail', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, showDetail] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="s4-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        实战演示：团队协作模式
      </h2>
      <p className="s4-subtitle text-body text-[var(--text-secondary)] max-w-2xl text-center mb-5 opacity-0">
        多角色协同的 Agent 工作流——不是一个人用 AI，而是整个团队与 Agent 共舞
      </p>

      <div className="max-w-4xl w-full">
        {/* Team roles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {TEAM_ROLES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i}
                className="s4-role rounded-xl border-2 p-3 text-center opacity-0"
                style={{ borderColor: item.color, backgroundColor: `${item.color}06` }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}>
                  <Icon size={18} style={{ color: item.color }} />
                </div>
                <span className="text-caption font-bold block" style={{ color: item.color }}>{item.role}</span>
                <p className="text-caption text-[var(--text-secondary)] mt-0.5">{item.action}</p>
              </div>
            );
          })}
        </div>

        {/* Workflow cycle */}
        <div className="s4-cycle rounded-xl border-2 p-4 mb-4 opacity-0" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw size={14} style={{ color: 'var(--primary)' }} />
            <span className="text-caption font-bold" style={{ color: 'var(--primary)' }}>协作闭环</span>
          </div>
          <div className="space-y-1.5">
            {WORKFLOW_CYCLE.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-caption font-bold shrink-0 w-4 text-center" style={{ color: 'var(--primary)' }}>{i + 1}</span>
                <p className="text-caption text-[var(--text-secondary)]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image/GIF placeholder for team demo */}
        <div className="rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all"
          style={{ borderColor: '#8B5CF640', backgroundColor: '#8B5CF605' }}
          onClick={() => setShowDetail(!showDetail)}>
          <Image size={28} className="mx-auto mb-2" style={{ color: '#8B5CF650' }} />
          <p className="text-body-sm font-bold" style={{ color: '#8B5CF6' }}>
            团队使用模式演示
          </p>
          <p className="text-caption text-[var(--text-light)] mt-1">
            {showDetail ? '点击收起' : '点击展开查看团队协作流程示意'}
          </p>
        </div>

        {showDetail && (
          <div className="s4-detail mt-3 rounded-xl border-2 p-4" style={{ borderColor: '#8B5CF640', backgroundColor: '#8B5CF606' }}>
            <div className="flex items-center justify-center gap-6 py-4">
              {/* Simple flow visualization */}
              {[
                { label: '产品经理', sub: '需求描述', color: '#3B82F6' },
                { label: 'Agent', sub: '方案生成', color: '#8B5CF6' },
                { label: '审核者', sub: '质量反馈', color: '#10B981' },
                { label: '调度器', sub: '定时执行', color: '#F97316' },
              ].map((node, i) => (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center border-2"
                      style={{ borderColor: node.color, backgroundColor: `${node.color}10` }}>
                      <Users size={18} style={{ color: node.color }} />
                    </div>
                    <span className="text-caption font-bold block mt-1" style={{ color: node.color }}>{node.label}</span>
                    <span className="text-[10px] text-[var(--text-light)]">{node.sub}</span>
                  </div>
                  {i < 3 && (
                    <div className="flex flex-col items-center">
                      <Share2 size={12} style={{ color: 'var(--text-light)' }} className="rotate-[-90deg]" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-caption text-center text-[var(--text-light)] mt-2">
              （此处可替换为团队实际使用截图或 GIF）
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Slide17_Scene4);
