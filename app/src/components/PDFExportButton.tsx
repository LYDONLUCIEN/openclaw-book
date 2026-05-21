import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

interface PDFExportButtonProps {
  className?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ className }) => {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = useCallback(async () => {
    setExporting(true);
    setProgress(0);

    const slideContainer = document.querySelector('[data-slide-container]') as HTMLElement;
    if (!slideContainer) return;

    const slideEls = slideContainer.querySelectorAll<HTMLElement>(':scope > div[data-slide-index]');
    const total = slideEls.length;

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });
    let first = true;

    for (let i = 0; i < total; i++) {
      setProgress(Math.round(((i + 1) / total) * 100));

      const el = slideEls[i];
      const origOpacity = el.style.opacity;
      const origPointerEvents = el.style.pointerEvents;
      const origPosition = el.style.position;
      const origTop = el.style.top;
      const origLeft = el.style.left;

      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
      el.style.position = 'relative';
      el.style.top = '0';
      el.style.left = '0';

      try {
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim() || '#0f172a',
          logging: false,
          width: el.scrollWidth,
          height: el.scrollHeight,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const imgW = pdf.internal.pageSize.getWidth();
        const imgH = pdf.internal.pageSize.getHeight();

        if (first) {
          first = false;
        } else {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, imgW, imgH);
      } finally {
        el.style.opacity = origOpacity;
        el.style.pointerEvents = origPointerEvents;
        el.style.position = origPosition;
        el.style.top = origTop;
        el.style.left = origLeft;
      }

      await new Promise(r => setTimeout(r, 50));
    }

    pdf.save('OpenClaw讲座.pdf');
    setExporting(false);
    setProgress(0);
  }, []);

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className={cn(
        'h-9 px-3 rounded-full flex items-center gap-1.5',
        'bg-[var(--card-bg)] border border-[var(--border)] shadow-toggle',
        'transition-all duration-200 hover:scale-105',
        'text-caption font-medium',
        exporting && 'opacity-70 cursor-wait',
        className
      )}
      aria-label="导出PDF"
    >
      {exporting ? (
        <>
          <div className="w-3 h-3 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <span className="text-[var(--text-secondary)]">{progress}%</span>
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4 text-[var(--primary)]" strokeWidth={2} />
          <span className="text-[var(--text-secondary)]">PDF</span>
        </>
      )}
    </button>
  );
};

export default PDFExportButton;
