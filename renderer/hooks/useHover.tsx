import { useCallback, useState } from "react";

export const useHover = (id: string) => {
  const [isHovered, setIsHovered] = useState<Record<string, boolean>>({});

  const onMouseEnter = useCallback(() => {
    setIsHovered((prev) => ({ ...prev, [id]: true }));
  }, [id]);

  const onMouseLeave = useCallback(() => {
    setIsHovered((prev) => ({ ...prev, [id]: false }));
  }, [id]);

  return {
    isHovered: isHovered[id] || false,
    hoverProps: {
      onMouseEnter,
      onMouseLeave,
    },
  };
};
