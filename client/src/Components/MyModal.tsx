interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function MyModal(props: Props) {
  if (!props.visible) return null;
  return (
    <div
      className="fixed inset-0 bg-overlay bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={props.onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${
          props.visible ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Enter your dates
          </h3>
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={props.onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {props.children}
      </div>
    </div>
  );
}

export default MyModal;

/*
<div
      className="fixed inset-0 bg-overlay bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={props.onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${
          props.visible ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <p>My Modal</p>
        <button
          className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-500 hover:text-gray-600"
          onClick={props.onClose}
        >
          X
        </button>
        {props.children}
      </div>
    </div>
*/
