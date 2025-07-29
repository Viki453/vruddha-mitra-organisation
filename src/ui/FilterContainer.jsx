import Filter from "./Filter";
import Sort from "./Sort";

function FilterContainer({ filterVals, sortVals }) {
  return (
    <div className="flex flex-row gap-4">
      <Sort sortVals={sortVals} />
      <Filter filterVals={filterVals} />
    </div>
  );
}

export default FilterContainer;
