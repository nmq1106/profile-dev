import { useContext } from "react";
import { StateContext } from "../pages/_app";
import { ACTIONS } from "../lib/constants/actions";

export const useBadgeHandlers = () => {
  const { dispatch } = useContext(StateContext);

  const handleBadgeToggle = (e) => {
    // Handle both event objects and manual calls
    const badgeId = e?.target?.name || e?.name || e;
    
    if (!badgeId) {
      console.warn("No badge ID provided for toggle");
      return;
    }

    dispatch({
      type: ACTIONS.TOGGLE_BADGE,
      payload: {
        title: badgeId,
      },
    });
  };

  const handleBadgeElementToggle = (e) => {
    // Handle both event objects and manual calls
    const elementKey = e?.target?.name || e?.currentTarget?.name || e?.name || e;
    
    if (!elementKey) {
      console.warn("No element key provided for toggle");
      return;
    }

    dispatch({
      type: ACTIONS.TOGGLE_GITHUB_STATS,
      payload: {
        keyToHide: elementKey,
      },
    });
  };

  const handleStyleBadge = (e) => {
    // Handle both event objects and manual calls
    const styleKey = e?.target?.name || e?.currentTarget?.name || e?.name || e;
    
    if (!styleKey) {
      console.warn("No style key provided for toggle");
      return;
    }

    dispatch({
      type: ACTIONS.TOGGLE_STYLE_COLOR,
      payload: {
        keyToToggle: styleKey,
      },
    });
  };

  const handleChangeBadgeColor = (e, badgeKeyToHide, color) => {
    // Handle both event objects and manual calls
    const styleKey = e?.target?.name || e?.name;
    const colorHex = color?.hex;
    
    if (!styleKey || !colorHex) {
      console.warn("Missing style key or color for badge styling");
      return;
    }

    if (!badgeKeyToHide) {
      console.warn("No badge key to hide provided");
      return;
    }

    dispatch({
      type: ACTIONS.STYLE_BADGES,
      payload: {
        keyToStyle: styleKey,
        keyToToggle: badgeKeyToHide,
        color: colorHex,
      },
    });
  };

  // New handler for direct badge operations (without events)
  const toggleBadgeDirect = (badgeId) => {
    if (!badgeId) {
      console.warn("No badge ID provided for direct toggle");
      return;
    }

    dispatch({
      type: ACTIONS.TOGGLE_BADGE,
      payload: {
        title: badgeId,
      },
    });
  };

  // New handler for direct element toggling
  const toggleBadgeElementDirect = (elementKey) => {
    if (!elementKey) {
      console.warn("No element key provided for direct toggle");
      return;
    }

    dispatch({
      type: ACTIONS.TOGGLE_GITHUB_STATS,
      payload: {
        keyToHide: elementKey,
      },
    });
  };

  // New handler for direct style toggling
  const toggleStyleDirect = (styleKey) => {
    if (!styleKey) {
      console.warn("No style key provided for direct toggle");
      return;
    }

    dispatch({
      type: ACTIONS.TOGGLE_STYLE_COLOR,
      payload: {
        keyToToggle: styleKey,
      },
    });
  };

  // New handler for direct color changes
  const changeBadgeColorDirect = (styleKey, badgeKeyToHide, colorHex) => {
    if (!styleKey || !colorHex || !badgeKeyToHide) {
      console.warn("Missing parameters for direct color change");
      return;
    }

    dispatch({
      type: ACTIONS.STYLE_BADGES,
      payload: {
        keyToStyle: styleKey,
        keyToToggle: badgeKeyToHide,
        color: colorHex,
      },
    });
  };

  return {
    // Original handlers (backward compatible)
    handleBadgeToggle,
    handleBadgeElementToggle,
    handleStyleBadge,
    handleChangeBadgeColor,
    
    // New direct handlers (more reliable)
    toggleBadgeDirect,
    toggleBadgeElementDirect,
    toggleStyleDirect,
    changeBadgeColorDirect,
    
    // Alias functions for clearer usage
    toggleBadge: handleBadgeToggle,
    toggleBadgeElement: handleBadgeElementToggle,
    toggleStyle: handleStyleBadge,
    changeColor: handleChangeBadgeColor,
  };
};