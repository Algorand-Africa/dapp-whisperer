import { ABIType, ABIValue } from "algosdk";
import { TxType } from "./interface";

export function convertUint8ArrayToString(uint8Array: Uint8Array): string {
  const valueWithLength = new TextDecoder().decode(uint8Array);
  const lengthPrefix = valueWithLength.charCodeAt(1);
  const value: string = valueWithLength.slice(2, 2 + lengthPrefix);
  return value;
}

export function convertBase64ToString(base64: string): string {
  return Buffer.from(base64, "base64").toString("utf-8");
}

export function decodeUint8Array(uint8Array: Uint8Array): ABIValue | null {
  // TODO: add more types
  const scalarTypes: string[] = [
    "string",
    "bytes",
    "bool",
    "address",
    "tuple",
    "int8",
    "int16",
    "int32",
    "int64",
    "int128",
    "int256",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "uint128",
    "uint256",
  ];

  const candidates = new Set<string>();

  // 1. Add scalar types
  scalarTypes.forEach((type) => candidates.add(type));

  // 2. Add arrays and tuples
  for (const base of ["uint8", "uint64", "bool", "address"]) {
    candidates.add(`${base}[2]`);
    candidates.add(`${base}[]`);
  }

  // 3. Add sample tuples (TODO: add more)
  const tuples = [
    "(string,string)",
    "(string,string,string)",
    "(string,string,string,string)",
    "(string,string,string,string,string)",
    "(string,string,string,string,string,string)",
    "(string,string,string,string,string,string,string)",
    "(string,string,string,string,string,string,string,string)",
    "(string,string,string,string,string,string,string,string,string)",
    "(string,string,string,string,string,string,string,string,string,string)",
    "(uint64,address)",
    "(bool,uint8[2])",
    "(string,uint64)",
    "(address,uint64[])",
    "((uint64,bool),address)",
  ];
  tuples.forEach((t) => candidates.add(t));

  // 4. Try decoding each
  for (const type of candidates) {
    try {
      const abiType = ABIType.from(type);
      const value = abiType.decode(uint8Array);
      if (value !== undefined) {
        return value;
      }
    } catch {
      continue;
    }
  }

  // 5. Fallback to UTF-8 text
  try {
    const text = new TextDecoder().decode(uint8Array);
    // const text = readStringUntilNull(uint8Array);
    if (text.trim()) {
      return removeUnrecognizedCharacters(text);
    }
  } catch {}

  return null;
}

// function readStringUntilNull(bytes: Uint8Array): string {
//   const end = bytes.findIndex((b) => b === 0);
//   return String.fromCharCode(...(end >= 0 ? bytes.slice(0, end) : bytes));
// }

function removeUnrecognizedCharacters(string: string): string {
  return string.replace(/[^a-zA-Z0-9 ]/g, "");
}

export function formatTxType(type: TxType): string {
  switch (type) {
    case "pay":
      return "Payment";
    case "keyreg":
      return "Key Registration";
    case "acfg":
      return "Asset Configuration";
    case "axfer":
      return "Asset Transfer";
    case "afrz":
      return "Asset Freeze";
    case "appl":
      return "Application Call";
    case "stpf":
      return "State Proof";
    case "hb":
      return "Heartbeat";
    default:
      return type;
  }
}
