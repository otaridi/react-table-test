import { format } from "date-fns";

export const COLUMNS = [
  // { Header: "Id", accessor: "id", disableFilters: true },
  {
    Header: "First name",
    accessor: "firstName",
    aggregate: "count",
    Aggregated: ({ value }) =>
      value === 1 ? `${value}  name` : `${value} names`,
  },
  {
    Header: "Last name",
    accessor: "lastName",
    aggregate: "uniqueCount",
    Aggregated: ({ value }) =>
      value === 1 ? `${value}  last name` : `${value} last names`,
  },
  {
    Header: "Date of birth",
    accessor: "dateOfBirth",
    aggregate: "uniqueCount",
    Aggregated: ({ value }) => value,
    Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
  },
  {
    Header: "Country",
    accessor: "country",
    aggregate: "count",
    Aggregated: ({ value }) => `${value} Country`,
  },
  {
    Header: "Phone",
    accessor: "phone",
    aggregate: "count",
    Aggregated: ({ value }) => `${value} phone`,
  },
];
