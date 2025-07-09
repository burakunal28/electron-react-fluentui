import { useCallback, useEffect, useState } from "react";

export const useHover = (id: string) => {
  const [isHovered, setIsHovered] = useState<Record<string, boolean>>({});

  const onMouseEnter = useCallback(() => {
    setIsHovered((prev) => ({ ...prev, [id]: true }));
  }, [id]);

  const onMouseLeave = useCallback(() => {
    setIsHovered((prev) => ({ ...prev, [id]: false }));
  }, [id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsHovered((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    };
  }, [id]);

  return {
    isHovered: isHovered[id] || false,
    hoverProps: {
      onMouseEnter,
      onMouseLeave,
    },
  };
};
