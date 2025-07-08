import type { ReactNode } from "react";
import type { ConnectionStatus } from "@/types/components/sidebar";

export interface ChangeSessionResult {
  success?: boolean;
}

export interface ConnectionContextType {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
  checkConnection: () => Promise<void>;
}

export interface ConnectionProviderProps {
  children: ReactNode;
}
