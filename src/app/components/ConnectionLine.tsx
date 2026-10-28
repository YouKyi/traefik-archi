import type { CSSProperties } from 'react';
import { motion } from 'motion/react';

interface ConnectionLineProps {
  type: 'public' | 'internal' | 'auth' | 'restricted';
  // responsive : vertical sur mobile, horizontal à partir de 640px
  orientation?: 'vertical' | 'horizontal' | 'responsive';
  // Longueur du trait (CSS), 28px en vertical et 32px en horizontal par défaut
  length?: string;
  // Délai (s) du tracé : le trait se dessine quand le conteneur parent passe
  // à l'état « shown » (variantes motion), une seule fois
  reveal?: number;
  className?: string;
}

export function ConnectionLine({ type, orientation = 'vertical', length, reveal, className = '' }: ConnectionLineProps) {
  const props = {
    'aria-hidden': true,
    className: `ta-link ta-link--${type} ta-link--${orientation} ${className}`,
    style: { transformOrigin: '0 0', ...(length ? { '--ta-len': length } : {}) } as CSSProperties,
  };

  if (reveal === undefined) return <span {...props} />;

  return (
    <motion.span
      {...props}
      variants={{
        hidden: { scale: 0 },
        shown: { scale: 1, transition: { delay: reveal, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
    />
  );
}
