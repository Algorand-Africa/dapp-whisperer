"use client";

import { formatTxType } from "@/libs/algorand/formatter";
import { useAlgorandIndexerService } from "@/libs/algorand/hooks";
import { ITransaction } from "@/libs/algorand/interface";
import { microalgosToAlgos } from "algosdk";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

interface Props {
  appId: number;
}

export const Transactions: FC<Props> = ({ appId }) => {
  const indexerService = useAlgorandIndexerService();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [prevTokens, setPrevTokens] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPageToken, setCurrentPageToken] = useState<string | null>(
    "page-one"
  );

  const fetchTransactions = async (
    token?: string,
    direction: "next" | "prev" = "next"
  ) => {
    setLoading(true);
    try {
      const res = await indexerService.getAppTransactions(
        appId,
        token === "page-one" ? "" : token
      );
      const { transactions: newTxns, nextToken: newToken } = res;

      // Track token history
      if (direction === "next" && currentPageToken) {
        setPrevTokens((prev) => [...prev, currentPageToken]);
      } else if (direction === "prev") {
        setPrevTokens((prev) => prev.slice(0, -1)); // back one step
      }

      setTransactions(newTxns);
      setNextToken(newToken ?? null);
      setCurrentPageToken(token ?? null);
    } catch (err) {
      console.error("Transaction fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Reset when appId changes
    setTransactions([]);
    setNextToken(null);
    setPrevTokens([]);
    setCurrentPageToken(null);
    fetchTransactions(undefined);
  }, [appId]);

  const renderLoadingSkeletons = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        className="p-4 rounded-xl border border-white/10 bg-white/5 animate-pulse space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        <div className="h-4 w-1/2 bg-white/30 rounded"></div>
        <div className="h-4 w-3/4 bg-white/30 rounded"></div>
        <div className="h-4 w-1/3 bg-white/30 rounded"></div>
        <div className="h-4 w-2/3 bg-white/30 rounded"></div>
      </motion.div>
    ));
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Transactions</h2>

      {transactions.length === 0 && !loading && (
        <p className="text-white/80 text-center">Nothing to see here.</p>
      )}

      {transactions.length === 0 && loading && (
        <div className="space-y-4">{renderLoadingSkeletons()}</div>
      )}

      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm sm:text-base space-y-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-semibold text-purple-200">
                🧾 Type: {formatTxType(tx.type)}
              </span>
              <span className="text-white/70">
                {microalgosToAlgos(tx.fee)} Algos
              </span>
            </div>
            <div className="text-white/90 break-all">
              📤 <span className="font-semibold">Sender:</span> {tx.sender}
            </div>
            <div className="text-white/70">
              🕒{" "}
              <span className="font-semibold">
                {new Date(tx.date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            {tx.note && (
              <div className="mt-2">
                📝 <span className="font-bold">Note:</span>{" "}
                <code className="bg-black/30 px-2 py-0.5 rounded text-white/90 whitespace-pre-wrap break-all">
                  {tx.note}
                </code>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={() =>
            fetchTransactions(prevTokens[prevTokens.length - 1], "prev")
          }
          disabled={loading || prevTokens.length === 0}
          className="w-full sm:w-auto px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition hover:scale-105 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => fetchTransactions(nextToken ?? undefined, "next")}
          disabled={loading || !nextToken}
          className="w-full sm:w-auto px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </motion.div>
  );
};
