import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

const ToggleBadgeElementCheckbox = ({
  badgeType,
  badgeText,
  handleBadgeElementToggle,
  badgeKeyToHide,
  isChecked = false,
}) => {
  const { state } = useContext(StateContext);

  // Helper function to safely access social link suffix
  const getSocialLinkSuffix = () => {
    return state.socials?.github?.linkSuffix || "";
  };

  // Helper function to check if GitHub profile is configured
  const isGitHubConfigured = () => {
    const suffix = getSocialLinkSuffix();
    return suffix && suffix.length > 0;
  };

  // Helper function to check if badge is available
  const isBadgeAvailable = () => {
    return isGitHubConfigured();
  };

  // Handle checkbox change
  const handleChange = (e) => {
    if (isBadgeAvailable() && handleBadgeElementToggle) {
      handleBadgeElementToggle({
        target: {
          name: badgeKeyToHide,
          value: !isChecked
        }
      });
    }
  };

  // Determine button state and styling
  const isDisabled = !isBadgeAvailable();
  const isActive = isChecked && isBadgeAvailable();

  return (
    <label
      className={`
        relative flex items-center justify-between w-full p-3
        transition-all duration-200 ease-in-out
        border border-light-200 dark:border-dark-600
        rounded-md group
        ${
          isDisabled
            ? "opacity-40 cursor-not-allowed bg-light-100 dark:bg-dark-700/30"
            : "opacity-100 cursor-pointer bg-white dark:bg-dark-700 hover:shadow-sm hover:border-light-300 dark:hover:border-dark-500"
        }
        ${
          isActive
            ? "bg-brand/5 dark:bg-brand/10 border-brand/20 dark:border-brand/30"
            : ""
        }
      `}
      title={
        isDisabled 
          ? "Add GitHub profile to enable this option" 
          : `${badgeText} - ${isChecked ? 'Hide' : 'Show'}`
      }
    >
      {/* Hidden checkbox input */}
      <input
        type="checkbox"
        name={badgeKeyToHide}
        onChange={handleChange}
        className="absolute opacity-0 w-0 h-0"
        checked={isChecked}
        disabled={isDisabled}
        aria-label={`${isChecked ? 'Hide' : 'Show'} ${badgeText} in GitHub stats`}
      />
      
      {/* Content */}
      <div className="flex items-center w-full">
        {/* Checkbox visual indicator */}
        <div
          className={`
            flex-shrink-0 w-4 h-4 border rounded-sm mr-3
            transition-all duration-150 ease-in-out
            flex items-center justify-center
            ${
              isDisabled
                ? "border-light-400 dark:border-dark-500 bg-light-200 dark:bg-dark-600"
                : isChecked
                ? "border-brand bg-brand text-white"
                : "border-light-300 dark:border-dark-500 bg-white dark:bg-dark-600 group-hover:border-brand/50"
            }
          `}
        >
          {isChecked && (
            <svg
              className="w-2.5 h-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <span
            className={`
              block text-xs font-medium transition-colors duration-150
              ${
                isDisabled
                  ? "text-dark-400 dark:text-light-500"
                  : isChecked
                  ? "text-dark-700 dark:text-light-200"
                  : "text-dark-600 dark:text-light-400 group-hover:text-dark-700 dark:group-hover:text-light-200"
              }
            `}
          >
            {badgeText}
          </span>
        </div>

        {/* Status indicator */}
        <div
          className={`
            w-2 h-2 rounded-full ml-2 transition-all duration-150
            ${
              isDisabled
                ? "bg-light-400 dark:bg-dark-500"
                : isChecked
                ? "bg-green-500"
                : "bg-light-300 dark:bg-dark-500 group-hover:bg-light-400 dark:group-hover:bg-dark-400"
            }
          `}
          aria-hidden="true"
        />
      </div>

      {/* Hover effect overlay */}
      {!isDisabled && (
        <div
          className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent to-transparent group-hover:from-white/5 group-hover:to-white/2 dark:group-hover:from-dark-400/5 dark:group-hover:to-dark-600/5 transition-all duration-200 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Focus ring for accessibility */}
      <div
        className={`
          absolute inset-0 rounded-md ring-1 ring-transparent transition-all duration-150
          ${isChecked ? "ring-brand/20" : "group-focus-within:ring-brand/30"}
        `}
        aria-hidden="true"
      />

      {/* Loading state */}
      {!state.socials && (
        <div className="absolute inset-0 bg-light-100 dark:bg-dark-700 rounded-md animate-pulse" />
      )}
    </label>
  );
};

export default ToggleBadgeElementCheckbox;