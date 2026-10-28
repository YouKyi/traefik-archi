import React from 'react';

interface NetworkNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  // Exposé à Internet : la pastille du badge passe à l'orange
  exposed?: boolean;
  // Fonction de filtrage (WAF) : tuile d'icône hachurée
  filter?: boolean;
  className?: string;
}

export function NetworkNode({
  icon,
  title,
  subtitle,
  badge,
  exposed = false,
  filter = false,
  className = ''
}: NetworkNodeProps) {
  return (
    <div className={`ta-node ${className}`}>
      <span className="ta-node__main">
        <span className={`ta-node__icon${filter ? ' ta-node__icon--filter' : ''}`} aria-hidden="true">
          {icon}
        </span>
        <span className="ta-node__text">
          <span className="ta-node__title">{title}</span>
          <span className="ta-node__sub">{subtitle}</span>
        </span>
      </span>
      {badge && (
        <span className={`yk-badge${exposed ? ' yk-badge--accent' : ''}`}>
          <span className="yk-badge__dot" aria-hidden="true" />
          {badge}
        </span>
      )}
    </div>
  );
}
