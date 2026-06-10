"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean | null>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("trace_initial_load");
    if (hasLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFirstLoad(false);
      setIsVisible(false);
      if (onComplete) onComplete();
    } else {
       
      setIsFirstLoad(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("trace_initial_load", "true");
        // We call onComplete when the exit animation finishes
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  // Don't render anything until we know if it's the first load to avoid hydration mismatch
  if (isFirstLoad === null) return null;
  if (!isFirstLoad && !isVisible) return null;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#111111]"
        >
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter text-white">TRACE</h1>
            
            {/* Thin progress indicator */}
            <div className="absolute -bottom-8 w-48 h-[1px] bg-white/10 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
