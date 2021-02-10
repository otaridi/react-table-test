import React, { useState, useRef } from "react";
import { IoMdCopy } from "react-icons/io";
import { BsCheck } from "react-icons/bs";

const ClipBoard = ({ children }) => {
  const [copy, setCopy] = useState(false);
  const liRef = useRef(null);

  const copyToClipBoard = async (content) => {
    setCopy(true);
    await navigator.clipboard.writeText(content);
    // const copy = await navigator.clipboard.readText();
    setTimeout(() => setCopy(false), 300);
  };

  return (
    <div
      ref={liRef}
      className="clipboard"
      onClick={() => copyToClipBoard(liRef.current.innerText)}
    >
      {children}
      {!copy ? (
        <IoMdCopy
          onClick={() => copyToClipBoard(liRef.current.innerText)}
          className="copy-icon"
          title="copy to clipboard"
        />
      ) : (
        <BsCheck />
      )}
    </div>
  );
};

export default ClipBoard;
