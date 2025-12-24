import { motion } from 'motion/react';

interface FlowParticleProps {
  color: string;
  delay?: number;
}

export function FlowParticle({ color, delay = 0 }: FlowParticleProps) {
  return (
    <motion.div
      className={`absolute w-3 h-3 rounded-full ${color} shadow-lg`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut"
      }}
    />
  );
}
