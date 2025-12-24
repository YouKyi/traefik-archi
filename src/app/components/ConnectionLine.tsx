interface ConnectionLineProps {
  label: string;
  type: 'public' | 'internal' | 'auth' | 'restricted';
}

const typeStyles = {
  public: {
    color: 'bg-red-500',
    textColor: 'text-red-700'
  },
  internal: {
    color: 'bg-blue-500',
    textColor: 'text-blue-700'
  },
  auth: {
    color: 'bg-gray-500',
    textColor: 'text-gray-700'
  },
  restricted: {
    color: 'bg-green-500',
    textColor: 'text-green-700'
  }
};

export function ConnectionLine({ label, type }: ConnectionLineProps) {
  const styles = typeStyles[type];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-1 ${styles.color} rounded-full`}></div>
      <span className={`${styles.textColor}`}>{label}</span>
    </div>
  );
}
