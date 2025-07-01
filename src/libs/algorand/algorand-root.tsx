"use client";

import { Algodv2, Indexer } from "algosdk";
import { AlgorandContext } from "./algorand-context";
import { AlgorandIndexerService } from "./algorand-indexer-service";

const indexer = new Indexer(
  process.env.NEXT_PUBLIC_INDEXER_TOKEN!,
  process.env.NEXT_PUBLIC_INDEXER_SERVER!,
  process.env.NEXT_PUBLIC_INDEXER_PORT!
);

const algod = new Algodv2(
  process.env.NEXT_PUBLIC_ALGOD_TOKEN!,
  process.env.NEXT_PUBLIC_ALGOD_SERVER!,
  process.env.NEXT_PUBLIC_ALGOD_PORT!
);

export const AlgorandRoot = ({ children }: { children: React.ReactNode }) => {
  const indexerService = new AlgorandIndexerService(indexer);

  return (
    <AlgorandContext.Provider value={{ indexer, algod, indexerService }}>
      {children}
    </AlgorandContext.Provider>
  );
};
