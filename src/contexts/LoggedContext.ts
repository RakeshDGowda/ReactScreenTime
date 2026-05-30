import { createContext } from "react";
import type { LoggedContextType } from "../types/types";

const LoggedContext = createContext<LoggedContextType | null>(null);

export default LoggedContext;
