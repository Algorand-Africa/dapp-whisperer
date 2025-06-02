import { Algodv2, Indexer } from "algosdk";
import { useEffect, useState } from "react";
import { AlgorandContext } from "./algorand-context";

export const AlgorandRoot = ({ children }: { children: React.ReactNode }) => {
  const [indexer, setIndexer] = useState<Indexer | null>(null);
  const [algod, setAlgod] = useState<Algodv2 | null>(null);

  useEffect(() => {
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
    setIndexer(indexer);
    setAlgod(algod);
  }, []);

  if (!indexer || !algod) {
    return null;
  }

  return (
    <AlgorandContext.Provider value={{ indexer, algod }}>
      {children}
    </AlgorandContext.Provider>
  );
};
