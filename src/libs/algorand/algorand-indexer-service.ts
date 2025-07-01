import { Indexer } from "algosdk";
import { convertUint8ArrayToString, decodeUint8Array } from "./formatter";
import { IBox, TxType } from "./interface";
import { IndexerService } from "./types";

export class AlgorandIndexerService extends IndexerService {
  constructor(indexer: Indexer) {
    super(indexer);

    this.indexer = indexer;
  }

  async getApp(appId: number) {
    try {
      const result = await this.indexer.lookupApplications(appId).do();

      const { application } = result;

      if (application === undefined) return { error: "Application not found" };

      const name = await this.getAppName(
        Number(application.id),
        Number(application.createdAtRound)
      );

      return {
        id: Number(application.id),
        creator: application.params?.creator?.toString() || "",
        deleted: Boolean(application.deleted),
        name,
      };
    } catch (error: unknown) {
      return { error: (error as Error).message };
    }
  }

  async getAppTransactions(appId: number, token?: string) {
    const response = await this.indexer
      .searchForTransactions()
      .applicationID(appId)
      .nextToken(token ?? "")
      .do();

    return {
      nextToken: response.nextToken ?? "",
      transactions: response.transactions.map((transaction) => ({
        id: transaction.id ?? "",
        type: transaction.txType as TxType,
        note: convertUint8ArrayToString(transaction.note as Uint8Array),
        sender: transaction.sender ?? "",
        fee: Number(transaction.fee),
        date: new Date(Number(transaction.roundTime) * 1000).toISOString(),
      })),
    };
  }

  async getAppName(appId: number, creationRound: number) {
    const creationTransaction = await this.indexer
      .searchForTransactions()
      .applicationID(appId)
      .round(creationRound)
      .do();

    if (creationTransaction.transactions[0].note === undefined) return "";

    const note = convertUint8ArrayToString(
      creationTransaction.transactions[0].note!
    );

    const metadataString = note?.split(":j")?.[1];

    if (metadataString === undefined) return "";

    const metadata = JSON.parse(metadataString);

    return metadata.name;
  }

  async getAppBoxes(appId: number) {
    const boxNames: Uint8Array<ArrayBufferLike>[] = [];

    const getBoxNames = async (token = "") => {
      const result = await this.indexer
        .searchForApplicationBoxes(appId)
        .nextToken(token)
        .do();

      if (result.boxes.length > 0) {
        boxNames.push(...result.boxes.map((box) => box.name));
      }

      if (result.nextToken) {
        await getBoxNames(result.nextToken);
      }
    };

    await getBoxNames();

    const boxes: IBox[] = [];

    for (const boxName of boxNames) {
      const result = await this.indexer
        .lookupApplicationBoxByIDandName(appId, boxName)
        .do();

      // console.log("box", result);

      boxes.push({
        name: String(decodeUint8Array(result.name)),
        value: decodeUint8Array(result.value),
      });
    }

    return boxes;
  }
}
