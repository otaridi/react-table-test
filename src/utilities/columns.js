import { format } from "date-fns";

export const COLUMNS = [
  { Header: "Id", accessor: "id", disableFilters: true },
  { Header: "First name", accessor: "firstName" },
  { Header: "Last name", accessor: "lastName" },
  {
    Header: "Date of birth",
    accessor: "dateOfBirth",
    Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
  },
  { Header: "Country", accessor: "country" },
  { Header: "Phone", accessor: "phone" },
];
