import { Subtitle1 } from "@fluentui/react-components";
import { TabComponent } from "@layout/TabComponent";
import type { LayoutProps } from "@/types/layout/layout";

/**
 * Page layout component
 * Automatically gets tab information from routes.tsx and renders it
 */
export const Layout = ({
  children,
  title,
  headerContent,
  disabledTabKeys,
}: LayoutProps) => {
  return (
    <div className="page-layout">
      {(title || headerContent) && (
        <div className="page-header">
          {title && <Subtitle1>{title}</Subtitle1>}
          {headerContent}
        </div>
      )}
      <div className="page-content">
        {/* Automatically gets tab information from routes and renders it if available */}
        <TabComponent disabledTabKeys={disabledTabKeys} />
        {children}
      </div>
    </div>
  );
};
