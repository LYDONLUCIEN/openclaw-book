import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';
import ClickableImage from '@/components/ImageOverlay';

interface SlideProps { isActive: boolean; }

const L2_STEPS = [
  { role: '人', label: '定义目标', content: '帮我整理模型参数信息，预估算力需求', color: '#3B82F6' },
  { role: 'AI', label: '理解需求', content: '识别为浏览器自动化任务，加载 Playwright', color: '#8B5CF6' },
  { role: 'AI', label: '截屏分析', content: '截取页面 → 识别页面内容 → 确定列名行数', color: '#10B981' },
  { role: 'AI', label: '执行脚本', content: '逐页抓取→ 编写代码 → 计算结果 → 生成报告', color: '#F97316' },
  { role: '人', label: '审核结果', content: '检查数据完整性，遗漏则反馈修正', color: '#3B82F6' },
];

const L3_FLOW = [
  { time: '08:00', event: '调度引擎触发日报任务', color: '#8B5CF6' },
  { time: '08:01', event: 'Agent 调用数据源 Skill 计算指标', color: '#10B981' },
  { time: '08:03', event: 'Agent 生成分析报告初稿', color: '#F97316' },
  { time: '08:05', event: '自动校验数据一致性', color: '#3B82F6' },
  { time: '08:06', event: '推送至审阅频道，等待人工确认', color: '#8B5CF6' },
];

const Slide17b_LevelExamples: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.le-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo('.le-l2', { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3);
      tl.fromTo('.le-l2-step', { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.05 }, 0.5);
      tl.fromTo('.le-l2-insight', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.85);
      tl.fromTo('.le-l3', { opacity: 0, x: 25 }, { opacity: 1, x: 0, duration: 0.5 }, 0.4);
      tl.fromTo('.le-l3-step', { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.05 }, 0.6);
      tl.fromTo('.le-l3-insight', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.95);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  return (
    <section ref={containerRef}
      className="w-full min-h-[100dvh] flex flex-col items-center pt-16 pb-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="le-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-2 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={2} />
        实战示例：L2 任务助理 & L3 定时调度
      </h2>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {/* Left: Level 2 */}
        <div className="le-l2 rounded-2xl border-2 p-3 flex flex-col opacity-0"
          style={{ borderColor: '#3B82F650', backgroundColor: '#3B82F608' }}>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-caption font-bold px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: '#3B82F6' }}>L2</span>
            <h3 className="text-body-sm font-bold" style={{ color: '#3B82F6' }}>任务助理：模型部署分析报告</h3>
          </div>

          <p className="text-[10px] text-[var(--text-light)] mb-2">以时间换操作，30分钟释放双手</p>

          <div className="space-y-1">
            {L2_STEPS.map((step, i) => (
              <div key={i}
                className="le-l2-step flex items-center gap-2 rounded-md border px-2 py-1 opacity-0"
                style={{ borderColor: `${step.color}20`, backgroundColor: `${step.color}05` }}>
                <span className="text-[10px] font-bold px-1 py-0.5 rounded shrink-0"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}>{step.role}</span>
                <span className="text-[10px] font-semibold shrink-0" style={{ color: step.color }}>{step.label}</span>
                <span className="text-[10px] text-[var(--text-secondary)] truncate">{step.content}</span>
              </div>
            ))}
          </div>

          <div className="le-l2-img mt-2 flex items-center justify-center">
            <ClickableImage src="./images/slide18-level2.png" alt="L2 实战截图"
              style={{ width: '75%', transform: 'scale(0.8)', transformOrigin: 'center' }} />
          </div>

          <div className="le-l2-insight mt-2 rounded-md px-2 py-1.5 text-center opacity-0"
            style={{ backgroundColor: '#3B82F610' }}>
            <p className="text-[10px] font-semibold" style={{ color: '#3B82F6' }}>
              人负责「做什么」和「够不够好」，AI 负责「怎么做」和「做多少次」
            </p>
          </div>
        </div>

        {/* Right: Level 3 */}
        <div className="le-l3 rounded-2xl border-2 p-3 flex flex-col opacity-0"
          style={{ borderColor: '#8B5CF650', backgroundColor: '#8B5CF608' }}>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-caption font-bold px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: '#8B5CF6' }}>L3</span>
            <h3 className="text-body-sm font-bold" style={{ color: '#8B5CF6' }}>定时调度：运营日报自动生成</h3>
          </div>

          <p className="text-[10px] text-[var(--text-light)] mb-2">Harness 调度引擎定时触发，无人值守完成周期任务</p>

          <div className="space-y-1">
            {L3_FLOW.map((step, i) => (
              <div key={i}
                className="le-l3-step flex items-center gap-2 rounded-md border px-2 py-1 opacity-0"
                style={{ borderColor: `${step.color}20`, backgroundColor: `${step.color}05` }}>
                <span className="text-[10px] font-mono font-bold shrink-0"
                  style={{ color: step.color }}>{step.time}</span>
                <span className="text-[10px] text-[var(--text-secondary)]">{step.event}</span>
              </div>
            ))}
          </div>

          <div className="le-l3-img mt-2 flex items-center justify-center">
            <ClickableImage src="./images/slide18-level3.png" alt="L3 实战截图"
              style={{ width: '75%', transform: 'scale(0.8)', transformOrigin: 'center' }} />
          </div>

          <div className="le-l3-insight mt-2 rounded-md px-2 py-1.5 text-center opacity-0"
            style={{ backgroundColor: '#8B5CF610' }}>
            <p className="text-[10px] font-semibold" style={{ color: '#8B5CF6' }}>
              无人值守执行，人工仅需审核最终结果——确认成本最低化
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Slide17b_LevelExamples);
