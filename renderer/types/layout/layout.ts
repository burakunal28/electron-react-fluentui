import type { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  title?: string;
  headerContent?: ReactNode;
  disabledTabKeys?: string[];
}
