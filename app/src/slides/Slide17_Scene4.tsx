import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Filter, ScanSearch, FileText } from 'lucide-react';
import FlowDiagram from '@/components/FlowDiagram';
import Badge from '@/components/Badge';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide17_Scene4: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s4-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s4-chart', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.s4-flow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });
  useEffect(() => {
    if (!isActive) return;
    let v = 0; const t = setInterval(() => { v += 2; setCounter(Math.min(v, 98)); if (v >= 98) clearInterval(t); }, 25);
    return () => clearInterval(t);
  }, [isActive]);

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="s4-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">场景4：跨系统数据稽核</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">从5天到1小时的合规利器</p>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="text-data font-mono font-extrabold text-[var(--accent)]">{counter}%</span>
        <span className="text-h3 text-[var(--text-primary)]">时间节省</span>
      </div>
      <div className="mb-4"><Badge variant="success">满足SOX合规要求</Badge></div>
      <div className="s4-chart w-full max-w-md mx-auto mb-6" style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{name:'人工处理',小时:40},{name:'Agent处理',小时:1}]} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" tick={{fontSize:11}} label={{value:'小时',position:'bottom',fontSize:11}} />
            <YAxis dataKey="name" type="category" tick={{fontSize:12}} width={70} />
            <Tooltip />
            <Bar dataKey="小时" fill="var(--primary)" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="s4-flow max-w-3xl w-full mb-4">
        <FlowDiagram nodes={[
          { id: '1', title: '采集', description: '从5个系统抽取数据', icon: Download },
          { id: '2', title: '校验', description: '规则引擎+AI双重校验', icon: Filter },
          { id: '3', title: '检测', description: '异常模式识别', icon: ScanSearch },
          { id: '4', title: '报告', description: '自动生成合规报告', icon: FileText },
        ]} layout="horizontal" />
      </div>
      <div className="max-w-3xl w-full">
        <ExpandableSection toggleLabel="审计日志与合规保障" hintText="点击展开">
          <p className="text-body-sm text-[var(--text-secondary)]">所有Agent操作都有完整审计轨迹——谁触发了任务、采集了哪些数据、使用了什么规则、发现了哪些异常、生成了什么报告。审计日志不可篡改，满足SOX合规和内部审计要求。准确率从92%提升至99.7%，每月处理5000+票据。</p>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide17_Scene4);
