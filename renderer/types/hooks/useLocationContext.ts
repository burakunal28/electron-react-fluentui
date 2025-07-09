import type { LocationContextProps } from "@/types/context/location";

export interface UseLocationContextReturn extends LocationContextProps {
  navigate: (path: string) => void;
}
