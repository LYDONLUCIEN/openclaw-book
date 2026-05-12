import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileBarChart, Server, FileSpreadsheet, Presentation, TrendingUp } from 'lucide-react';
import FlowDiagram from '@/components/FlowDiagram';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide15_Scene2: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s2-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s2-chart', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.s2-flow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });
  useEffect(() => {
    if (!isActive) return;
    let v = 0; const t = setInterval(() => { v += 3; setCounter(Math.min(v, 99)); if (v >= 99) clearInterval(t); }, 25);
    return () => clearInterval(t);
  }, [isActive]);

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="s2-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">场景2：月度经营分析报告</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">从2-3天到30分钟的质变</p>
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-data font-mono font-extrabold text-[var(--accent)]">{counter}%</span>
        <span className="text-h3 text-[var(--text-primary)]">时间节省</span>
      </div>
      <div className="s2-chart w-full max-w-md mx-auto mb-6" style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{name:'人工处理',小时:36,color:'#ef4444'},{name:'Agent处理',小时:0.5,color:'#10B981'}]} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" tick={{fontSize:11}} label={{value:'小时',position:'bottom',fontSize:11}} />
            <YAxis dataKey="name" type="category" tick={{fontSize:12}} width={70} />
            <Tooltip />
            <Bar dataKey="小时" fill="var(--primary)" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="s2-flow max-w-4xl w-full mb-4">
        <h4 className="text-body font-bold text-[var(--text-primary)] mb-3">数据流</h4>
        <FlowDiagram nodes={[
          { id: 'src', title: '8个数据源', description: 'CRM+计费+网管+财务...', icon: Server },
          { id: 'agent', title: 'AI Agent', description: '自动采集+分析+生成', icon: FileBarChart },
          { id: 'ppt', title: 'PPT报告', icon: Presentation },
          { id: 'excel', title: 'Excel数据表', icon: FileSpreadsheet },
          { id: 'trend', title: '趋势分析', icon: TrendingUp },
        ]} layout="horizontal" />
      </div>
      <div className="max-w-3xl w-full">
        <ExpandableSection toggleLabel="Agent如何处理数据不一致" hintText="点击展开">
          <p className="text-body-sm text-[var(--text-secondary)]">当不同系统数据口径不一致时（如CRM的客户数与计费系统的账户数不匹配），Agent会自动标注差异点，生成差异报告，并提示用户确认以哪个系统为准。结合RAG检索历史处理方案，给出推荐的数据对齐策略。</p>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide15_Scene2);
