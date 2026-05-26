import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChapterBadge from '@/components/ChapterBadge';

interface SlideProps { isActive: boolean; }

const DEPLOY_HINTS = [
  { icon: '🔒', label: '敏感数据', hint: '→ 内网模型 + 加密', color: '#EF4444' },
  { icon: '⏰', label: '24h运行', hint: '→ 云端部署', color: '#3B82F6' },
  { icon: '📁', label: '本地文件', hint: '→ 本地部署', color: '#8B5CF6' },
];

const Slide21_SelfCheck: React.FC<SlideProps> = ({ isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo('.dt-title', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7 });
      tl.fromTo('.dt-subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3);

      tl.fromTo('.dt-n0', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }, 0.5);
      tl.fromTo('.dt-n1', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }, 0.65);
      tl.fromTo('.dt-n2', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(1.5)' }, 0.85);
      tl.fromTo('.dt-n3', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(1.5)' }, 1.1);
      tl.fromTo('.dt-deploy', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.5);
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isActive] });

  const lineColor = '#64748b';
  const qColor = '#3B82F6';

  return (
    <section ref={containerRef}
      className="w-full h-[100dvh] flex flex-col items-center pt-14 pb-16 px-4 md:px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}>

      <h2 className="dt-title text-h1 md:text-display font-bold text-[var(--text-primary)] mb-1 opacity-0 flex items-center gap-2">
        <ChapterBadge chapter={3} />
        场景决策树
      </h2>
      <p className="dt-subtitle text-body-sm text-[var(--text-secondary)] text-center mb-2 opacity-0">
        不是"能不能用"——而是"用什么模式用"
      </p>

      {/* Decision tree */}
      <div className="max-w-6xl w-full rounded-xl border p-2 flex-1 min-h-0"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>

        {/* viewBox widened from 580 to 700, all node positions re-laid to avoid overlap */}
        <svg viewBox="0 0 700 340" className="w-full h-full" preserveAspectRatio="xMidYMid meet">

          {/* ===== ORTHOGONAL CONNECTORS ===== */}
          <g stroke={lineColor} strokeWidth="1.2" fill="none">
            {/* Start → Q1 */}
            <path d="M 340,28 V 48" />

            {/* Q1 → branches (y=90 junction) */}
            <path d="M 340,78 V 92 H 80 V 108" />
            <path d="M 340,78 V 108" />
            <path d="M 340,78 V 92 H 600 V 108" />

            {/* Q1a → R_free */}
            <path d="M 80,136 V 155" />
            {/* Q1b → Q2 */}
            <path d="M 340,136 V 155" />
            {/* Q1c → Q3 */}
            <path d="M 600,136 V 155" />

            {/* Q2 → branches (y=205 junction) */}
            <path d="M 340,185 V 205 H 220 V 218" />
            <path d="M 340,185 V 205 H 430 V 218" />

            {/* Q3 → branches (y=205 junction) */}
            <path d="M 600,185 V 205 H 560 V 218" />
            <path d="M 600,185 V 205 H 660 V 218" />
          </g>

          {/* ===== BRANCH LABELS ===== */}
          <text x="185" y="90" fill="#10B981" fontSize="8" fontWeight="bold">低影响</text>
          <text x="320" y="90" fill="#F59E0B" fontSize="8" fontWeight="bold">中影响</text>
          <text x="490" y="90" fill="#EF4444" fontSize="8" fontWeight="bold">高影响</text>

          <text x="265" y="203" fill="#10B981" fontSize="8" fontWeight="bold">经常做</text>
          <text x="388" y="203" fill="#F59E0B" fontSize="8" fontWeight="bold">偶尔做</text>

          <text x="568" y="203" fill="#10B981" fontSize="8" fontWeight="bold">可编码</text>
          <text x="637" y="203" fill="#EF4444" fontSize="8" fontWeight="bold">不可编码</text>

          {/* ===== NODES ===== */}

          {/* Start */}
          <g className="dt-n0" style={{ transformOrigin: '340px 17px' }}>
            <rect x="290" y="6" width="100" height="22" rx="11" fill="var(--primary, #3B82F6)" />
            <text x="340" y="21" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">我的场景？</text>
          </g>

          {/* Q1 */}
          <g className="dt-n1" style={{ transformOrigin: '340px 63px' }}>
            <rect x="265" y="48" width="150" height="30" rx="6"
              fill="rgba(59,130,246,0.08)" stroke={qColor} strokeWidth="1.5" />
            <text x="340" y="67" textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="bold">出错影响有多大？</text>
          </g>

          {/* Q1a - 低影响 */}
          <g className="dt-n2" style={{ transformOrigin: '80px 122px' }}>
            <rect x="10" y="108" width="140" height="28" rx="6"
              fill="rgba(16,185,129,0.06)" stroke="#10B981" strokeWidth="1.5" />
            <text x="80" y="126" textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="bold">错了也无所谓</text>
          </g>

          {/* Q1b - 中影响 */}
          <g className="dt-n2" style={{ transformOrigin: '340px 122px' }}>
            <rect x="275" y="108" width="130" height="28" rx="6"
              fill="rgba(245,158,11,0.06)" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="340" y="126" textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="bold">需要准确但能修正</text>
          </g>

          {/* Q1c - 高影响 */}
          <g className="dt-n2" style={{ transformOrigin: '600px 122px' }}>
            <rect x="530" y="108" width="140" height="28" rx="6"
              fill="rgba(239,68,68,0.06)" stroke="#EF4444" strokeWidth="1.5" />
            <text x="600" y="126" textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="bold">有严重后果</text>
          </g>

          {/* R_free: ✅ 随意使用 */}
          <g className="dt-n3" style={{ transformOrigin: '80px 193px' }}>
            <rect x="10" y="155" width="140" height="76" rx="8"
              fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="2" />
            <text x="80" y="171" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">✅ 随意使用</text>
            <text x="80" y="185" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5">直接对话即可</text>
            <text x="80" y="197" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">L1 人设对话</text>
            <text x="80" y="209" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">起草·头脑风暴·翻译</text>
            <text x="80" y="221" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">信息汇总·知识问答</text>
          </g>

          {/* Q2 */}
          <g className="dt-n2" style={{ transformOrigin: '340px 170px' }}>
            <rect x="278" y="155" width="124" height="30" rx="6"
              fill="rgba(59,130,246,0.08)" stroke={qColor} strokeWidth="1.5" />
            <text x="340" y="174" textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="bold">任务做几次？</text>
          </g>

          {/* Q3 */}
          <g className="dt-n2" style={{ transformOrigin: '600px 170px' }}>
            <rect x="533" y="155" width="134" height="30" rx="6"
              fill="rgba(59,130,246,0.08)" stroke={qColor} strokeWidth="1.5" />
            <text x="600" y="174" textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="bold">规则能否编码？</text>
          </g>

          {/* R_invest: 🔧 投入沉淀 */}
          <g className="dt-n3" style={{ transformOrigin: '220px 256px' }}>
            <rect x="155" y="218" width="130" height="76" rx="8"
              fill="rgba(245,158,11,0.08)" stroke="#F59E0B" strokeWidth="2" />
            <text x="220" y="234" textAnchor="middle" fill="#D97706" fontSize="10" fontWeight="bold">🔧 值得投入</text>
            <text x="220" y="248" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5">开发 Skills → Agent 调用</text>
            <text x="220" y="260" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">L2-L3 任务助理 + 调度</text>
            <text x="220" y="272" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">自动日报·数据提取</text>
            <text x="220" y="284" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">周期报表·流程自动化</text>
          </g>

          {/* R_review: ✅ + 审核 */}
          <g className="dt-n3" style={{ transformOrigin: '430px 256px' }}>
            <rect x="365" y="218" width="130" height="76" rx="8"
              fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="2" />
            <text x="430" y="234" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">✅ 用 + 审核</text>
            <text x="430" y="248" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5">人工把关关键节点</text>
            <text x="430" y="260" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">L2 任务助理</text>
            <text x="430" y="272" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">偶尔数据查询</text>
            <text x="430" y="284" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">不常见文档处理</text>
          </g>

          {/* R_program: ⚙️ 传统程序 */}
          <g className="dt-n3" style={{ transformOrigin: '560px 256px' }}>
            <rect x="495" y="218" width="130" height="76" rx="8"
              fill="rgba(59,130,246,0.06)" stroke="#3B82F6" strokeWidth="2" />
            <text x="560" y="234" textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="bold">⚙️ 传统程序</text>
            <text x="560" y="248" textAnchor="middle" fill="var(--text-primary)" fontSize="7.5">Agent 辅助编写程序</text>
            <text x="560" y="260" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">VibeCoding 不直接执行</text>
            <text x="560" y="272" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">财务计算·权限校验</text>
            <text x="560" y="284" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">交易处理·数据校验</text>
          </g>

          {/* R_not: ❌ 不适合 */}
          <g className="dt-n3" style={{ transformOrigin: '660px 256px' }}>
            <rect x="630" y="218" width="60" height="76" rx="8"
              fill="rgba(239,68,68,0.06)" stroke="#EF4444" strokeWidth="2" />
            <text x="660" y="234" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">❌</text>
            <text x="660" y="248" textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold">基本</text>
            <text x="660" y="260" textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold">不适合</text>
            <text x="660" y="274" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">人工处理</text>
            <text x="660" y="286" textAnchor="middle" fill="var(--text-secondary)" fontSize="7">或等成熟</text>
          </g>

          {/* Bottom: cost transfer hints */}
          <text x="350" y="316" textAnchor="middle" fill="var(--text-secondary)" fontSize="7.5">
            🔴 出现时：用操作成本（精准描述）/ 开发成本（确定性程序）/ 确认成本（人工审核）来弥补
          </text>
          <text x="350" y="330" textAnchor="middle" fill="var(--text-secondary)" fontSize="7.5">
            成本不会消失只会转移——关键是让转移后的成本变得可接受
          </text>
        </svg>
      </div>

      {/* Deploy hints */}
      <div className="dt-deploy flex items-center justify-center gap-3 mt-2 opacity-0">
        {DEPLOY_HINTS.map((h) => (
          <span key={h.label} className="text-[10px] px-2.5 py-1 rounded-md"
            style={{ backgroundColor: `${h.color}10`, color: h.color, border: `1px solid ${h.color}25` }}>
            {h.icon} {h.label} {h.hint}
          </span>
        ))}
        <span className="text-[10px] text-[var(--text-light)]">（得出结论后，再根据约束调整部署方式）</span>
      </div>
    </section>
  );
};

export default memo(Slide21_SelfCheck);
