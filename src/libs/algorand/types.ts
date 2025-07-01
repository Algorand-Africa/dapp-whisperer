import { Algodv2, Indexer } from "algosdk";
import { IApp, IBox, ITransaction } from "./interface";

export abstract class IndexerService {
  indexer: Indexer;

  constructor(indexer: Indexer) {
    this.indexer = indexer;
  }

  abstract getApp(appId: number): Promise<IApp | { error: string }>;

  abstract getAppTransactions(
    appId: number,
    token?: string
  ): Promise<{ nextToken: string; transactions: ITransaction[] }>;

  abstract getAppName(appId: number, creationRound: number): Promise<string>;

  abstract getAppBoxes(appId: number): Promise<IBox[]>;
}

export type AlgorandContextState = {
  indexer: Indexer;
  algod: Algodv2;
  indexerService: IndexerService;
};
