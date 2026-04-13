import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  isVisible: boolean;
}

export const ScrollIndicator = ({ isVisible }: ScrollIndicatorProps) => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-cyan-400 pixel-heading">
          Scroll to Begin
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-cyan-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
