import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

const DeleteRepo = ({ action, type }) => {
  const { dispatch } = useContext(StateContext);

  const handleDelete = () => {
    dispatch({
      type: action,
      payload: {
        title: type,
        value: null,
      },
    });
  };

  return (
    <button
      className="btn-sm btn-gray px-2.5 py-1 flex items-center justify-center group rounded hover:bg-red-200 transition-transform"
      onClick={handleDelete}
      aria-label={`Delete repository ${type}`}
    >
      <svg
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-150"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default DeleteRepo;
