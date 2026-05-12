import React, { memo } from 'react';

interface SlideProps {
  isActive: boolean;
}

/**
 * Slide 6 — Placeholder
 * Full viewport placeholder slide
 */
const Slide06_Placeholder: React.FC<SlideProps> = () => {
  return (
    <section
      className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="text-center">
        <span className="text-caption text-[var(--text-light)] uppercase tracking-wider">
          Coming Soon
        </span>
        <h2 className="text-h1 text-[var(--primary)] mt-2 font-bold">
          Slide 6
        </h2>
        <div
          className="w-16 h-0.5 mx-auto mt-4"
          style={{
            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          }}
        />
      </div>
    </section>
  );
};

export default memo(Slide06_Placeholder);
