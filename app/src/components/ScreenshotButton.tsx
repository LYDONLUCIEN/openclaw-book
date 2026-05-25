import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Camera } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { useSlideContext } from '@/context/SlideContext';

const ScreenshotButton: React.FC<{ className?: string }> = ({ className }) => {
  const [capturing, setCapturing] = useState(false);
  const { currentSlide } = useSlideContext();

  const handleScreenshot = useCallback(async () => {
    setCapturing(true);

    const slideEl = document.querySelector(`[data-slide-index="${currentSlide}"]`) as HTMLElement;
    if (!slideEl) { setCapturing(false); return; }

    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg-primary').trim() || '#0f172a';

    try {
      const canvas = await html2canvas(slideEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: bg,
        logging: false,
        width: slideEl.clientWidth,
        height: slideEl.clientHeight,
      });

      const link = document.createElement('a');
      link.download = `slide_${String(currentSlide).padStart(2, '0')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setCapturing(false);
    }
  }, [currentSlide]);

  return (
    <button
      onClick={handleScreenshot}
      disabled={capturing}
      className={cn(
        'h-9 px-3 rounded-full flex items-center gap-1.5',
        'bg-[var(--card-bg)] border border-[var(--border)] shadow-toggle',
        'transition-all duration-200 hover:scale-105',
        'text-caption font-medium',
        capturing && 'opacity-70 cursor-wait',
        className
      )}
      aria-label="截图当前页"
    >
      {capturing ? (
        <div className="w-3 h-3 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <Camera className="w-4 h-4 text-[var(--primary)]" strokeWidth={2} />
          <span className="text-[var(--text-secondary)]">截图</span>
        </>
      )}
    </button>
  );
};

export default ScreenshotButton;
