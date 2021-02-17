import React from "react";

const WarningModal = ({ toggleModal, modalRef, row }) => {
  return (
    <div ref={modalRef}>
      <h1>Are you sure?</h1>
      <div className="warning-buttons">
        <button
          onClick={() => {
            row.toggleRowSelected();
            toggleModal();
          }}
        >
          Yes
        </button>
        <button onClick={() => toggleModal()}>No</button>
      </div>
    </div>
  );
};

export default WarningModal;
