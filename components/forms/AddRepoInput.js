import React, { useContext, forwardRef, useState, useEffect } from "react";
import { StateContext } from "../../pages/_app";

const AddRepoInput = forwardRef((props, ref) => {
  const { placeholder, action, type, section, currentValue = "" } = props;
  const { state, dispatch } = useContext(StateContext);
  
  const [inputValue, setInputValue] = useState(currentValue);

  // Update local state when currentValue prop changes
  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  // Helper function to safely get badge value
  const getBadgeValue = () => {
    if (section === "reposCard") {
      const badge = Array.isArray(state.badges) 
        ? state.badges.find(b => b.id === "reposCard")
        : null;
      return badge?.[type] || "";
    }
    return state.badges?.[section]?.[type] || "";
  };

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Dispatch action to update global state
    if (dispatch && action) {
      dispatch({
        type: action,
        payload: { 
          title: type, 
          value: value 
        }
      });
    }
  };

  // Handle blur event to ensure data is saved
  const handleBlur = (e) => {
    const value = e.target.value.trim();
    if (value !== getBadgeValue()) {
      dispatch({
        type: action,
        payload: { 
          title: type, 
          value: value 
        }
      });
    }
  };

  // Handle key press (Enter to save)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const safeValue = inputValue || getBadgeValue();

  return (
    <div className="relative flex-1">
      <input
        type="text"
        name={type}
        className="
          input-field 
          w-full 
          px-3 
          py-2 
          border 
          border-light-300 
          dark:border-dark-600 
          rounded-lg 
          bg-white 
          dark:bg-dark-700 
          text-dark-800 
          dark:text-light-200 
          placeholder-dark-400 
          dark:placeholder-light-500
          text-sm
          transition-all 
          duration-200 
          ease-in-out
          focus:border-brand 
          focus:ring-2 
          focus:ring-brand/20 
          focus:outline-none
          hover:border-light-400 
          dark:hover:border-dark-500
          disabled:opacity-50 
          disabled:cursor-not-allowed
        "
        placeholder={placeholder}
        value={safeValue}
        ref={ref}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        disabled={!dispatch}
        aria-label={`Enter repository name for ${type.replace('repo', 'Repository ')}`}
      />
      
      {/* Character count indicator */}
      {safeValue && (
        <div 
          className="
            absolute 
            top-1 
            right-2 
            px-1 
            py-0.5 
            text-xs 
            text-dark-500 
            dark:text-light-500 
            bg-white/80 
            dark:bg-dark-600/80 
            rounded 
            pointer-events-none
          "
        >
          {safeValue.length}/50
        </div>
      )}
      
      {/* Loading state */}
      {!state.badges && (
        <div 
          className="
            absolute 
            inset-0 
            bg-light-200 
            dark:bg-dark-600 
            rounded-lg 
            animate-pulse
          " 
        />
      )}
      
      {/* Validation indicator */}
      {safeValue && (
        <div 
          className={`
            absolute 
            top-1/2 
            right-8 
            transform 
            -translate-y-1/2 
            w-2 
            h-2 
            rounded-full 
            transition-all 
            duration-200
            ${safeValue.length > 0 && safeValue.length <= 50 
              ? 'bg-green-500' 
              : 'bg-red-500'
            }
          `}
          aria-hidden="true"
        />
      )}
    </div>
  );
});

AddRepoInput.displayName = "AddRepoInput";

export default AddRepoInput;