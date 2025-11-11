import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

const AddRepo = ({ action, repoNumberToAdd }) => {
  const { dispatch } = useContext(StateContext);

  const handleAddRepo = () => {
    dispatch({
      type: action,
      payload: {
        title: repoNumberToAdd,
        value: "",
      },
    });
  };

  return (
    <button
      className="btn-xs btn-gray flex items-center justify-center p-1 rounded hover:bg-gray-300 transition"
      onClick={handleAddRepo}
      aria-label={`Add repository ${repoNumberToAdd}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v12m6-6H6"
        />
      </svg>
    </button>
  );
};

export default AddRepo;
