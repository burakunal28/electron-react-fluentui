import {
  Button,
  DialogActions,
  DialogSurface,
  DialogTitle,
  Dialog as FluentDialog,
  Subtitle1,
} from "@fluentui/react-components";
import { Dismiss20Regular } from "@fluentui/react-icons";
import type React from "react";
import type { DialogProps } from "@/types/components/dialog";

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  children,
  actions,
  titleBarContent,
  modalType = "alert",
}) => {
  return (
    <FluentDialog
      modalType={modalType}
      open={open}
      onOpenChange={(_event: React.SyntheticEvent, data: { open: boolean }) =>
        onOpenChange(data.open)
      }
    >
      <DialogSurface className="dialog-surface">
        <DialogTitle>
          <div className="dialog-title-bar">
            <Subtitle1>{title}</Subtitle1>
            {titleBarContent ?? (
              <Button
                aria-label="Kapat"
                icon={<Dismiss20Regular />}
                onClick={() => onOpenChange(false)}
                type="button"
              />
            )}
          </div>
        </DialogTitle>
        <div className="dialog-body">{children}</div>
        {actions && (
          <div className="dialog-footer">
            <DialogActions>{actions}</DialogActions>
          </div>
        )}
      </DialogSurface>
    </FluentDialog>
  );
};
