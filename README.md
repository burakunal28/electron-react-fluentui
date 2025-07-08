# Electron React FluentUI Boilerplate

A modern boilerplate for building Electron applications with React and Fluent UI, featuring user settings and theme management.

## Preview

![Preview](screenshot.png)

## Getting Started 🛠️

1. Clone the repository.
2. Install dependencies: `bun install`
3. Start the development server: `bun start`

## Building the Application

1. Complete the "Getting Started" steps.
2. Build for your platform:
   - Windows: `bun run build`
   - Multi-platform support via `electron-builder` configuration
3. Find the built application in the `release/` directory.

## Project Structure

```
├── renderer/              # React application source code
│   ├── components/        # UI components
│   │   ├── breadcrumb/    # Breadcrumb navigation
│   │   ├── dialog/        # Modal dialog components
│   │   ├── footer/        # Footer component
│   │   ├── navbar/        # Top navigation bar
│   │   ├── report/        # Report components
│   │   └── sidebar/       # Sidebar component
│   ├── context/           # React Context providers
│   │   ├── grid/          # Grid state management
│   │   ├── location/      # Location state
│   │   ├── tabs/          # Tab management
│   │   └── theme/         # Theme management
│   ├── hooks/             # Custom React hooks
│   ├── layout/            # Layout components
│   ├── pages/             # Page components
│   │   ├── help/          # Help page
│   │   └── home/          # Home page
│   ├── routes/            # React Router configuration
│   └── types/             # TypeScript type definitions
├── electron/              # Electron main process code
│   ├── main.ts            # Main Electron process
│   ├── preload.ts         # Preload script
│   └── types/             # Electron type definitions
├── dist-electron/         # Compiled Electron files
└── release/               # Packaged application output
```

## Available Bun Scripts

- `bun start`: Start development server
- `bun run build`: Build and package the application
- `bun run lint`: Code analysis with Biome
- `bun run format`: Code formatting with Biome
- `bun run check`: Comprehensive check with Biome
- `bun run preview`: Preview the built application

## Configuration Files

- `package.json`: Project metadata and dependencies
- `electron-builder.json5`: Build configuration for platforms
- `vite.config.ts`: Vite configuration (React + Electron)
- `biome.json`: Biome linter and formatter configuration
- `tsconfig.json`: TypeScript configuration (renderer)
- `tsconfig-electron.json`: TypeScript configuration (electron)
- `tsconfig.node.json`: Node.js TypeScript configuration

## Technology Stack

### Core Technologies
- **Electron**: Desktop application framework
- **React 19**: UI library (latest version)
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **FluentUI**: Microsoft's modern UI component library

### Development Tools
- **Biome**: Fast linter and formatter (ESLint + Prettier alternative)
- **Electron Builder**: Application packaging and distribution
- **Sass**: CSS preprocessor
- **React Router DOM**: Client-side routing

### Key Dependencies
- `@fluentui/react-components`: FluentUI components
- `@fluentui/react-icons`: FluentUI icons  
- `react-router-dom`: Routing management

## Features

- **Modern UI**: Windows 11-style interface with FluentUI components
- **Theme Management**: Automatic/manual theme switching via Electron nativeTheme API
- **TypeScript**: Full type safety
- **Hot Reload**: Instant reloading during development
- **Context API**: Global state management (Grid, Location, Tabs, Theme)
- **Custom Hooks**: Reusable React hooks
- **Responsive Layout**: Adaptive sidebar and navbar
- **Routing**: Page navigation with React Router
- **Code Quality**: Automatic code formatting and linting with Biome

## Development Notes

- FluentUI components are compatible with Microsoft's design system
- Electron's `nativeTheme` API automatically detects system theme
- Very fast development experience thanks to Vite
- Biome offers a much faster alternative to ESLint and Prettier

## Environment Variables

The following environment variables can be configured in the `.env` file:

- `ENABLE_DEVTOOLS`: Enable development tools (`true`/`false`) (default: true)
- `LOG_LEVEL`: Log level (`error`, `warn`, `info`) (default: error)  
- `NODE_ENV`: Environment (`development`, `production`)

## License

This project is open source and available under the [MIT License](LICENSE).

## Developer

Created by [Burak Ünal](https://github.com/burakunal28).

---

**Note**: This boilerplate uses the latest technologies for developing modern Electron applications. Optimized with the latest versions like React 19, Vite 7, and Electron 37.
