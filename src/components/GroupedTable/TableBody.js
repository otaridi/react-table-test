import React, { useRef, useState } from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundForward } from "react-icons/io";
import useModal from "../../hooks/useModal";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Modal from "../Modal";
import TableModal from "../TableModal";

const TableBody = ({ getTableBodyProps, reviewedData, prepareRow }) => {
  const ref = useRef();
  const [showModal, toggleModal] = useModal();
  const [row, setRow] = useState([]);

  useOnClickOutside(ref, () => {
    toggleModal();
  });

  return (
    <>
      <tbody {...getTableBodyProps()}>
        {reviewedData.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    onClick={() => {
                      if (cell.value && row.original) {
                        setRow(row.original);
                        toggleModal();
                      }
                    }}
                    {...cell.getCellProps()}
                    style={{
                      background: cell.isGrouped
                        ? "#d4ffe3"
                        : cell.isAggregated
                        ? "#e1eafc"
                        : cell.isPlaceholder
                        ? "#ffece8"
                        : "white",
                    }}
                  >
                    {cell.isGrouped ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <span {...row.getToggleRowExpandedProps()}>
                          {row.isExpanded ? (
                            <IoIosArrowRoundDown />
                          ) : (
                            <IoIosArrowRoundForward />
                          )}
                          {cell.render("Cell")}
                        </span>{" "}
                        ({row.subRows.length})
                      </>
                    ) : cell.isAggregated ? (
                      // If the cell is aggregated, use the Aggregated
                      // renderer for cell
                      cell.render("Aggregated")
                    ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                      // Otherwise, just render the regular cell
                      cell.render("Cell")
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      {showModal ? (
        <Modal>
          <TableModal row={row} modalRef={ref} toggleModal={toggleModal} />
        </Modal>
      ) : null}
    </>
  );
};

export default TableBody;
