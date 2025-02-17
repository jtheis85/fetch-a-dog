import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
}

const SearchFooter: React.FC<Props> = ({
  currentPage,
  pageCount,
  setCurrentPage,
}) => {
  return pageCount <= 1 ? null : (
    <footer>
      <div className="pagination">
        <button
          disabled={currentPage <= 0}
          className="button-type-pagination"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaChevronLeft />
        </button>
        <button
          disabled={currentPage >= pageCount - 1}
          className="button-type-pagination"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    </footer>
  );
};

export default SearchFooter;
