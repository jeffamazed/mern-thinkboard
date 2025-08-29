import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ setCurrentPage, currentPage, data }) => {
  const totalPages = data?.totalPages || 1;
  const windowSize = 5;
  const startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const endPage = Math.min(totalPages, startPage + windowSize - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  const goToPage = (page) => {
    if (page <= totalPages && page >= 1) {
      setCurrentPage(page);
    }
  };
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-5 justify-center mt-10"
    >
      <button
        type="button"
        aria-label="Go to previous page"
        onClick={() => goToPage(currentPage - 1)}
        className="pagination-btn"
        disabled={currentPage === 1}
      >
        <ArrowLeft className="size-4" />
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={`pagination-btn ${
            page === currentPage ? "border-b-3 border-primary" : ""
          }`}
          onClick={() => setCurrentPage(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="Go to next page"
        onClick={() => goToPage(currentPage + 1)}
        className="pagination-btn"
        disabled={currentPage === totalPages}
      >
        <ArrowRight className="size-4" />
      </button>
    </nav>
  );
};

export default Pagination;
