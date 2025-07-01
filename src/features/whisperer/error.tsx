import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface Props {
  error: string;
  loading: boolean;
}

export const Error: FC<Props> = ({ error, loading }) => {
  return (
    <AnimatePresence>
      {error && !loading && (
        <motion.div
          className="w-full max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Error</h2>
          <p className="text-white/80 mb-6">{error}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
