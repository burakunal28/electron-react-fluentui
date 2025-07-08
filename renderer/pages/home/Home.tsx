import { Button, Link } from "@fluentui/react-components";
import { PrintRegular } from "@fluentui/react-icons";
import { useLocation } from "@hooks/useLocation";
import { Layout } from "@layout/Layout";

function Home() {
  const { title: pageTitle } = useLocation();

  const handlePrint = () => {
    const confirmPrint = window.confirm(
      "This will print the current home page content. Make sure your printer is ready. Do you want to continue?",
    );

    if (confirmPrint) {
      window.print();
    }
  };

  const renderHeaderButtons = () => {
    return (
      <div className="flex-between-auto">
        <Button
          icon={<PrintRegular />}
          onClick={handlePrint}
          type="button"
          aria-label="Print"
        />
      </div>
    );
  };

  return (
    <Layout title={pageTitle} headerContent={renderHeaderButtons()}>
      <div className="full-height-grid">
        <h2>Getting Started</h2>
        <ol>
          <li>Clone the repository.</li>
          <li>
            Run <code>npm install</code>.
          </li>
          <li>
            Start the server with <code>npm start</code>.
          </li>
        </ol>

        <h2>Building the Application</h2>
        <ol>
          <li>Complete the "Getting Started" steps.</li>
          <li>
            Build for your platform:
            <ul>
              <li>
                Windows: <code>npm run build:win</code>
              </li>
              <li>
                macOS: <code>npm run build:mac</code>
              </li>
              <li>
                Linux: <code>npm run build:linux</code>
              </li>
            </ul>
          </li>
          <li>
            Find the built app in the <code>release/</code> directory.
          </li>
        </ol>

        <h2>Project Structure</h2>
        <ul>
          <li>
            <code>src/</code>: Source code for the React app.
          </li>
          <li>
            <code>electron/</code>: Electron main process code.
          </li>
          <li>
            <code>release/</code>: Built Electron app output.
          </li>
        </ul>

        <h2>Configuration Files</h2>
        <ul>
          <li>
            <code>package.json</code>: Project metadata and dependencies.
          </li>
          <li>
            <code>electron-builder.json5</code>: Build configuration for
            platforms.
          </li>
          <li>
            <code>vite.config.ts</code>: Vite config for React and Electron.
          </li>
        </ul>

        <h2>Additional Notes</h2>
        <ul>
          <li>
            Uses <Link href="https://react.fluentui.dev">FluentUI</Link>{" "}
            components.
          </li>
          <li>Theme changes via Electron's nativeTheme.</li>
        </ul>
      </div>
    </Layout>
  );
}

export default Home;
