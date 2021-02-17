import React, { useMemo, useRef, useState } from "react";
import "./table.css";
import Modal from "./Modal";
import TableModal from "./TableModal";
import Checkbox from "./Checkbox";
import useOnClickOutside from "./useOnClickOutside";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
  useColumnOrder,
  useGroupBy,
  useExpanded,
} from "react-table";

import DATA from ".././utilities/data.json";
import { COLUMNS } from "../utilities/columns";
// import GlobalFilter from "./GlobalFIlter";

import { IoIosArrowRoundDown, IoIosArrowRoundForward } from "react-icons/io";


const GroupedTable = () => {
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useOnClickOutside(ref, () => setShowModal(false));

  const [row, setRow] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    // setPageSize,
    // eslint-disable-next-line no-unused-vars
    state: { globalFilter, pageIndex, pageSize },
    // selectedFlatRows,
  } = useTable(
    {
      initialState: { groupBy: ["country"], pageSize: 40 },
      columns,
      data,
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
          {
            id: "selection",
            // Header: ({ getToggleAllPageRowsSelectedProps }) => (
            //   <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            // ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
        ];
      });
    }
  );

  const reviewedData = page.filter((el) => !el.isSelected);

  return (
    <div>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
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
      </table>
      <div>
        <div className="buttons">
          <section>
            <span>
              page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
          </section>
          <section>
            <span>
              | Go to page{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value ? +e.target.value - 1 : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
              {/* <select
                value={pageSize}
                onChange={(e) => setPageSize(+e.target.value)}
              >
                {[25, 50].map((size) => (
                  <option key={size} value={size}>
                    show {size}
                  </option>
                ))}
              </select> */}
            </span>
          </section>
          <section>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </section>
        </div>

        {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds,
                selectedFlatRows: selectedFlatRows.map((d) => d.original),
              },
              null,
              2
            )}
          </code>
        </pre> */}
      </div>
      {showModal ? (
        <Modal>
          <TableModal row={row} modalRef={ref} toggleModal={toggleModal} />
        </Modal>
      ) : null}
    </div>
  );
};

export default GroupedTable;
