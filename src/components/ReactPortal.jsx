import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const modalRoot = document.getElementById("modal");

export const ReactPortal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(children, elRef.current);
};
