import html2canvas from 'html2canvas-pro';

/**
 * Capture a single slide as canvas — WYSIWYG approach:
 *
 * html2canvas re-renders DOM from CSS, it does NOT take a pixel screenshot.
 * With 25 slides stacked via `position: absolute`, it gets confused.
 *
 * Strategy:
 * 1. Hide all sibling slides   → eliminate interference
 * 2. Make target `position: relative` → html2canvas handles normal flow correctly
 * 3. Strip GSAP inline transforms → clean capture
 * 4. Capture
 * 5. Restore everything
 */
export async function captureSlide(
  slideIndex: number,
): Promise<HTMLCanvasElement | null> {
  const slideEl = document.querySelector(
    `[data-slide-index="${slideIndex}"]`,
  ) as HTMLElement;
  if (!slideEl) return null;

  const bg =
    getComputedStyle(document.documentElement)
      .getPropertyValue('--bg-primary')
      .trim() || '#0f172a';

  // Record dimensions BEFORE changing layout
  const w = slideEl.offsetWidth;
  const h = slideEl.offsetHeight;

  // Save original inline styles so we can restore them exactly
  const saved = new Map<HTMLElement, string>();

  try {
    // --- Step 1: Hide all sibling slides ---
    const container = slideEl.parentElement;
    if (container) {
      container
        .querySelectorAll<HTMLElement>(':scope > [data-slide-index]')
        .forEach((el) => {
          saved.set(el, el.getAttribute('style') || '');
          if (el !== slideEl) {
            el.style.cssText = 'display: none;';
          }
        });
    }

    // --- Step 2: Make target slide flow normally ---
    saved.set(slideEl, slideEl.getAttribute('style') || '');
    slideEl.style.cssText = [
      'position: relative',
      `width: ${w}px`,
      `height: ${h}px`,
      'opacity: 1',
      'transform: none',
      'overflow: hidden',
    ].join('; ');

    // --- Step 3: Capture ---
    const canvas = await html2canvas(slideEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: bg,
      logging: false,
      width: w,
      height: h,
    });

    return canvas;
  } finally {
    // --- Step 4: Restore all original styles ---
    saved.forEach((originalStyle, el) => {
      if (originalStyle) {
        el.setAttribute('style', originalStyle);
      } else {
        el.removeAttribute('style');
      }
    });
  }
}
