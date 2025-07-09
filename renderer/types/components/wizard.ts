import type { ReactNode } from "react";

export interface WizardStep {
  id: string;
  title: string;
  content: ReactNode;
  buttons: {
    back: { text: string; disabled: boolean };
    next: { text: string; disabled: boolean; onClick?: () => void };
  };
}

export interface WizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: WizardStep[];
  title?: string;
  onStepChange?: (step: WizardStep) => void;
}

export interface ConnectionWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
