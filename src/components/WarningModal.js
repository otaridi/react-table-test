import React from "react";

const WarningModal = ({ setWarning, modalRef, row }) => {
  return (
    <div ref={modalRef}>
      <h1>Are you sure?</h1>
      <div className="warning-buttons">
        <button
          onClick={() => {
            row.toggleRowSelected();
            setWarning(false);
          }}
        >
          Yes
        </button>
        <button onClick={() => setWarning(false)}>No</button>
      </div>
    </div>
  );
};

export default WarningModal;
