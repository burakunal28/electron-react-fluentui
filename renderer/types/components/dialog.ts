import type { ReactNode } from "react";

type ValveAction = "open" | "close";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleBarContent?: ReactNode;
  modalType?: "alert" | "non-modal";
}

export interface ValveConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  valveName: string;
  action: ValveAction;
  onConfirm: () => void;
}

export interface LampConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lampName: string;
  onConfirm: () => void;
  type: "on" | "off";
}
