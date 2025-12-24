import React from 'react';

interface NetworkNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: 'red' | 'blue' | 'green' | 'gray' | 'slate';
  size?: 'small' | 'medium' | 'large';
  badge?: string;
}

const colorMap = {
  red: {
    bg: 'bg-red-100',
    border: 'border-red-300',
    text: 'text-red-900',
    iconBg: 'bg-red-500',
    badge: 'bg-red-600'
  },
  blue: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-900',
    iconBg: 'bg-blue-500',
    badge: 'bg-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    border: 'border-green-300',
    text: 'text-green-900',
    iconBg: 'bg-green-500',
    badge: 'bg-green-600'
  },
  gray: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-900',
    iconBg: 'bg-gray-500',
    badge: 'bg-gray-600'
  },
  slate: {
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    text: 'text-slate-900',
    iconBg: 'bg-slate-500',
    badge: 'bg-slate-600'
  }
};

const sizeMap = {
  small: {
    padding: 'p-2',
    iconSize: 'w-8 h-8',
    titleSize: 'text-xs',
    subtitleSize: 'text-[10px]'
  },
  medium: {
    padding: 'p-3',
    iconSize: 'w-10 h-10',
    titleSize: 'text-sm',
    subtitleSize: 'text-xs'
  },
  large: {
    padding: 'p-4',
    iconSize: 'w-12 h-12',
    titleSize: 'text-base',
    subtitleSize: 'text-sm'
  }
};

export function NetworkNode({ 
  icon, 
  title, 
  subtitle, 
  color, 
  size = 'large',
  badge 
}: NetworkNodeProps) {
  const colors = colorMap[color];
  const sizes = sizeMap[size];

  return (
    <div className="relative">
      <div className={`
        ${colors.bg} ${colors.border} ${sizes.padding}
        border-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300
        flex flex-col items-center text-center gap-2 min-w-[160px]
      `}>
        <div className={`
          ${colors.iconBg} ${sizes.iconSize}
          rounded-lg flex items-center justify-center text-white shadow-md
        `}>
          {icon}
        </div>
        <div>
          <div className={`${colors.text} ${sizes.titleSize}`}>{title}</div>
          <div className={`text-slate-600 ${sizes.subtitleSize}`}>{subtitle}</div>
        </div>
        {badge && (
          <span className={`
            ${colors.badge} text-white text-[10px] px-2 py-0.5 rounded-full
            absolute -top-2 -right-2 shadow-sm
          `}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
