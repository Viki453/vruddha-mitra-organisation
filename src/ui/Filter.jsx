import { useState } from "react";
import { useSearchParams } from "react-router";
import capitalize from "../helpers/capitalize";

function Filter({ filterVals }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vFilter, setVFilter] = useState("All");
  function handleFilterSelect() {
    setVFilter(event.target.value);
    searchParams.set("filter", event.target.value.toLowerCase());
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div>
      Filter By
      <select
        defaultValue="All"
        className="select select-accent"
        value={vFilter}
        onChange={handleFilterSelect}
      >
        <option>All</option>
        {filterVals.map((e) => (
          <option key={e}>{capitalize(e)}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
