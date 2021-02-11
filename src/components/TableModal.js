import React from "react";
import ImageCarousel from "./Carousel";
import ClipBoard from "./ClipBoard";

const TableModal = ({ row, toggleModal, modalRef }) => {
  const { firstName, lastName, dateOfBirth, country, phone } = row;

  return (
    <div className="modal-container" ref={modalRef}>
      <ul style={{ listStyle: "none", textAlign: "left" }}>
        {Object.keys({ firstName, lastName, dateOfBirth, country, phone }).map(
          (el) => {
            return (
              <ClipBoard key={el} text={row[el]}>
                <li>
                  <strong>{el}:</strong>
                  {row[el]}
                </li>
              </ClipBoard>
            );
          }
        )}
      </ul>
      <div className="carousel-container">
        <ImageCarousel />
      </div>
      <button onClick={() => toggleModal()}>close</button>
    </div>
  );
};

export default TableModal;
