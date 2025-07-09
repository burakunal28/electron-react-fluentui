import {
  NavDrawer,
  NavDrawerBody,
  NavItem,
  Text,
} from "@fluentui/react-components";
import { useLocationContext } from "@hooks/useLocationContext";
import { routes } from "@routes/routes";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocationContext();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const isSelected = (path: string) => pathname === path;

  const handleExternalLink = async (url: string) => {
    try {
      await (
        window.electron as typeof window.electron & {
          openExternal: (url: string) => Promise<void>;
        }
      )?.openExternal(url);
    } catch (error) {
      console.error("Failed to open external link:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-root">
        {/* Necessary for Fluent UI Nav Drawer */}
        <NavDrawer
          selectedValue={pathname}
          open={true}
          type="inline"
          className="nav-drawer"
        >
          <NavDrawerBody>
            {routes.map((route) => (
              <NavItem
                key={route.path}
                icon={route.icon}
                value={route.path}
                onClick={() => handleClick(route.path)}
                className={`nav-item ${isSelected(route.path) ? "nav-item-selected" : ""}`}
              >
                {route.title}
              </NavItem>
            ))}
          </NavDrawerBody>
        </NavDrawer>
      </div>

      <div className="sidebar-footer">
        <div className="developer-info">
          <Text className="sidebar-text-small">Developed by</Text>
          <button
            type="button"
            onClick={() => handleExternalLink("https://github.com/burakunal28")}
            className="sidebar-author-link"
          >
            Burak Ünal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
