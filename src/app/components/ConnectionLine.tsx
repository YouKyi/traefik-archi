import type { CSSProperties } from 'react';

interface ConnectionLineProps {
  type: 'public' | 'internal' | 'auth' | 'restricted';
  // responsive : vertical sur mobile, horizontal à partir de 640px
  orientation?: 'vertical' | 'horizontal' | 'responsive';
  // Longueur du trait (CSS), 28px en vertical et 32px en horizontal par défaut
  length?: string;
  className?: string;
}

export function ConnectionLine({ type, orientation = 'vertical', length, className = '' }: ConnectionLineProps) {
  return (
    <span
      aria-hidden="true"
      className={`ta-link ta-link--${type} ta-link--${orientation} ${className}`}
      style={length ? ({ '--ta-len': length } as CSSProperties) : undefined}
    />
  );
}
