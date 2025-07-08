import { Breadcrumb } from "@components/breadcrumb/Breadcrumb";
import { ReportButton } from "@components/report/ReportButton";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="page-footer">
      <div className="flex-between-full">
        <Breadcrumb />
        <ReportButton />
      </div>
    </div>
  );
};
