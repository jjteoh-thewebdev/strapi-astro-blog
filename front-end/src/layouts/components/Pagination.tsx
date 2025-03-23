interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => {};
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  return (
    <nav
      className="mb-4 flex justify-center space-x-2 text-center"
      aria-label="Pagination"
    >
      {/* prev page */}
      {hasPrevPage ? (
        <a
          onClick={() => onPageChange(currentPage - 1)}
          className="border border-primary hover:bg-primary hover:text-white rounded-md h-10 w-10 leading-[36px] font-semibold text-dark flex items-center justify-center transition duration-200"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      ) : (
        <span className="border border-gray-400 opacity-40 rounded-md h-10 w-10 leading-[36px] font-semibold text-dark flex items-center justify-center pointer-events-none">
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      )}

      {/* page numbers */}
      {pageNumbers.map((pagination) =>
        pagination === currentPage ? (
          <span
            aria-current="page"
            className={`border border-primary bg-primary rounded-md h-10 w-10 leading-[35px] font-semibold text-white`}
          >
            {pagination}
          </span>
        ) : (
          <a
            onClick={() => onPageChange(pagination)}
            aria-current="page"
            className={`border border-primary hover:bg-primary hover:text-white rounded-md h-10 w-10 leading-[36px] font-semibold text-dark flex items-center justify-center transition duration-200`}
          >
            {pagination}
          </a>
        ),
      )}

      {/* next page */}
      {hasNextPage ? (
        <a
          onClick={() => onPageChange(currentPage + 1)}
          className="border border-primary hover:bg-primary hover:text-white rounded-md h-10 w-10 leading-[36px] font-semibold text-dark flex items-center justify-center transition duration-200"
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      ) : (
        <span className="border border-gray-400 opacity-40 rounded-md h-10 w-10 leading-[36px] font-semibold text-dark flex items-center justify-center pointer-events-none">
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      )}
    </nav>
  );
};

export default Pagination;
