import React, { useState } from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const submit = (e) => {
    e.preventDefault();
    setFilter(value || undefined);
    console.log(value);
  };
  return (
    <div className="search-container">
      <form onSubmit={submit}>
        <input
          type="search"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default GlobalFilter;
