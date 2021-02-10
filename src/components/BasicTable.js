import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
  useColumnOrder,
} from "react-table";
import DATA from ".././utilities/data.json";
import { COLUMNS } from "../utilities/columns";
import "./table.css";
import GlobalFilter from "./GlobalFIlter";
import Checkbox from "./Checkbox";
import TableModal from "./TableModal";

const BasicTable = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

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
    setPageSize,
    state: { globalFilter, pageIndex, pageSize, selectedRowIds },
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // useEffect(() => {
  //   window.addEventListener("click", (e) => {
  //     console.log(e.target);
  //   });
  //   if (showModal) {
  //     window.addEventListener("click", toggleModal);
  //   } else {
  //     window.removeEventListener("click", toggleModal);
  //   }
  //   return () => window.removeEventListener("click", toggleModal);
  // }, [showModal]);

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => {
                  setRow(row.original);
                  toggleModal();
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
              <select
                value={pageSize}
                onChange={(e) => setPageSize(+e.target.value)}
              >
                {[10, 25, 50].map((size) => (
                  <option key={size} value={size}>
                    show {size}
                  </option>
                ))}
              </select>
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

        <pre>
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
        </pre>
      </div>
      {showModal ? (
        <Modal toggleModal={toggleModal}>
          <TableModal row={row} toggleModal={toggleModal} />
        </Modal>
      ) : null}
    </div>
  );
};

export default BasicTable;
