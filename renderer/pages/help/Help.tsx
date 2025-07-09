import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Text,
} from "@fluentui/react-components";
import { InfoRegular, PrintRegular } from "@fluentui/react-icons";
import { useGridHeight } from "@hooks/useGridHeight";
import { useLocationContext } from "@hooks/useLocationContext";
import { Layout } from "@layout/Layout";
import type { HelpItem, HelpSection } from "@/types/pages/help";

function Help() {
  useGridHeight();
  const { title: pageTitle } = useLocationContext();

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

  const handlePrint = () => {
    const confirmPrint = window.confirm(
      "This will print the current help documentation. Make sure your printer is ready. Do you want to continue?",
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

  const renderRelatedArticles = (
    relatedArticles?: { title: string; link: string }[],
  ) => {
    if (!relatedArticles || relatedArticles.length === 0) {
      return null;
    }

    return (
      <div className="help-related-links">
        <Text weight="semibold" size={200}>
          Related Articles:
        </Text>
        <ul>
          {relatedArticles.map((article) => (
            <li key={article.link}>
              <button
                type="button"
                onClick={() => handleExternalLink(article.link)}
                className="help-link help-link-button"
              >
                {article.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSectionMetaInfo = (section: HelpSection) => (
    <div className="help-meta-info">
      <span
        className={`help-difficulty help-difficulty-${section.difficulty.toLowerCase()}`}
      >
        {section.difficulty.charAt(0).toUpperCase() +
          section.difficulty.slice(1)}
      </span>
      {section.tags.map((tag: string) => (
        <span key={tag} className="help-tag">
          {tag}
        </span>
      ))}
    </div>
  );

  const renderSection = (
    section: HelpSection,
    sectionIndex: number,
    itemId: string,
  ) => (
    <AccordionItem
      key={`${itemId}-${section.question}`}
      value={`${itemId}-${sectionIndex}`}
    >
      <AccordionHeader>{section.question}</AccordionHeader>
      <AccordionPanel>
        <Text>{section.answer}</Text>
        {renderSectionMetaInfo(section)}
        {renderRelatedArticles(section.relatedArticles)}
      </AccordionPanel>
    </AccordionItem>
  );

  const renderHelpAccordionItem = (item: HelpItem) => (
    <div key={item.id}>
      <Accordion collapsible multiple>
        <AccordionItem value={item.id}>
          <AccordionHeader>
            <Text weight="semibold">{item.title}</Text>
          </AccordionHeader>
          <AccordionPanel>
            <Accordion collapsible multiple>
              {item.sections.map((section, sectionIndex) =>
                renderSection(section, sectionIndex, item.id),
              )}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );

  // Combine all help items into a single array
  const allHelpItems: HelpItem[] = [
    {
      id: "getting-started",
      title: "Getting Started with Electron",
      icon: <InfoRegular />,
      sections: [
        {
          question: "What is Electron and how does it work?",
          answer:
            "Electron is a framework that allows you to build cross-platform desktop applications using web technologies like HTML, CSS, and JavaScript. It combines the Chromium rendering engine and the Node.js runtime, enabling you to create native desktop apps with web technologies. Your app runs in a main process that controls application lifecycle and creates renderer processes to display the UI.",
          difficulty: "Basic",
          lastUpdated: "2024-04-01",
          tags: ["Electron", "Framework", "Desktop"],
          relatedArticles: [
            {
              title: "Electron Architecture Overview",
              link: "https://www.electronjs.org/docs/latest/tutorial/process-model",
            },
          ],
        },
        {
          question:
            "What are the system requirements for Electron applications?",
          answer:
            "Electron applications support Windows 10+, macOS 10.15+, and Linux distributions. The runtime requires Node.js compatibility and Chromium browser engine. Minimum system requirements include 4GB RAM, 1GB free disk space, and a graphics card supporting hardware acceleration. Your app will inherit these requirements plus any additional dependencies you include.",
          difficulty: "Basic",
          lastUpdated: "2024-04-01",
          tags: ["System Requirements", "Compatibility"],
          relatedArticles: [
            {
              title: "Platform Support and Requirements",
              link: "https://www.electronjs.org/docs/latest/development/build-instructions-gn",
            },
          ],
        },
        {
          question: "How do I set up a new Electron project?",
          answer:
            "Start by installing Node.js and npm. Create a new directory and run 'npm init' to create package.json. Install Electron as a dev dependency with 'npm install electron --save-dev'. Create your main process file (main.js) and HTML file (index.html). Add a start script to package.json pointing to your main file. Use tools like Electron Forge or create-electron-app for quick setup.",
          difficulty: "Basic",
          lastUpdated: "2024-04-01",
          tags: ["Setup", "Project Creation", "npm"],
          relatedArticles: [
            {
              title: "Project Setup Guide",
              link: "https://www.electronjs.org/docs/latest/tutorial/quick-start",
            },
          ],
        },
      ],
    },
    {
      id: "main-process",
      title: "Main Process",
      icon: <InfoRegular />,
      sections: [
        {
          question: "What is the main process in Electron?",
          answer:
            "The main process is the entry point of your Electron application. It runs in a Node.js environment and is responsible for creating renderer processes, managing application lifecycle, and handling system-level operations. The main process creates BrowserWindow instances to display your app's UI and manages inter-process communication (IPC) with renderer processes.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Main Process", "Architecture"],
          relatedArticles: [
            {
              title: "Main Process Deep Dive",
              link: "https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process",
            },
          ],
        },
        {
          question: "How do I manage application lifecycle events?",
          answer:
            "Use the 'app' module to handle lifecycle events. Key events include 'ready' (app is ready to create windows), 'window-all-closed' (all windows closed), 'before-quit' (before app quits), and 'activate' (app activated on macOS). Handle these events to control when your app starts, when it should quit, and how it behaves when minimized or restored.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Lifecycle", "Events", "App Module"],
          relatedArticles: [
            {
              title: "Application Lifecycle Management",
              link: "https://www.electronjs.org/docs/latest/api/app",
            },
          ],
        },
        {
          question: "How do I create and manage BrowserWindow instances?",
          answer:
            "Create BrowserWindow instances in the main process after the 'ready' event. Configure window properties like width, height, webPreferences, and frame options. Use loadFile() or loadURL() to load content. Manage multiple windows by storing references and handling window events like 'closed', 'minimize', and 'maximize'. Set webSecurity and contextIsolation for security.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["BrowserWindow", "Window Management"],
          relatedArticles: [
            {
              title: "BrowserWindow Configuration",
              link: "https://www.electronjs.org/docs/latest/api/browser-window",
            },
          ],
        },
      ],
    },
    {
      id: "renderer-process",
      title: "Renderer Process",
      icon: <InfoRegular />,
      sections: [
        {
          question:
            "What is a renderer process and how does it differ from the main process?",
          answer:
            "Renderer processes display the user interface using Chromium's rendering engine. Each BrowserWindow runs in a separate renderer process with its own JavaScript context. Unlike the main process, renderer processes run in a browser-like environment with limited Node.js access for security. They communicate with the main process through IPC mechanisms.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Renderer Process", "Security", "UI"],
          relatedArticles: [
            {
              title: "Understanding Renderer Processes",
              link: "https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process",
            },
          ],
        },
        {
          question: "How do I use Node.js APIs in the renderer process?",
          answer:
            "By default, Node.js is disabled in renderer processes for security. Enable it by setting 'nodeIntegration: true' in webPreferences, but this is discouraged. Instead, use context isolation with preload scripts to expose specific APIs safely. Create a preload script that uses contextBridge to expose selected Node.js functionality to the renderer.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Node.js", "Security", "Context Isolation"],
          relatedArticles: [
            {
              title: "Secure Node.js Integration",
              link: "https://www.electronjs.org/docs/latest/tutorial/context-isolation",
            },
          ],
        },
        {
          question: "What are preload scripts and how do I use them?",
          answer:
            "Preload scripts run before the web page loads and have access to both Node.js APIs and the DOM. They're specified in webPreferences when creating a BrowserWindow. Use preload scripts with contextBridge to securely expose APIs to the renderer. This is the recommended way to give renderer processes access to system functionality while maintaining security.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Preload Scripts", "Context Bridge", "Security"],
          relatedArticles: [
            {
              title: "Preload Scripts Guide",
              link: "https://www.electronjs.org/docs/latest/tutorial/tutorial-preload",
            },
          ],
        },
      ],
    },
    {
      id: "ipc-communication",
      title: "Inter-Process Communication (IPC)",
      icon: <InfoRegular />,
      sections: [
        {
          question: "How does IPC work in Electron?",
          answer:
            "IPC (Inter-Process Communication) allows communication between main and renderer processes. Use ipcMain in the main process to handle messages and ipcRenderer in renderer processes to send messages. The communication can be synchronous or asynchronous. Modern Electron recommends using invoke/handle pattern for request-response communication and send/on for one-way messages.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["IPC", "Communication", "Processes"],
          relatedArticles: [
            {
              title: "IPC Communication Patterns",
              link: "https://www.electronjs.org/docs/latest/tutorial/ipc",
            },
          ],
        },
        {
          question:
            "What's the difference between invoke/handle and send/on patterns?",
          answer:
            "The invoke/handle pattern is for request-response communication where the renderer expects a return value. Use ipcRenderer.invoke() in renderer and ipcMain.handle() in main process. The send/on pattern is for one-way communication. Use ipcRenderer.send() and ipcMain.on(). Invoke/handle is preferred for modern Electron apps as it's more predictable and supports promises.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["IPC Patterns", "Async Communication"],
          relatedArticles: [
            {
              title: "IPC Patterns Best Practices",
              link: "https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way",
            },
          ],
        },
        {
          question: "How do I securely implement IPC with context isolation?",
          answer:
            "With context isolation enabled, use contextBridge in preload scripts to expose IPC methods safely. Create an API object in the preload script that wraps ipcRenderer calls, then expose it via contextBridge.exposeInMainWorld(). This prevents the renderer from directly accessing Node.js APIs while allowing controlled communication with the main process.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Security", "Context Bridge", "IPC"],
          relatedArticles: [
            {
              title: "Secure IPC Implementation",
              link: "https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-contextbridge",
            },
          ],
        },
      ],
    },
    {
      id: "native-apis",
      title: "Native APIs and System Integration",
      icon: <InfoRegular />,
      sections: [
        {
          question: "How do I access native system APIs in Electron?",
          answer:
            "Electron provides many native APIs through built-in modules like dialog, shell, clipboard, and nativeTheme. These APIs are available in the main process and can be accessed in renderer processes through IPC or preload scripts. For additional native functionality, you can use Node.js native modules or create custom native addons using node-gyp or N-API.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Native APIs", "System Integration"],
          relatedArticles: [
            {
              title: "Native API Reference",
              link: "https://www.electronjs.org/docs/latest/api/app",
            },
          ],
        },
        {
          question: "How do I create system notifications and dialogs?",
          answer:
            "Use the 'dialog' module to show native file dialogs, message boxes, and error dialogs. For notifications, use the 'Notification' class or HTML5 Notification API. The dialog module provides methods like showOpenDialog, showSaveDialog, and showMessageBox. Notifications can be configured with icons, sounds, and actions, and they integrate with the system's notification center.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Dialogs", "Notifications", "UI"],
          relatedArticles: [
            {
              title: "System Dialogs and Notifications",
              link: "https://www.electronjs.org/docs/latest/api/dialog",
            },
          ],
        },
        {
          question: "How do I integrate with the system tray and dock?",
          answer:
            "Use the 'Tray' class to create system tray icons with context menus and click handlers. For macOS dock integration, use app.dock methods to set badges, bounce the icon, or show progress. You can create custom tray icons, handle tray events, and build context menus with separators, checkboxes, and submenus. Handle platform differences for consistent behavior.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["System Tray", "Dock", "Platform Integration"],
          relatedArticles: [
            {
              title: "Tray and Dock Integration",
              link: "https://www.electronjs.org/docs/latest/api/tray",
            },
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Security Best Practices",
      icon: <InfoRegular />,
      sections: [
        {
          question:
            "What are the essential security practices for Electron apps?",
          answer:
            "Enable context isolation and disable node integration in renderer processes. Use preload scripts with contextBridge for secure API exposure. Validate all IPC input and sanitize user data. Keep Electron updated, use content security policy (CSP), and avoid loading remote content when possible. Never disable web security in production and carefully audit third-party dependencies.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Security", "Best Practices", "Context Isolation"],
          relatedArticles: [
            {
              title: "Electron Security Checklist",
              link: "https://www.electronjs.org/docs/latest/tutorial/security",
            },
          ],
        },
        {
          question: "How do I handle remote content safely?",
          answer:
            "When loading remote content, disable node integration and enable context isolation. Use a strong Content Security Policy (CSP) to prevent XSS attacks. Validate and sanitize all URLs before loading. Consider using a sandboxed renderer for untrusted content. Implement proper error handling and never trust remote code. Use HTTPS for all remote connections.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Remote Content", "CSP", "XSS Protection"],
          relatedArticles: [
            {
              title: "Safe Remote Content Loading",
              link: "https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content",
            },
          ],
        },
        {
          question: "What is context isolation and why is it important?",
          answer:
            "Context isolation creates a separate JavaScript context for the main world (your app) and isolated world (Electron's built-in scripts). This prevents web content from accessing or modifying Electron's internal APIs and protects against code injection attacks. Enable it with 'contextIsolation: true' in webPreferences and use contextBridge to expose APIs safely.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Context Isolation", "Security", "JavaScript Context"],
          relatedArticles: [
            {
              title: "Understanding Context Isolation",
              link: "https://www.electronjs.org/docs/latest/tutorial/context-isolation",
            },
          ],
        },
      ],
    },
    {
      id: "building-distribution",
      title: "Building and Distribution",
      icon: <InfoRegular />,
      sections: [
        {
          question:
            "How do I build and package my Electron app for distribution?",
          answer:
            "Use tools like Electron Builder, Electron Forge, or electron-packager to build distributable packages. These tools handle platform-specific packaging, code signing, and installer creation. Configure build options in package.json or dedicated config files. Electron Builder supports auto-updater integration, multiple package formats (DMG, NSIS, AppImage), and cross-platform builds.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Building", "Packaging", "Distribution"],
          relatedArticles: [
            {
              title: "Build and Distribution Guide",
              link: "https://www.electronjs.org/docs/latest/tutorial/application-distribution",
            },
          ],
        },
        {
          question: "How do I implement auto-updates in my Electron app?",
          answer:
            "Use the autoUpdater module for automatic updates. Implement update checking, downloading, and installation logic. Configure update servers (like GitHub Releases or custom servers) and handle update events like 'update-available', 'update-downloaded', and 'error'. Ensure proper code signing for security. Test update scenarios thoroughly before deployment.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Auto Updates", "Distribution", "Deployment"],
          relatedArticles: [
            {
              title: "Auto-Update Implementation",
              link: "https://www.electronjs.org/docs/latest/api/auto-updater",
            },
          ],
        },
        {
          question:
            "What are the code signing requirements for different platforms?",
          answer:
            "For macOS, you need an Apple Developer ID certificate for distribution outside the App Store, or a Mac App Store certificate for App Store distribution. Windows requires an Authenticode certificate for avoiding security warnings. Linux doesn't require code signing but benefits from GPG signing for package managers. Configure signing in your build tool and ensure certificates are properly installed.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Code Signing", "Certificates", "Platform Security"],
          relatedArticles: [
            {
              title: "Code Signing Guide",
              link: "https://www.electronjs.org/docs/latest/tutorial/code-signing",
            },
          ],
        },
      ],
    },
    {
      id: "debugging-testing",
      title: "Debugging and Testing",
      icon: <InfoRegular />,
      sections: [
        {
          question: "How do I debug Electron applications?",
          answer:
            "Use Chrome DevTools for renderer process debugging by opening DevTools in BrowserWindow or using --inspect flag. For main process debugging, use VS Code debugger or Node.js inspector with --inspect-brk flag. Enable logging with console methods and use electron-log for file logging. Spectron or Playwright can be used for end-to-end testing of Electron apps.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Debugging", "DevTools", "Testing"],
          relatedArticles: [
            {
              title: "Debugging Electron Apps",
              link: "https://www.electronjs.org/docs/latest/tutorial/application-debugging",
            },
          ],
        },
        {
          question:
            "What testing strategies work best for Electron applications?",
          answer:
            "Implement unit tests for business logic using frameworks like Jest or Mocha. For integration testing, test IPC communication between processes. Use Spectron (deprecated) or Playwright for end-to-end testing of the complete application. Mock system APIs for testing without side effects. Test platform-specific features on target operating systems.",
          difficulty: "Intermediate",
          lastUpdated: "2024-04-01",
          tags: ["Testing", "Unit Tests", "E2E Testing"],
          relatedArticles: [
            {
              title: "Testing Strategies",
              link: "https://www.electronjs.org/docs/latest/tutorial/using-selenium-and-webdriver",
            },
          ],
        },
        {
          question:
            "How do I handle performance optimization in Electron apps?",
          answer:
            "Optimize renderer performance using standard web optimization techniques: minimize bundle size, use lazy loading, and optimize images. For main process, avoid blocking operations and use worker threads for CPU-intensive tasks. Monitor memory usage and clean up event listeners. Use performance profiling tools and consider preload optimizations for faster startup times.",
          difficulty: "Advanced",
          lastUpdated: "2024-04-01",
          tags: ["Performance", "Optimization", "Memory Management"],
          relatedArticles: [
            {
              title: "Performance Optimization",
              link: "https://www.electronjs.org/docs/latest/tutorial/performance",
            },
          ],
        },
      ],
    },
  ];

  return (
    <Layout title={pageTitle} headerContent={renderHeaderButtons()}>
      <div className="full-height-childs">
        {allHelpItems.map((item) => renderHelpAccordionItem(item))}
      </div>
    </Layout>
  );
}

export default Help;
