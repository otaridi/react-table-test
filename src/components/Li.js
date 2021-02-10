import React, { useRef, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { BsCheck } from "react-icons/bs";

const Li = ({ children }) => {
  const [copy, setCopy] = useState(false);
  const liRef = useRef(null);

  const copyToClipBoard = async (content) => {
    await navigator.clipboard.writeText(content);
    const copy = await navigator.clipboard.readText();
    if (copy === content) {
      console.log(copy);
      setCopy(true);
    }
  };

  return (
    <li ref={liRef} className="custom-li">
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
    </li>
  );
};

export default Li;
