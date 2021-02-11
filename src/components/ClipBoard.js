import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BsCheck } from "react-icons/bs";

const copyToClipBoard = (content, copy) => {
  navigator.clipboard.writeText(content).then(
    () => copy(),
    (err) => console.log(err)
  );
};

const ClipBoard = ({ children, text }) => {
  const [copy, setCopy] = useState(false);

  const clickHandler = () => {
     copyToClipBoard(text, () => setCopy(true))
  }

  return (
    <span
      className="clipboard"
      onClick={clickHandler}
    >
      {children}
      {!copy ? (
        <IoMdCopy
          onClick={clickHandler}
          className="copy-icon"
          title="copy to clipboard"
        />
      ) : (
        <BsCheck className="copy-icon" />
      )}
    </span>
  );
};

export default ClipBoard;
