import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface ImageZoomState {
  src: string;
  alt: string;
  originRect: DOMRect;
  originElement: HTMLImageElement;
}

interface ImageZoomContextValue {
  isOpen: boolean;
  state: ImageZoomState | null;
  openZoom: (src: string, alt: string, originElement: HTMLImageElement) => void;
  closeZoom: () => void;
}

const ImageZoomContext = createContext<ImageZoomContextValue | null>(null);

export function useImageZoom() {
  const ctx = useContext(ImageZoomContext);
  if (!ctx) throw new Error('useImageZoom must be used within ImageZoomProvider');
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  ImageOverlay (internal, portal-based)                              */
/* ------------------------------------------------------------------ */

function ImageOverlay() {
  const { state, closeZoom } = useImageZoom();
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stateRef = useRef(state);
  const closeZoomRef = useRef(closeZoom);
  const [imgLoaded, setImgLoaded] = useState(false);
  const isClosingRef = useRef(false);

  // Keep refs in sync
  stateRef.current = state;
  closeZoomRef.current = closeZoom;

  // Reset loaded state when src changes
  useEffect(() => {
    setImgLoaded(false);
    isClosingRef.current = false;
  }, [state?.src]);

  // Escape key + keyboard blocking
  useEffect(() => {
    if (!state) return;
    const handler = (e: KeyboardEvent) => {
      if (isClosingRef.current) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown'].includes(e.key)) {
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!state]);

  // Run FLIP open animation when image is loaded
  useEffect(() => {
    if (!state || !imgLoaded || !imgRef.current || !backdropRef.current) return;

    const overlayImg = imgRef.current;
    const backdrop = backdropRef.current;
    const { originRect, originElement } = state;

    // Calculate centered target rect
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = vw * 0.85;
    const maxH = vh * 0.85;
    const aspect = overlayImg.naturalWidth / overlayImg.naturalHeight;

    let targetW: number, targetH: number;
    if (aspect > maxW / maxH) {
      targetW = maxW;
      targetH = maxW / aspect;
    } else {
      targetH = maxH;
      targetW = maxH * aspect;
    }
    const targetX = (vw - targetW) / 2;
    const targetY = (vh - targetH) / 2;

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Build open timeline
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.set(overlayImg, {
      left: originRect.left,
      top: originRect.top,
      width: originRect.width,
      height: originRect.height,
      opacity: 1,
      pointerEvents: 'auto',
    })
      .set(originElement, { opacity: 0 })
      .to(backdrop, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
      .to(overlayImg, {
        left: targetX,
        top: targetY,
        width: targetW,
        height: targetH,
        duration: 0.5,
        ease: 'power3.out',
      }, 0.05);

    if (closeBtnRef.current) {
      tl.fromTo(closeBtnRef.current, { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)',
      }, 0.25);
    }
  }, [state, imgLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const handleClose = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState || !imgRef.current || !backdropRef.current || isClosingRef.current) return;

    isClosingRef.current = true;

    const overlayImg = imgRef.current;
    const backdrop = backdropRef.current;
    const { originRect, originElement } = currentState;

    tlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(originElement, { opacity: 1 });
        document.body.style.overflow = '';
        closeZoomRef.current();
      },
    });

    tlRef.current = tl;

    tl.to(closeBtnRef.current, { opacity: 0, scale: 0.8, duration: 0.15 }, 0)
      .to(overlayImg, {
        left: originRect.left,
        top: originRect.top,
        width: originRect.width,
        height: originRect.height,
        duration: 0.4,
        ease: 'power3.inOut',
      }, 0)
      .to(backdrop, { opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.05);
  }, []);

  if (!state) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100]"
      onClick={handleClose}
      role="dialog"
      aria-label="Image preview"
    >
      {/* Dark scrim */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/75"
        style={{ opacity: 0 }}
      />
      {/* Flying image */}
      <img
        ref={imgRef}
        src={state.src}
        alt={state.alt}
        className="absolute object-contain rounded-lg shadow-2xl"
        style={{ opacity: 0, pointerEvents: 'none' }}
        onLoad={() => setImgLoaded(true)}
        draggable={false}
      />
      {/* Close button */}
      <button
        ref={closeBtnRef}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        style={{ opacity: 0 }}
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        aria-label="Close preview"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export const ImageZoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ImageZoomState | null>(null);

  const openZoom = useCallback((src: string, alt: string, originElement: HTMLImageElement) => {
    const rect = originElement.getBoundingClientRect();
    setState({ src, alt, originRect: rect, originElement });
  }, []);

  const closeZoom = useCallback(() => {
    setState(null);
  }, []);

  return (
    <ImageZoomContext.Provider value={{ isOpen: !!state, state, openZoom, closeZoom }}>
      {children}
      {state && <ImageOverlay />}
    </ImageZoomContext.Provider>
  );
};

/* ------------------------------------------------------------------ */
/*  ClickableImage wrapper                                             */
/* ------------------------------------------------------------------ */

interface ClickableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const ClickableImage: React.FC<ClickableImageProps> = (props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { openZoom } = useImageZoom();

  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const img = imgRef.current;
    if (img) {
      openZoom(props.src, props.alt, img);
    }
  }, [openZoom, props.src, props.alt]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      const img = imgRef.current;
      if (img) {
        openZoom(props.src, props.alt, img);
      }
    }
  }, [openZoom, props.src, props.alt]);

  return (
    <img
      {...props}
      ref={imgRef}
      className={`${props.className || ''} cursor-zoom-in`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    />
  );
};

export default React.memo(ClickableImage);
