import { Button, Text, Title3 } from "@fluentui/react-components";
import { ErrorCircleRegular } from "@fluentui/react-icons";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private readonly handleReload = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private readonly handleRestart = () => {
    if (window.electron?.quitApp) {
      window.electron.quitApp();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <ErrorCircleRegular className="error-icon" />
            <Title3>Bir hata oluştu</Title3>
            <Text>
              Uygulamada beklenmeyen bir hata meydana geldi. Lütfen sayfayı
              yenilemeyi deneyin.
            </Text>
            {this.state.error && (
              <details className="error-details">
                <summary>Hata Detayları</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo?.componentStack && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
            <div className="error-actions">
              <Button onClick={this.handleReload}>Sayfayı Yenile</Button>
              <Button appearance="secondary" onClick={this.handleRestart}>
                Uygulamayı Yeniden Başlat
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
