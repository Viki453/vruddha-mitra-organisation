import { useState } from "react";
import { useSearchParams } from "react-router";

function Sort({ sortVals }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vSort, setVSort] = useState("Oldest First");
  function handleSortSelect() {
    searchParams.set("sort-by", event.target.value);
    setVSort(event.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  console.log(sortVals);
  return (
    <div>
      Sort By
      <select
        defaultValue="Oldest First"
        className="select select-accent"
        value={vSort}
        onChange={handleSortSelect}
      >
        {sortVals.map((val) => (
          <option>{val}</option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
