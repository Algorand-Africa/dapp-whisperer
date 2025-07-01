export interface IApp {
  id: number;
  creator: string;
  deleted: boolean;
  name: string;
}

export interface IBox {
  name: string;
  value: any;
}

export interface ITransaction {
  id: string;
  type: TxType;
  note: string;
  sender: string;
  fee: number;
  date: string;
}

export type TxType =
  | "pay" // Payment transaction
  | "keyreg" // Key registration transaction
  | "acfg" // Asset configuration transaction
  | "axfer" // Asset transfer transaction
  | "afrz" // Asset freeze transaction
  | "appl" // Application transaction
  | "stpf" // State proof transaction
  | "hb"; // Heartbeat transaction
