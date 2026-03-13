import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-6">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center"
      >
        <Sparkles className="w-8 h-8 text-primary" />
      </motion.div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl font-medium text-gray-200">Scouting the best tools...</h3>
        <p className="text-gray-500 text-sm animate-pulse">Analyzing your project requirements</p>
      </div>
    </div>
  );
}
