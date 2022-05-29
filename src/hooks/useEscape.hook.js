import { useEffect } from "react";

export const useEscape = (setShowModal) => {
  const closeOnEscape = (e) => {
    if (e.code === "Escape") {
      setShowModal((s) => s && !s);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscape);

    return () => document.body.removeEventListener("keydown", closeOnEscape);
  });
};
