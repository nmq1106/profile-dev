import React, { useContext } from "react";
import { StateContext } from "../../pages/_app";

const StyleBadgeButton = ({
  badgeText,
  handleStyleBadge,
  badgeKeyToStyle,
  badgeKeyToHide,
  colorList,
  badgesShowing,
  handleChangeBadgeColor,
}) => {
  const { state } = useContext(StateContext);

  // Helper function to safely access cardStyle properties
  const getCardStyleProperty = (property) => {
    return state.cardStyle?.[property] || getDefaultValue(property);
  };

  // Helper function to get default values
  const getDefaultValue = (property) => {
    const defaults = {
      titleColor: "0891b2",
      textColor: "ffffff",
      iconColor: "0891b2",
      bgColor: "1c1917",
      titleColorEdit: false,
      textColorEdit: false,
      iconColorEdit: false,
      bgColorEdit: false,
      hideBorder: true,
      showIcons: true,
    };
    return defaults[property] || "";
  };

  // Check if the edit mode is active for this button
  const isEditModeActive = () => {
    return getCardStyleProperty(badgeKeyToHide);
  };

  // Get the current color value for display
  const getCurrentColor = () => {
    return getCardStyleProperty(badgeKeyToStyle);
  };

  return (
    <article className="flex flex-col">
      <button
        onClick={(e) => {
          e.preventDefault();
          if (badgesShowing) {
            handleStyleBadge({
              target: { name: badgeKeyToHide }
            });
          }
        }}
        name={badgeKeyToHide}
        disabled={!badgesShowing}
        className={`btn-sm btn-gray items-start group w-full transition-all duration-300 ${
          !badgesShowing
            ? "hover:cursor-not-allowed opacity-50 pointer-events-none"
            : "hover:shadow-md hover:scale-[1.02]"
        } ${
          isEditModeActive()
            ? "bg-light-200 dark:bg-dark-700 border-brand/50"
            : "bg-light-200/50 dark:bg-dark-700/50"
        } border-2 border-transparent hover:border-light-300 dark:hover:border-dark-600 rounded-lg p-3`}
      >
        <div className="flex items-center w-full group">
          {/* Color Preview */}
          <div
            className={`rounded-md mr-3 w-6 h-6 border border-light-300 dark:border-dark-600 shadow-sm flex items-center justify-center ${
              isEditModeActive() 
                ? "ring-2 ring-brand ring-offset-1" 
                : "group-hover:ring-1 group-hover:ring-light-400"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-sm bg-[#${getCurrentColor()}]`}
            />
          </div>
          
          {/* Text Content */}
          <div className="flex-1 text-left">
            <span
              className={`flex justify-start text-sm font-medium transition-all duration-300 ${
                isEditModeActive()
                  ? "text-dark-800 dark:text-white"
                  : "text-dark-600 group-hover:text-dark-800 dark:text-light-400 dark:group-hover:text-white"
              }`}
            >
              {badgeText}
            </span>
            <span
              className={`text-xs transition-all duration-300 ${
                isEditModeActive()
                  ? "text-brand dark:text-brand-light"
                  : "text-dark-500 group-hover:text-dark-600 dark:text-dark-400 dark:group-hover:text-light-400"
              }`}
            >
              #{getCurrentColor()}
            </span>
          </div>

          {/* Edit Icon */}
          <div
            className={`flex items-center text-xs font-semibold transition-all duration-300 ml-2 ${
              isEditModeActive()
                ? "text-brand dark:text-brand-light opacity-100"
                : "text-dark-500 group-hover:text-dark-700 dark:text-dark-300 dark:group-hover:text-light-300 opacity-70"
            } ${badgesShowing ? "group-hover:opacity-100" : ""}`}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isEditModeActive() ? "text-brand dark:text-brand-light" : ""
              } ${badgesShowing ? "group-hover:scale-110" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={isEditModeActive() ? "2.5" : "2"}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="ml-1 hidden sm:inline">
              {isEditModeActive() ? "Editing" : "Edit"}
            </span>
          </div>
        </div>
      </button>

      {/* Color Picker Panel */}
      <div
        className={`gap-2 border border-t-0 border-light-200 dark:border-dark-600 w-full p-4 transition-all duration-300 ease-in-out rounded-b-lg ${
          isEditModeActive() 
            ? "flex flex-wrap max-h-48 opacity-100 overflow-y-auto" 
            : "max-h-0 opacity-0 overflow-hidden"
        } bg-white/50 dark:bg-dark-700/30 backdrop-blur-sm`}
      >
        {colorList && colorList.length > 0 ? (
          colorList.map((color) => {
            const isSelected = getCurrentColor() === color.hex;
            return (
              <button
                key={color.hex}
                className={`w-8 h-8 border-2 rounded-lg overflow-hidden transition-all duration-200 transform hover:scale-110 hover:shadow-lg ${
                  color.bgColor || `bg-[#${color.hex}]`
                } ${
                  isSelected
                    ? "border-brand ring-2 ring-brand/50 ring-offset-1 scale-110 shadow-md"
                    : "border-light-300 dark:border-dark-600 hover:border-light-400 dark:hover:border-dark-500"
                }`}
                name={badgeKeyToStyle}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (badgesShowing) {
                    handleChangeBadgeColor(e, badgeKeyToHide, color);
                  }
                }}
                title={`Color #${color.hex}${color.name ? ` - ${color.name}` : ''}`}
              >
                {/* Accessibility: Hidden text for screen readers */}
                <span className="sr-only">
                  Select color {color.name || `#${color.hex}`} for {badgeText}
                </span>
              </button>
            );
          })
        ) : (
          <div className="text-center w-full py-2">
            <p className="text-sm text-dark-500 dark:text-light-400">
              No colors available
            </p>
          </div>
        )}
        
        {/* Custom Color Info */}
        <div className="w-full mt-2 pt-2 border-t border-light-200 dark:border-dark-600">
          <p className="text-xs text-dark-500 dark:text-light-400 text-center">
            Click any color to apply
          </p>
        </div>
      </div>

      {/* Loading State */}
      {!state.cardStyle && (
        <div className="animate-pulse flex flex-col p-3 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-light-300 dark:bg-dark-600 rounded-md" />
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-light-300 dark:bg-dark-600 rounded w-3/4" />
              <div className="h-3 bg-light-300 dark:bg-dark-600 rounded w-1/2" />
            </div>
            <div className="w-4 h-4 bg-light-300 dark:bg-dark-600 rounded" />
          </div>
        </div>
      )}
    </article>
  );
};

export default StyleBadgeButton;