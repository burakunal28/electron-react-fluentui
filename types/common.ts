// Common utility types used across the application

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Partial<T> = { [P in keyof T]?: T[P] };

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Common props patterns
export interface BaseProps {
  className?: string;
  id?: string;
}

export interface BaseComponentProps extends BaseProps {
  children?: React.ReactNode;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading states
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Electron IPC types
export interface IPCResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Theme related types
export type ColorScheme = "light" | "dark" | "system";
export type ThemeMode = "user" | "admin";

// Navigation types
export interface NavigationState {
  currentPath: string;
  previousPath: string | null;
}
