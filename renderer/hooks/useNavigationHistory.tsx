import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigationHistory = () => {
  const [pageHistory, setPageHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== pageHistory[currentIndex]) {
      setPageHistory((prev) => [
        ...prev.slice(0, currentIndex + 1),
        location.pathname,
      ]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [location, currentIndex, pageHistory]);

  const goBack = () => {
    if (currentIndex > 0) {
      navigate(pageHistory[currentIndex - 1]);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < pageHistory.length - 1) {
      navigate(pageHistory[currentIndex + 1]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return { currentIndex, pageHistory, goBack, goForward };
};
