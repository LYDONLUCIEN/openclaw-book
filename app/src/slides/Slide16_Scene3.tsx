import React, { useRef, memo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Eye, Bot, FileSpreadsheet, CheckCircle, AlertCircle, Image } from 'lucide-react';

interface SlideProps { isActive: boolean; }

const INTERACTION_STEPS = [
  {
    role: 'human',
    label: '人工定义目标',
    content: '「我需要一个浏览器脚本，能自动提取网页表格数据并存为 Excel」',
    detail: '人：明确需求边界和输出格式',
    color: '#3B82F6',
    icon: Eye,
  },
  {
    role: 'agent',
    label: 'OpenClaw 理解需求',
    content: 'Agent 调用 Skill：分析需求 → 识别为浏览器自动化任务 → 加载 playwright 工具',
    detail: 'AI：理解意图，选择工具',
    color: '#8B5CF6',
    icon: Bot,
  },
  {
    role: 'agent',
    label: '截屏分析页面',
    content: 'Agent 截取目标页面 → 视觉识别表格结构 → 确定列名和行数',
    detail: 'AI：看见页面，理解布局',
    color: '#10B981',
    icon: Image,
  },
  {
    role: 'agent',
    label: '生成并执行脚本',
    content: '编写 Playwright 脚本 → 定位表格元素 → 逐行提取数据 → 写入 Excel',
    detail: 'AI：编写代码，自动执行',
    color: '#F97316',
    icon: FileSpreadsheet,
  },
  {
    role: 'human',
    label: '人工审核结果',
    content: '检查 Excel 输出：数据是否完整？列是否对齐？是否有遗漏行？',
    detail: '人：验证质量，决定是否通过',
    color: '#3B82F6',
    icon: CheckCircle,
  },
  {
    role: 'agent',
    label: '修正或完成',
    content: '如发现问题 → Agent 根据反馈修改脚本 → 重新执行 → 再次提交审核',
    detail: 'AI：根据反馈迭代，直到满意',
    color: '#EF4444',
    icon: AlertCircle,
  },
];

const Slide16_Scene3: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s3-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s3-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.2 });
      gsap.fromTo('.s3-step', { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  useGSAP(() => {
    if (!isActive || activeStep < 0 || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s3-detail', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive, activeStep] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-10 md:py-14 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="s3-title text-h1 font-bold text-[var(--text-primary)] mb-1 opacity-0">
        实战演示：浏览器脚本自动化
      </h2>
      <p className="s3-subtitle text-body text-[var(--text-secondary)] max-w-2xl text-center mb-4 opacity-0">
        人机协作的六步闭环：人定义方向，AI 执行细节，人审核结果
      </p>

      <div className="max-w-3xl w-full">
        {/* Interaction flow */}
        <div className="space-y-1.5 max-h-[55dvh] overflow-y-auto pr-1">
          {INTERACTION_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isHuman = step.role === 'human';
            return (
              <div key={i}
                className={`s3-step cursor-pointer rounded-lg border p-3 transition-all duration-200 ${isActive ? 'ring-1' : ''}`}
                style={{
                  borderColor: isActive ? step.color : `${step.color}30`,
                  backgroundColor: isActive ? `${step.color}08` : 'transparent',
                  boxShadow: isActive ? `0 0 10px ${step.color}15` : 'none',
                }}
                onClick={() => setActiveStep(isActive ? -1 : i)}>
                <div className="flex items-start gap-2.5">
                  {/* Role indicator */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}15` }}>
                      <Icon size={14} style={{ color: step.color }} />
                    </div>
                    <span className="text-[9px] font-bold mt-0.5" style={{ color: step.color }}>
                      {isHuman ? '人' : 'AI'}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-caption font-bold" style={{ color: step.color }}>
                        {i + 1}. {step.label}
                      </span>
                    </div>
                    <p className="text-caption text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                      {step.content}
                    </p>
                    {isActive && (
                      <div className="s3-detail mt-2 rounded px-2.5 py-1.5 text-center"
                        style={{ backgroundColor: `${step.color}08` }}>
                        <span className="text-caption font-semibold" style={{ color: step.color }}>
                          {step.detail}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key insight */}
        <div className="rounded-xl border-2 p-4 mt-4 text-center" style={{ borderColor: '#3B82F630', backgroundColor: '#3B82F605' }}>
          <p className="text-body-sm text-[var(--text-primary)]">
            人负责<span className="font-bold" style={{ color: '#3B82F6' }}>「做什么」</span>和<span className="font-bold" style={{ color: '#3B82F6' }}>「够不够好」</span>，
            AI 负责<span className="font-bold" style={{ color: '#8B5CF6' }}>「怎么做」</span>和<span className="font-bold" style={{ color: '#8B5CF6' }}>「做多少次」</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide16_Scene3);
