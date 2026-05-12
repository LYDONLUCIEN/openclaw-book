import React, { useRef, memo, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, Inbox, Search, FileText, Send, CheckCircle } from 'lucide-react';
import FlowDiagram from '@/components/FlowDiagram';
import ExpandableSection from '@/components/ExpandableSection';

interface SlideProps { isActive: boolean; }

const Slide14_Scene1: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.s1-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      gsap.fromTo('.s1-chart', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3 });
      gsap.fromTo('.s1-flow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });
  useEffect(() => {
    if (!isActive) return;
    let v = 0; const t = setInterval(() => { v += 2; setCounter(Math.min(v, 90)); if (v >= 90) clearInterval(t); }, 30);
    return () => clearInterval(t);
  }, [isActive]);

  return (
    <section ref={containerRef} className="w-full min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="s1-title text-center mb-6">
        <h2 className="text-h1 font-bold text-[var(--text-primary)]">场景1：邮件智能处理</h2>
        <p className="text-body text-[var(--text-secondary)] mt-1">从每天30分钟到3分钟</p>
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-data font-mono font-extrabold text-[var(--accent)]">{counter}%</span>
        <span className="text-h3 text-[var(--text-primary)]">时间节省</span>
      </div>
      <div className="s1-chart w-full max-w-md mx-auto mb-6" style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[{name:'人工处理',时间:30,color:'#ef4444'},{name:'Agent处理',时间:3,color:'#10B981'}]} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" tick={{fontSize:11}} label={{value:'分钟/天',position:'bottom',fontSize:11}} />
            <YAxis dataKey="name" type="category" tick={{fontSize:12}} width={70} />
            <Tooltip />
            <Bar dataKey="时间" fill="var(--primary)" radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="s1-flow max-w-3xl w-full mb-4">
        <FlowDiagram nodes={[
          { id: '1', title: '收件', icon: Inbox },
          { id: '2', title: 'Agent分类', icon: Mail },
          { id: '3', title: '知识库检索', icon: Search },
          { id: '4', title: '草拟回复', icon: FileText },
          { id: '5', title: '人工审核', icon: CheckCircle },
          { id: '6', title: '发送', icon: Send },
        ]} layout="horizontal" />
      </div>
      <div className="max-w-3xl w-full">
        <ExpandableSection toggleLabel="Agent如何理解邮件意图" hintText="点击展开">
          <p className="text-body-sm text-[var(--text-secondary)]">RAG检索+意图识别+个性化回复模板。Agent先分析邮件主题和内容，识别意图（咨询/投诉/通知/请求），然后从16个知识库中检索相关文档，结合用户历史偏好生成个性化回复草稿，最后提交人工审核。关键技术：Embedding向量检索 + Few-shot意图分类。</p>
        </ExpandableSection>
      </div>
    </section>
  );
};

export default memo(Slide14_Scene1);
