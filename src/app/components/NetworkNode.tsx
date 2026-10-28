import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NetworkNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  // Fonction de filtrage (WAF) : tuile d'icône hachurée
  filter?: boolean;
  // Présent : le nœud devient un bouton qui ouvre son détail
  onSelect?: () => void;
  className?: string;
}

export function NetworkNode({
  icon,
  title,
  subtitle,
  filter = false,
  onSelect,
  className = ''
}: NetworkNodeProps) {
  const content = (
    <>
      <span className={`ta-node__icon${filter ? ' ta-node__icon--filter' : ''}`} aria-hidden="true">
        {icon}
      </span>
      <span className="ta-node__text">
        <span className="ta-node__title">{title}</span>
        <span className="ta-node__sub">{subtitle}</span>
      </span>
    </>
  );

  if (!onSelect) return <div className={`ta-node ${className}`}>{content}</div>;

  return (
    <button type="button" aria-haspopup="dialog" onClick={onSelect} className={`ta-node ta-node--interactive ${className}`}>
      {content}
      <ChevronRight className="ta-node__more" aria-hidden="true" />
    </button>
  );
}
