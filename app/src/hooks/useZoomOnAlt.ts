import { useEffect, useCallback, useRef } from 'react';

const ZOOM_SCALE = 2;

export function useZoomOnAlt() {
  const altPressedRef = useRef(false);
  const middleDownRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isZoomedRef = useRef(false);
  // Pan (drag) state
  const isDraggingRef = useRef(false);
  const dragStartClientX = useRef(0);
  const dragStartClientY = useRef(0);
  const panXRef = useRef(0);
  const panYRef = useRef(0);
  const panStartXRef = useRef(0);
  const panStartYRef = useRef(0);

  const isActive = useCallback(() => altPressedRef.current || middleDownRef.current, []);

  const registerContainer = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
    if (el) {
      el.style.transform = 'scale(1)';
      el.style.transformOrigin = 'center center';
    }
  }, []);

  useEffect(() => {
    const applyTransform = () => {
      const el = containerRef.current;
      if (!el) return;
      if (isZoomedRef.current) {
        el.style.transform = `scale(${ZOOM_SCALE}) translate(${panXRef.current}px, ${panYRef.current}px)`;
      } else {
        el.style.transform = 'scale(1)';
      }
    };

    const enableZoom = (x: number, y: number) => {
      const el = containerRef.current;
      if (!el) return;
      isZoomedRef.current = true;
      // Reset pan when first zooming in
      panXRef.current = 0;
      panYRef.current = 0;
      el.style.transition = 'transform 0.15s ease-out';
      el.style.transformOrigin = `${x}px ${y}px`;
      applyTransform();
      el.style.overflow = 'visible';
      el.style.zIndex = '50';
    };

    const moveZoomTo = (x: number, y: number) => {
      const el = containerRef.current;
      if (!el) return;
      // Reset pan when moving zoom point
      panXRef.current = 0;
      panYRef.current = 0;
      el.style.transition = 'transform-origin 0.15s ease-out';
      el.style.transformOrigin = `${x}px ${y}px`;
      applyTransform();
    };

    const disableZoom = () => {
      const el = containerRef.current;
      if (!el) return;
      isZoomedRef.current = false;
      isDraggingRef.current = false;
      panXRef.current = 0;
      panYRef.current = 0;
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
        // Stop any active drag
        isDraggingRef.current = false;
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
          // Move zoom point and enable dragging
          moveZoomTo(x, y);
          isDraggingRef.current = true;
          dragStartClientX.current = e.clientX;
          dragStartClientY.current = e.clientY;
          panStartXRef.current = panXRef.current;
          panStartYRef.current = panYRef.current;
        } else {
          enableZoom(x, y);
          // Enable dragging immediately after zoom-in
          isDraggingRef.current = true;
          dragStartClientX.current = e.clientX;
          dragStartClientY.current = e.clientY;
          panStartXRef.current = 0;
          panStartYRef.current = 0;
        }
        return;
      }

      if (isAltLeftClick) {
        e.preventDefault();
        e.stopPropagation();
        // Start drag if already zoomed
        if (isZoomedRef.current) {
          isDraggingRef.current = true;
          dragStartClientX.current = e.clientX;
          dragStartClientY.current = e.clientY;
          panStartXRef.current = panXRef.current;
          panStartYRef.current = panYRef.current;
        } else {
          const container = containerRef.current;
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          enableZoom(x, y);
          // Immediately enable dragging after first zoom-in click
          isDraggingRef.current = true;
          dragStartClientX.current = e.clientX;
          dragStartClientY.current = e.clientY;
          panStartXRef.current = 0;
          panStartYRef.current = 0;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !isZoomedRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const el = containerRef.current;
      if (!el) return;

      const dx = e.clientX - dragStartClientX.current;
      const dy = e.clientY - dragStartClientY.current;

      // Translate is in scaled space, so raw pixel delta is correct
      // (1px mouse = 1px in scaled coordinate system, but visually it's 2px,
      //  which gives natural 1:1 hand tracking feel)
      panXRef.current = panStartXRef.current + dx;
      panYRef.current = panStartYRef.current + dy;

      el.style.transition = 'none';
      applyTransform();
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Stop drag
      if (isDraggingRef.current && e.button === 0) {
        isDraggingRef.current = false;
      }

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
      isDraggingRef.current = false;
      if (wasActive) disableZoom();
    };

    // Use capture phase to intercept clicks before anything else
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mousemove', handleMouseMove, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('click', blockClick, true);
    window.addEventListener('blur', handleBlur);
    // Prevent middle-click auto-scroll
    window.addEventListener('auxclick', blockClick, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('mousemove', handleMouseMove, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('click', blockClick, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('auxclick', blockClick, true);
      disableZoom();
    };
  }, []);

  return { registerContainer };
}
