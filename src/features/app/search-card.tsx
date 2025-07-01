"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type Props = {
  onSubmit: (appId: string) => void;
  loading: boolean;
  showResults: boolean;
};

export const SearchCard: FC<Props> = ({ onSubmit, loading, showResults }) => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("application-id") || "";
  const [appId, setAppId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (applicationId && !isNaN(Number(applicationId))) {
      setAppId(applicationId);
      onSubmit(applicationId);
    }
  }, [applicationId]);

  return (
    <motion.div
      layout
      className={`w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center shadow-xl transition-all duration-500 ${
        showResults ? "mt-0" : "mt-32"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Explore a Smart Contract
      </h1>
      <p className="text-white/80 mb-6">
        Paste an Algorand Smart Contract ID below to view details.
      </p>

      <form
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!appId) return;

          const url = new URL(window.location.href);
          url.searchParams.set("application-id", appId);
          router.push(url.toString());
        }}
      >
        <input
          placeholder="Smart Contract ID"
          value={appId}
          onChange={(e) => {
            if (!!e.target.value && isNaN(Number(e.target.value))) return;

            setAppId(e.target.value);
          }}
          disabled={loading}
          className="w-full sm:w-auto flex-1 px-4 py-3 rounded-full outline-none text-purple-700 bg-white placeholder-purple-300 focus:ring-4 focus:ring-purple-300 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 bg-white text-purple-600 rounded-full font-semibold transition-all duration-200 transform ${
            loading
              ? "cursor-not-allowed opacity-60"
              : "hover:bg-purple-100 hover:scale-105"
          }`}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
    </motion.div>
  );
};
