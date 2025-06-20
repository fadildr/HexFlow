import React, { memo, useMemo } from 'react';

interface FloatingTextItem {
  text: string;
  position: string;
  maxWidth: string;
  animation: string;
  delay: string;
  transform: string;
}

interface FloatingTextProps {
  items: FloatingTextItem[];
}

export const FloatingText: React.FC<FloatingTextProps> = memo(({ items }) => {
  const renderedItems = useMemo(() => {
    return items.map((item, index) => (
      <div
        key={index}
        className={`absolute ${item.position} text-white text-sm md:text-base font-medium max-w-[260px] opacity-0 glass-effect backdrop-blur-sm bg-white/10 rounded-lg p-3 shadow-lg border border-white/20`}
        style={{
          animation: `${item.animation} 0.8s ease-out ${item.delay} forwards, floatText ${3 + (index % 2)}s ease-in-out infinite ${0.8 + parseFloat(item.delay)}s, pulseGlow ${4 + (index % 3)}s ease-in-out infinite ${1 + parseFloat(item.delay)}s`,
          transform: item.transform,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {item.text}
      </div>
    ));
  }, [items]);

  return <div className="absolute inset-0">{renderedItems}</div>;
});

FloatingText.displayName = 'FloatingText';
