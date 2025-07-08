import { useTab } from "@context/tabs/TabContext";
import { Button } from "@fluentui/react-components";
import { WarningFilled, WarningRegular } from "@fluentui/react-icons";
import { useHover } from "@hooks/useHover";
import { useLocation } from "@hooks/useLocation";
import { useRouteTabs } from "@hooks/useRouteTabs";
import { routes } from "@routes/routes";
import React from "react";
import { ReportDialog } from "@/components/dialog/report/ReportDialog";

export const ReportButton = () => {
  const { pathname } = useLocation();
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
        className="report-button"
        appearance="transparent"
        icon={isHovered ? <WarningFilled /> : <WarningRegular />}
        title="Report a problem"
        onClick={() => setDialogOpen(true)}
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
