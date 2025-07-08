import { useTab } from "@context/tabs/TabContext";
import {
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Button,
  Breadcrumb as FluentBreadcrumb,
} from "@fluentui/react-components";
import { Home16Filled, Home16Regular } from "@fluentui/react-icons";
import { useHover } from "@hooks/useHover";
import { useLocation } from "@hooks/useLocation";
import { routes } from "@routes/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { BreadcrumbItemType } from "@/types/components/breadcrumb";

export const Breadcrumb: React.FC = () => {
  const navigate = useNavigate();
  const { isHovered, hoverProps } = useHover("footer-home");
  const { pathname, title } = useLocation() as {
    pathname: string;
    title: string;
  };
  const { selectedTab, setSelectedTab } = useTab();

  const currentRoute = routes.find((route) => route.path === pathname);
  const defaultTab = currentRoute?.tabs
    ? Object.keys(currentRoute.tabs)[0]
    : undefined;
  const defaultTabLabel = defaultTab
    ? currentRoute?.tabs?.[defaultTab].label
    : undefined;

  const breadcrumbItems: BreadcrumbItemType[] = [];

  if (pathname === "/home") {
    breadcrumbItems.push({
      key: "home",
      path: "/home",
      text: title,
      isHome: true,
      current: true,
    });
  } else {
    breadcrumbItems.push({
      key: "home",
      path: "/home",
      isHome: true,
      current: false,
    });

    breadcrumbItems.push({
      key: pathname.slice(1),
      path: pathname,
      text: title,
      isHome: false,
      current: !selectedTab,
      defaultTab: defaultTabLabel,
    });

    if (selectedTab) {
      breadcrumbItems.push({
        key: `${pathname.slice(1)}-${selectedTab}`,
        path: pathname,
        text: selectedTab,
        isHome: false,
        tab: selectedTab,
        current: true,
      });
    }
  }

  const handleBreadcrumbClick = (path: string, defaultTab?: string) => {
    if (path === pathname && defaultTab) {
      setSelectedTab(defaultTab);
    } else {
      navigate(path);
    }
  };

  const getHomeIcon = (item: BreadcrumbItemType) => {
    if (!item.isHome) return undefined;
    return isHovered || pathname === "/home" ? (
      <Home16Filled />
    ) : (
      <Home16Regular />
    );
  };

  const renderBreadcrumbContent = (item: BreadcrumbItemType) => {
    if (item.isHome) {
      return (
        <Button
          type="button"
          onClick={() => handleBreadcrumbClick(item.path)}
          icon={getHomeIcon(item)}
          appearance="transparent"
          className="footer-home-button"
          size="small"
          {...hoverProps}
        />
      );
    }

    return (
      <BreadcrumbButton
        className="footer-breadcrumb-button"
        current={item.current}
        onClick={() => handleBreadcrumbClick(item.path, item.defaultTab)}
      >
        {item.text}
      </BreadcrumbButton>
    );
  };

  return (
    <div className="footer-breadcrumb-container">
      <FluentBreadcrumb aria-label="Sitemap">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.key}>
            <BreadcrumbItem>{renderBreadcrumbContent(item)}</BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbDivider />}
          </React.Fragment>
        ))}
      </FluentBreadcrumb>
    </div>
  );
};
