import { useTab } from "@context/tabs/TabContext";
import { Button } from "@fluentui/react-components";
import { WarningFilled, WarningRegular } from "@fluentui/react-icons";
import { useHover } from "@hooks/useHover";
import { useLocationContext } from "@hooks/useLocationContext";
import { useRouteTabs } from "@hooks/useRouteTabs";
import { routes } from "@routes/routes";
import type { FC } from "react";
import React from "react";
import { ReportDialog } from "@/components/dialog/report/ReportDialog";
import type { ReportButtonProps } from "@/types/components/report";

export const ReportButton: FC<ReportButtonProps> = ({ className, onClick }) => {
  const { pathname } = useLocationContext();
  const { isHovered, hoverProps } = useHover("report");
  const { selectedTab } = useTab();
  const { tabKeys, tabLabels } = useRouteTabs();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const getPageInfo = () => {
    const currentRoute = routes.find((route) =>
      pathname.startsWith(route.path),
    );
    if (!currentRoute) return { title: pathname, tabKey: "", tabLabel: "" };

    let tabKey = "";
    let tabLabel = "";
    if (selectedTab) {
      tabLabel = selectedTab;
      for (const key of tabKeys) {
        if (tabLabels[key] === selectedTab) {
          tabKey = key;
          break;
        }
      }
    }

    return {
      title: currentRoute.title,
      tabKey,
      tabLabel,
    };
  };

  const { title, tabLabel } = getPageInfo();

  return (
    <>
      <Button
        type="button"
        className={`report-button ${className}`}
        appearance="transparent"
        icon={isHovered ? <WarningFilled /> : <WarningRegular />}
        title="Report a problem"
        onClick={() => {
          setDialogOpen(true);
          if (onClick) onClick();
        }}
        {...hoverProps}
      />
      <ReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        pageTitle={title}
        tabLabel={tabLabel}
      />
    </>
  );
};
