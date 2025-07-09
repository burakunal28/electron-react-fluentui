export interface ReportButtonProps {
  className?: string;
  onClick?: () => void;
}

export interface ReportData {
  pageTitle: string;
  tabLabel?: string;
  timestamp: string;
  userAgent: string;
  pathname: string;
}

export interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageTitle: string;
  tabLabel?: string;
}
