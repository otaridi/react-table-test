import React, { useMemo, useRef, useState } from "react";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";
import WarningModal from "../WarningModal";
import Checkbox from "../Checkbox";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import TableHead from "./TableHead";

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

import DATA from "../../utilities/data.json";
import { COLUMNS } from "../../utilities/columns";

import TableBody from "./TableBody";
import TableButtons from "./TableButtons";

const GroupedTable = () => {
  const ref = useRef();

  const [showModal, toggleModal] = useModal();

  useOnClickOutside(ref, () => {
    toggleModal();
  });

  const [removeRow, setRemoveRow] = useState(null);

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
    state: { pageIndex },
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
            Cell: ({ row }) => (
              <Checkbox
                {...row.getToggleRowSelectedProps()}
                setRemoveRow={setRemoveRow}
                toggleModal={toggleModal}
                row={row}
              />
            ),
          },
        ];
      });
    }
  );

  const reviewedData = page.filter((el) => !el.isSelected);

  return (
    <div>
      <table {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          reviewedData={reviewedData}
          prepareRow={prepareRow}
        />
      </table>
      <TableButtons
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
      />
      {showModal ? (
        <Modal>
          <WarningModal
            modalRef={ref}
            row={removeRow}
            toggleModal={toggleModal}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default GroupedTable;
