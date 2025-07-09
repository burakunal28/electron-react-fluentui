export interface UseGridHeightReturn {
  height: number;
  ref: React.RefObject<HTMLElement>;
}

export interface UseGridHeightOptions {
  offset?: number;
  minHeight?: number;
  maxHeight?: number;
}
