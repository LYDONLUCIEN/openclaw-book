import { useEffect, useCallback, useRef } from 'react';

const ZOOM_SCALE = 2;

export function useZoomOnAlt() {
  const altPressedRef = useRef(false);
  const middleDownRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isZoomedRef = useRef(false);

  const isActive = useCallback(() => altPressedRef.current || middleDownRef.current, []);

  const registerContainer = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
    if (el) {
      el.style.transform = 'scale(1)';
      el.style.transformOrigin = 'center center';
    }
  }, []);

  useEffect(() => {
    const enableZoom = (x: number, y: number) => {
      const el = containerRef.current;
      if (!el) return;
      isZoomedRef.current = true;
      el.style.transition = 'transform 0.15s ease-out';
      el.style.transform = `scale(${ZOOM_SCALE})`;
      el.style.transformOrigin = `${x}px ${y}px`;
      el.style.overflow = 'visible';
      el.style.zIndex = '50';
    };

    const moveZoomTo = (x: number, y: number) => {
      const el = containerRef.current;
      if (!el) return;
      el.style.transition = 'transform-origin 0.15s ease-out';
      el.style.transformOrigin = `${x}px ${y}px`;
    };

    const disableZoom = () => {
      const el = containerRef.current;
      if (!el) return;
      isZoomedRef.current = false;
      // Keep current transformOrigin — zoom out from where we zoomed in
      el.style.transition = 'transform 0.25s ease-in';
      el.style.transform = 'scale(1)';
      el.style.overflow = 'hidden';
      el.style.zIndex = '';
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt' && !altPressedRef.current) {
        e.preventDefault();
        altPressedRef.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        altPressedRef.current = false;
        if (!middleDownRef.current) disableZoom();
      }
    };

    // Alt held + left click OR middle click → zoom to click position
    const handleMouseDown = (e: MouseEvent) => {
      const isMiddleDown = e.button === 1;
      const isAltLeftClick = altPressedRef.current && e.button === 0;

      if (isMiddleDown) {
        e.preventDefault();
        e.stopPropagation();
        middleDownRef.current = true;
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (isZoomedRef.current) {
          moveZoomTo(x, y);
        } else {
          enableZoom(x, y);
        }
        return;
      }

      if (isAltLeftClick) {
        e.preventDefault();
        e.stopPropagation();
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (isZoomedRef.current) {
          moveZoomTo(x, y);
        } else {
          enableZoom(x, y);
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1 && middleDownRef.current) {
        middleDownRef.current = false;
        if (!altPressedRef.current) disableZoom();
      }
    };

    // Block all click events while zoom-active to prevent slide interactions
    const blockClick = (e: MouseEvent) => {
      if (!isActive()) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const handleBlur = () => {
      const wasActive = isActive();
      altPressedRef.current = false;
      middleDownRef.current = false;
      if (wasActive) disableZoom();
    };

    // Use capture phase to intercept clicks before anything else
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('click', blockClick, true);
    window.addEventListener('blur', handleBlur);
    // Prevent middle-click auto-scroll
    window.addEventListener('auxclick', blockClick, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('click', blockClick, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('auxclick', blockClick, true);
      disableZoom();
    };
  }, []);

  return { registerContainer };
}
