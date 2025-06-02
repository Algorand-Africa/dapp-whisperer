import { Algodv2, Indexer } from "algosdk";

export type AlgorandContextState = {
  indexer: Indexer;
  algod: Algodv2;
};
