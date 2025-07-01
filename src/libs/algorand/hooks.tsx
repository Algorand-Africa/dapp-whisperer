"use client";

import { useContext } from "react";
import { AlgorandContext } from "./algorand-context";

export const useAlgorand = () => {
  const context = useContext(AlgorandContext);

  if (!context) {
    throw new Error("useAlgorand must be used within a AlgorandProvider");
  }

  return context;
};

export const useAlgorandIndexer = () => {
  const { indexer } = useAlgorand();
  return indexer;
};

export const useAlgorandAlgod = () => {
  const { algod } = useAlgorand();
  return algod;
};

export const useAlgorandIndexerService = () => {
  const { indexerService } = useAlgorand();
  return indexerService;
};
