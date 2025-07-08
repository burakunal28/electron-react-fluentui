import { Button, Text } from "@fluentui/react-components";
import { version as appVersion } from "@root/package.json";
import type React from "react";
import { Dialog } from "@/components/dialog/Dialog";

export interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageTitle: string;
  tabLabel?: string;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
  open,
  onOpenChange,
  pageTitle,
  tabLabel,
}) => {
  const handleMail = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    let emailBody = `App Version: ${appVersion}\nPage: ${pageTitle}`;
    if (tabLabel) {
      emailBody += `\nTab: ${tabLabel}`;
    }
    emailBody += "\n\n*This email was automatically generated";
    window.location.href = `mailto:example@example.com.tr?subject=Bug Report&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Report a Problem"
      actions={
        <>
          <Button
            appearance="secondary"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button appearance="primary" type="button" onClick={handleMail}>
            Send
          </Button>
        </>
      }
    >
      <Text>
        App Version: <strong>{appVersion}</strong>
      </Text>
      <Text>
        Current Page: <strong>{pageTitle}</strong>
      </Text>
      {tabLabel && (
        <Text>
          Current Tab: <strong>{tabLabel}</strong>
        </Text>
      )}
    </Dialog>
  );
};
