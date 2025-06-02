import { createContext } from "react";
import { AlgorandContextState } from "./types";

export const AlgorandContext = createContext<AlgorandContextState | null>(null);
