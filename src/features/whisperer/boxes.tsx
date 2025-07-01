"use client";

import { IBox } from "@/libs/algorand/interface";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
  boxes: IBox[];
}

export const Boxes: FC<Props> = ({ boxes }) => {
  if (!boxes || boxes.length === 0) return null;

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-4">📦 Box Storage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {boxes.map((box, index) => (
          <motion.div
            key={index}
            className="bg-white/5 p-4 rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <p className="font-bold mb-2 truncate" title={box.name}>
              Name: <span className="font-normal">{box.name || "[empty]"}</span>
            </p>

            <div className="text-white/80 text-sm bg-black/20 rounded-md p-3 mt-2 overflow-auto font-mono max-h-40">
              {box.value === null || box.value === undefined ? (
                <span className="italic">[empty]</span>
              ) : (
                <code className="whitespace-pre-wrap">
                  {typeof box.value === "object"
                    ? JSON.stringify(box.value, null, 2)
                    : box.value}
                </code>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
