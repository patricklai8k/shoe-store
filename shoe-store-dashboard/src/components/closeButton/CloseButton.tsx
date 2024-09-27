import React from "react";
import closeButton from "../../assets/cross.png";

import "./style.css";

export const CloseButton: React.FC<{onClick: () => void}> = ({onClick}) => {
  return (
    <button className="close-button" onClick={onClick}>
        <img src={closeButton} alt="Close" />
    </button>
  );
};
 