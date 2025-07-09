import { Button, Subtitle2 } from "@fluentui/react-components";
import {
  DismissRegular,
  SquareRegular,
  SubtractRegular,
  TabsRegular,
} from "@fluentui/react-icons";
import type { FC } from "react";
import { useState } from "react";
import type { NavbarProps } from "@/types/components/navbar";

const Navbar: FC<NavbarProps> = ({ className }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    window.electron?.ipcRenderer.invoke("minimize-window");
  };

  const handleMaximize = () => {
    window.electron?.toggleMaximizeWindow();
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    window.electron?.quitApp();
  };

  return (
    <div className={`navbar ${className}`}>
      <div className="navbar-logo-container">
        <Subtitle2 className="navbar-logo-text">
          Electron-React-FluentUI Boilerplate
        </Subtitle2>
      </div>

      <div className="navbar-buttons">
        <Button
          className="navbar-minimize-button"
          aria-label="Minimize"
          icon={<SubtractRegular />}
          onClick={handleMinimize}
        />
        <Button
          className="navbar-maximize-button"
          aria-label={isMaximized ? "Restore" : "Maximize"}
          icon={
            isMaximized ? (
              <SquareRegular />
            ) : (
              <TabsRegular className="navbar-icon-flipped" />
            )
          }
          onClick={handleMaximize}
        />
        <Button
          className="navbar-close-button"
          aria-label="Close"
          icon={<DismissRegular />}
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default Navbar;
