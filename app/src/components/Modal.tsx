import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ children }: { children: ReactNode }) {
  const modalEl = document.createElement("div");
  modalEl.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(21, 26, 48, 0.5);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  `;
  useEffect(() => {
    const modalRoot = document.getElementById("RoninWallet");
    if (modalRoot) {
      modalRoot.appendChild(modalEl);
      return () => {
        modalRoot.removeChild(modalEl);
      };
    }
  }, [modalEl]);
  return ReactDOM.createPortal(children, modalEl);
}
