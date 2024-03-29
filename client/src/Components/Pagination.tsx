interface Props {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Pagination = (props: Props) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pages.push(i);
  }

  let backArrowDisable = false;
  let nextArrowDisable = false;

  if (props.currentPage == 1) {
    backArrowDisable = true;
  } else {
    backArrowDisable = false;
  }

  if (props.currentPage == pages.length) {
    nextArrowDisable = true;
  } else {
    nextArrowDisable = false;
  }

  return (
    <div className="mt-10 flex flex-wrap justify-center">
      <button
        disabled={backArrowDisable}
        onClick={() => props.setCurrentPage(props.currentPage - 1)}
        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            key={index}
            onClick={() => props.setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={nextArrowDisable}
        onClick={() => props.setCurrentPage(props.currentPage + 1)}
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-2.5 h-2.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
