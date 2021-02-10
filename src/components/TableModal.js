import React from "react";
import ImageCarousel from "./Carousel";
import ClipBoard from "./ClipBoard";

const TableModal = ({ row, toggleModal, modalRef }) => {
  return (
    <div className="modal-container" ref={modalRef}>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        <ClipBoard>
          <li>{row.firstName}</li>
        </ClipBoard>
        <ClipBoard>
          <li>{row.lastName}</li>
        </ClipBoard>
        <ClipBoard>
          <li>{row.dateOfBirth}</li>
        </ClipBoard>
        <ClipBoard>
          <li>{row.country}</li>
        </ClipBoard>
        <ClipBoard>
          <li>{row.phone}</li>
        </ClipBoard>
      </ul>
      <div className="carousel-container">
        <ImageCarousel />
      </div>
      <button onClick={() => toggleModal()}>close</button>
    </div>
  );
};

export default TableModal;
