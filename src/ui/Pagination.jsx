import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { useSearchParams } from "react-router";

function Pagination({ count, page }) {
  const PAGE_NO = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(count / PAGE_NO);

  function handlePageDecrement() {
    const prevPage = pageNo === 1 ? pageNo : pageNo - 1;
    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  function handlePageIncrement() {
    const nextPage = pageNo == totalPages ? pageNo : pageNo + 1;
    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  if (totalPages === 1) return null;

  return (
    <div className="flex flex-row justify-between p-3">
      <div>
        Showing {(pageNo - 1) * PAGE_NO + 1} to{" "}
        {pageNo === totalPages ? count : pageNo * PAGE_NO} of {count} {page}
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="flex flex-row items-center gap-0.5 btn btn-accent w-25"
          onClick={handlePageDecrement}
          disabled={pageNo === 1}
        >
          <HiArrowSmallLeft />
          Previous
        </button>
        <button
          className="flex flex-row items-center gap-0.5 btn btn-accent w-25"
          onClick={handlePageIncrement}
          disabled={pageNo === totalPages}
        >
          Next
          <HiArrowSmallRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
