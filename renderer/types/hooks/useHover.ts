export interface UseHoverReturn {
  isHovered: boolean;
  hoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

export interface UseHoverOptions {
  initialState?: boolean;
  delay?: number;
}
