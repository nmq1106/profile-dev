import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

const ToggleBadgeButton = ({
  badgeType,
  badgeText,
  profileLink,
  handleBadgeToggle,
  isSelected = false,
}) => {
  const { state } = useContext(StateContext);

  // Helper function to safely access social link suffix
  const getSocialLinkSuffix = () => {
    return state.socials?.[profileLink]?.linkSuffix || "";
  };

  // Helper function to check if social profile is configured
  const isSocialConfigured = () => {
    const suffix = getSocialLinkSuffix();
    return suffix && suffix.length > 0;
  };

  // Helper function to check if badge is available
  const isBadgeAvailable = () => {
    return isSocialConfigured();
  };

  // Handle checkbox change
  const handleChange = (e) => {
    if (isBadgeAvailable() && handleBadgeToggle) {
      handleBadgeToggle({
        target: {
          name: badgeType,
          value: !isSelected
        }
      });
    }
  };

  // Determine button state and styling
  const isDisabled = !isBadgeAvailable();
  const isActive = isSelected && isBadgeAvailable();

  return (
    <label
      className={`
        relative flex items-center justify-between w-full p-4 
        transition-all duration-300 ease-in-out
        border border-light-200 dark:border-dark-600
        rounded-lg group
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed bg-light-100 dark:bg-dark-700/30"
            : "opacity-100 cursor-pointer bg-white dark:bg-dark-700 hover:shadow-md hover:border-light-300 dark:hover:border-dark-500"
        }
        ${
          isActive
            ? "bg-brand/10 dark:bg-brand/20 border-brand/30 dark:border-brand/40 shadow-sm"
            : ""
        }
      `}
    >
      {/* Hidden checkbox input */}
      <input
        type="checkbox"
        name={badgeType}
        onChange={handleChange}
        className="absolute opacity-0 w-0 h-0"
        checked={isSelected}
        disabled={isDisabled}
        aria-label={`${badgeText} badge - ${isSelected ? 'enabled' : 'disabled'}`}
      />
      
      {/* Content */}
      <div className="flex items-center w-full">
        {/* Checkbox visual indicator */}
        <div
          className={`
            flex-shrink-0 w-5 h-5 border-2 rounded-md mr-3
            transition-all duration-200 ease-in-out
            flex items-center justify-center
            ${
              isDisabled
                ? "border-light-400 dark:border-dark-500 bg-light-200 dark:bg-dark-600"
                : isSelected
                ? "border-brand bg-brand text-white"
                : "border-light-300 dark:border-dark-500 bg-white dark:bg-dark-600 group-hover:border-brand/50"
            }
          `}
        >
          {isSelected && (
            <svg
              className="w-3 h-3"
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
              block text-sm font-medium transition-colors duration-200
              ${
                isDisabled
                  ? "text-dark-400 dark:text-light-500"
                  : isSelected
                  ? "text-brand dark:text-brand-light"
                  : "text-dark-700 dark:text-light-300 group-hover:text-dark-800 dark:group-hover:text-white"
              }
            `}
          >
            {badgeText}
          </span>
          
          {/* Status indicator */}
          <span
            className={`
              block text-xs transition-colors duration-200 mt-1
              ${
                isDisabled
                  ? "text-dark-400 dark:text-light-500"
                  : isSelected
                  ? "text-brand/80 dark:text-brand-light/80"
                  : "text-dark-500 dark:text-light-400"
              }
            `}
          >
            {isDisabled ? (
              <span className="flex items-center">
                <svg
                  className="w-3 h-3 mr-1 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add {profileLink} profile to enable
              </span>
            ) : isSelected ? (
              <span className="flex items-center text-green-600 dark:text-green-400">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Enabled
              </span>
            ) : (
              <span className="text-dark-400 dark:text-light-500">
                Click to enable
              </span>
            )}
          </span>
        </div>

        {/* Badge type indicator */}
        <div
          className={`
            px-2 py-1 rounded text-xs font-medium ml-2
            transition-colors duration-200
            ${
              isDisabled
                ? "bg-light-200 dark:bg-dark-600 text-dark-400 dark:text-light-500"
                : isSelected
                ? "bg-brand/20 dark:bg-brand/30 text-brand dark:text-brand-light"
                : "bg-light-200 dark:bg-dark-600 text-dark-500 dark:text-light-400 group-hover:bg-light-300 dark:group-hover:bg-dark-500"
            }
          `}
        >
          Badge
        </div>
      </div>

      {/* Hover effect overlay */}
      {!isDisabled && (
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-transparent group-hover:from-white/10 group-hover:to-white/5 dark:group-hover:from-dark-400/5 dark:group-hover:to-dark-600/5 transition-all duration-300 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Focus ring for accessibility */}
      <div
        className={`
          absolute inset-0 rounded-lg ring-2 ring-transparent transition-all duration-200
          ${isSelected ? "ring-brand/30" : "group-focus-within:ring-brand/50"}
        `}
        aria-hidden="true"
      />
    </label>
  );
};

export default ToggleBadgeButton;