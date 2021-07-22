import React, { ReactElement } from "react";

interface Props {
  id: string;
  open: boolean;
  closeModal: () => any;
  children: any;
  title?: string;
}

export default function Modal({
  id,
  title,
  open = false,
  closeModal,
  children
}: Props): ReactElement {
  return (
    <div id={id} className={`overlay ${open ? "popup-open" : ""}`}>
      <div className="popup">
        {title && <h2>{title}</h2>}
        <a className="close" onClick={() => closeModal()}>
          &times;
        </a>
        <div className="content">
          {React.cloneElement(children, { closeModal: closeModal })}
        </div>
      </div>
    </div>
  );
}
