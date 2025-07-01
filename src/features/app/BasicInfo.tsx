import { IApp } from "@/libs/algorand/interface";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface Props {
  app: IApp | null;
  loading: boolean;
}

export const BasicInfo: FC<Props> = ({ app, loading }) => {
  return (
    <AnimatePresence>
      {app && !loading && (
        <motion.div
          className="w-full max-w-4xl mx-auto mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Smart Contract Info</h2>
          <div className="space-y-2">
            <p>
              <span className="font-bold">App ID:</span> {app?.id}
            </p>
            <p>
              <span className="font-bold">Name:</span> {app?.name}
            </p>
            <p>
              <span className="font-bold">Creator Address:</span> {app?.creator}
            </p>
            <p>
              <span className="font-bold">Status:</span>{" "}
              {app?.deleted ? "Deleted" : "Active"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
