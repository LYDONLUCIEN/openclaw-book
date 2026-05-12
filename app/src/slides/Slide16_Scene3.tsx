import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bot, Activity, Search, Zap } from 'lucide-react';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const LOOP_STEPS = [
  { icon: Activity, label: '监控', desc: '实时采集告警', color: 'var(--primary)' },
  { icon: Search, label: '检测', desc: '1000:1告警压缩', color: 'var(--accent)' },
  { icon: Bot, label: '分析', desc: '知识图谱匹配300+故障', color: 'var(--success)' },
  { icon: Zap, label: '处置', desc: '生成处置方案', color: 'var(--secondary)' },
];

const Slide16_Scene3: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s3-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s3-chart', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.s3-loop', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });
  useEffect(() => {
    if (!isActive) return;
    let v = 0; const t = setInterval(() => { v += 2; setCounter(Math.min(v, 96)); if (v >= 96) clearInterval(t); }, 30);
    return () => clearInterval(t);
  }, [isActive]);

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="s3-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">场景3：网络故障智能诊断</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">从2-4小时到10分钟的快速响应</p>
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-data font-mono font-extrabold text-[var(--accent)]">{counter}%</span>
        <span className="text-h3 text-[var(--text-primary)]">响应加速</span>
      </div>
      <div className="s3-chart w-full max-w-md mx-auto mb-6" style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{name:'人工处理',分钟:180},{name:'Agent处理',分钟:10}]} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" tick={{fontSize:11}} label={{value:'分钟',position:'bottom',fontSize:11}} />
            <YAxis dataKey="name" type="category" tick={{fontSize:12}} width={70} />
            <Tooltip />
            <Bar dataKey="分钟" fill="var(--primary)" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="s3-loop grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
        {LOOP_STEPS.map((step, i) => (
          <div key={i} className="rounded-xl p-4 border-2 text-center" style={{ borderColor: step.color, backgroundColor: `${step.color}08` }}>
            <step.icon className="w-6 h-6 mx-auto mb-1" style={{ color: step.color }} strokeWidth={2} />
            <p className="text-body-sm font-bold" style={{ color: step.color }}>{step.label}</p>
            <p className="text-caption text-[var(--text-secondary)]">{step.desc}</p>
            {i < 3 && <span className="text-[var(--text-light)] text-xs">→</span>}
          </div>
        ))}
      </div>

      <div className="max-w-3xl w-full">
        <ExpandableSection toggleLabel="1000:1告警压缩如何实现" hintText="点击展开">
          <p className="text-body-sm text-[var(--text-secondary)]">Agent通过三层过滤实现1000:1告警压缩：1) 相关性分析——将同时段、同网元的告警聚合；2) 时序聚类——识别同一故障引发的级联告警；3) 优先级排序——根据影响范围和严重程度排序。最终从数千条原始告警中提取出1-5条核心故障线索。</p>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide16_Scene3);
