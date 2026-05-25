import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import { useSlideContext } from '@/context/SlideContext';
import { captureSlide } from '@/lib/captureSlide';

const ANIMATION_WAIT = 2000;

const PDFExportButton: React.FC<{ className?: string }> = ({ className }) => {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { goToSlide, currentSlide } = useSlideContext();

  // Refs to always get latest values in async loop (avoid stale closures)
  const goToSlideRef = useRef(goToSlide);
  const currentSlideRef = useRef(currentSlide);
  goToSlideRef.current = goToSlide;
  currentSlideRef.current = currentSlide;

  const handleExport = useCallback(async () => {
    setExporting(true);
    setProgress(0);

    const startSlide = currentSlideRef.current;

    const slideContainer = document.querySelector('[data-slide-container]') as HTMLElement;
    if (!slideContainer) { setExporting(false); return; }

    const slideEls = slideContainer.querySelectorAll<HTMLElement>(':scope > div[data-slide-index]');
    const total = slideEls.length;

    const containerW = slideContainer.clientWidth;
    const containerH = slideContainer.clientHeight;

    const pdf = new jsPDF({
      orientation: containerW > containerH ? 'landscape' : 'portrait',
      unit: 'px',
      format: [containerW, containerH],
    });

    let first = true;

    for (let i = 0; i < total; i++) {
      setProgress(Math.round(((i + 1) / total) * 100));

      // Navigate to trigger isActive + entrance animations
      goToSlideRef.current(i);

      // Wait for GSAP transition (~0.6s) + slide entrance animations
      await new Promise(r => setTimeout(r, ANIMATION_WAIT));

      const canvas = await captureSlide(i);
      if (!canvas) continue;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      if (first) { first = false; } else { pdf.addPage(); }
      pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    }

    // Restore original slide
    goToSlideRef.current(startSlide);
    await new Promise(r => setTimeout(r, 500));

    pdf.save('AI智能体讲座.pdf');
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
