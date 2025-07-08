import type { FC, ReactElement } from "react";

export interface Route {
  path: string;
  title: string;
  icon: ReactElement;
  filledIcon: ReactElement;
  component: FC;
  tabs?: Record<
    string,
    { label: string; info?: { title: string; content: string } }
  >;
}
