import { Breadcrumb } from "@components/breadcrumb/Breadcrumb";
import { ReportButton } from "@components/report/ReportButton";
import type { FC } from "react";
import type { FooterProps } from "@/types/components/footer";

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <div className={`page-footer ${className || ""}`}>
      <div className="flex-between-full">
        <Breadcrumb />
        <ReportButton />
      </div>
    </div>
  );
};
