import React, { createContext, useEffect } from "react";
import "../styles/globals.css";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { ThemeProvider } from "next-themes";
import { useReducerWithMiddleware } from "../hooks";
import storeStateMiddleware from "../middleware/storeStateMiddleware";
import { SKILL_CATEGORIES } from "../lib/constants/skillCategories";
import { ACTIONS } from "../lib/constants/actions";
import { supportStore } from "../lib/constants/supportStore";
import { PROJECT_URL } from "../lib/constants/config";

export const StateContext = createContext(null);

export const STORED_STATE_KEY = "ProfileMe_LocalState";

// State migration function to handle structure changes
function migrateStoredState(storedState, currentInitialState) {
  // Check if stored state has a version
  const storedVersion = storedState._version || "0.0.0";
  const currentVersion = currentInitialState._version;

  // If versions match then just deep merge
  if (storedVersion === currentVersion) {
    return deepMergeStoredState(storedState, currentInitialState);
  }

  // If not, deep merge and update the version
  const migratedState = deepMergeStoredState(storedState, currentInitialState);
  migratedState._version = currentVersion;

  return migratedState;
}

// Deep merge function
function deepMergeStoredState(storedState, currentInitialState) {
  // Store current initial state in migratedState
  const migratedState = { ...currentInitialState };

  // Recursively merge stored state with current initial state
  function deepMerge(target, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (
          source[key] &&
          typeof source[key] === "object" &&
          !Array.isArray(source[key])
        ) {
          // If it's an object (not array), recursively merge
          if (
            !target[key] ||
            typeof target[key] !== "object" ||
            Array.isArray(target[key])
          ) {
            target[key] = {};
          }
          deepMerge(target[key], source[key]);
        } else {
          // For primitives and arrays, use stored value if it exists
          if (source[key] !== undefined) {
            target[key] = source[key];
          }
        }
      }
    }
  }

  deepMerge(migratedState, storedState);
  return migratedState;
}

// Color State
const initialState = {
  // State version for migration tracking
  _version: "1.0.0",
  section: "introduction",
  activeSection: "introduction",
  renderMode: "preview",
  theme: "light",
  // Section order for reordering functionality
  sectionOrder: ["introduction", "skills", "socials", "badges", "support"],
  // Social order for reordering functionality
  socialOrder: [
    "github",
    "gitlab",
    "twitter",
    "threads",
    "hashnode",
    "medium",
    "devdotto",
    "linkedin",
    "polywork",
    "twitch",
    "youtube",
    "behance",
    "codepen",
    "codesandbox",
    "discord",
    "dribbble",
    "facebook",
    "rss",
    "stackoverflow",
  ],
  // Skills order for reordering functionality
  skillsOrder: [],
  // Introduction State
  introduction: {
    name: "",
    animatedHand: 0,
    shortDescription: "",
    longDescription: "",
    location: "",
    portfolioTitle: "",
    portfolioLink: "",
    emailMe: "",
    workingOnTitle: "",
    workingOnLink: "",
    learning: "",
    collaborateOn: "",
    additionalInfo: "",
  },
  // Profile Data State (for compatibility)
  profileData: {
    name: "",
    title: "",
    location: "",
    email: "",
    portfolio: "",
    currentProject: "",
    learning: "",
    collaboration: "",
    funFact: "",
  },
  // Skills State
  skills: Object.fromEntries(
    SKILL_CATEGORIES.map((category) => [category.name, []])
  ),
  // Socials State
  socials: {
    github: {
      label: "GitHub",
      path: `${PROJECT_URL}/icons/socials/github.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/github-dark.svg`,
      linkPrefix: "https://www.github.com/",
      linkSuffix: "",
      url: "",
    },
    gitlab: {
      label: "GitLab",
      path: `${PROJECT_URL}/icons/socials/gitlab.svg`,
      linkPrefix: "https://www.gitlab.com/",
      linkSuffix: "",
      url: "",
    },
    twitter: {
      label: "Twitter",
      path: `${PROJECT_URL}/icons/socials/twitter.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/twitter-dark.svg`,
      linkPrefix: "https://www.x.com/",
      linkSuffix: "",
      url: "",
    },
    threads: {
      label: "Threads",
      path: `${PROJECT_URL}/icons/socials/threads.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/threads-dark.svg`,
      linkPrefix: "https://www.threads.net/@",
      linkSuffix: "",
      url: "",
    },
    hashnode: {
      label: "Hashnode",
      path: `${PROJECT_URL}/icons/socials/hashnode.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/hashnode-dark.svg`,
      linkPrefix: "https://",
      linkSuffix: "",
      linkSuffixTwo: ".hashnode.dev",
      url: "",
    },
    medium: {
      label: "Medium",
      path: `${PROJECT_URL}/icons/socials/medium.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/medium-dark.svg`,
      linkPrefix: "http://www.medium.com/",
      linkSuffix: "",
      url: "",
    },
    devdotto: {
      label: "DEV",
      path: `${PROJECT_URL}/icons/socials/devdotto.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/devdotto-dark.svg`,
      linkPrefix: "https://www.dev.to/",
      linkSuffix: "",
      url: "",
    },
    linkedin: {
      label: "LinkedIn",
      path: `${PROJECT_URL}/icons/socials/linkedin.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/linkedin-dark.svg`,
      linkPrefix: "https://www.linkedin.com/in/",
      linkSuffix: "",
      url: "",
    },
    polywork: {
      label: "Polywork",
      path: `${PROJECT_URL}/icons/socials/polywork.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/polywork-dark.svg`,
      linkPrefix: "https://www.polywork.com/",
      linkSuffix: "",
      url: "",
    },
    twitch: {
      label: "Twitch",
      path: `${PROJECT_URL}/icons/socials/twitch.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/twitch-dark.svg`,
      linkPrefix: "https://www.twitch.tv/",
      linkSuffix: "",
      url: "",
    },
    youtube: {
      label: "YouTube",
      path: `${PROJECT_URL}/icons/socials/youtube.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/youtube-dark.svg`,
      linkPrefix: "https://www.youtube.com/@",
      linkSuffix: "",
      url: "",
    },
    discord: {
      label: "Discord",
      path: `${PROJECT_URL}/icons/socials/discord.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/discord-dark.svg`,
      linkPrefix: "https://discord.com/users/",
      linkSuffix: "",
      url: "",
    },
    instagram: {
      label: "Instagram",
      path: `${PROJECT_URL}/icons/socials/instagram.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/instagram-dark.svg`,
      linkPrefix: "http://www.instagram.com/",
      linkSuffix: "",
      url: "",
    },
    facebook: {
      label: "Facebook",
      path: `${PROJECT_URL}/icons/socials/facebook.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/facebook-dark.svg`,
      linkPrefix: "https://www.facebook.com/",
      linkSuffix: "",
      url: "",
    },
    dribbble: {
      label: "Dribbble",
      path: `${PROJECT_URL}/icons/socials/dribbble.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/dribbble-dark.svg`,
      linkPrefix: "https://www.dribbble.com/",
      linkSuffix: "",
      url: "",
    },
    behance: {
      label: "Behance",
      path: `${PROJECT_URL}/icons/socials/behance.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/behance-dark.svg`,
      linkPrefix: "https://www.behance.com/",
      linkSuffix: "",
      url: "",
    },
    codesandbox: {
      label: "CodeSandbox",
      path: `${PROJECT_URL}/icons/socials/codesandbox.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/codesandbox-dark.svg`,
      linkPrefix: "https://codesandbox.io/u/",
      linkSuffix: "",
      url: "",
    },
    codepen: {
      label: "CodePen",
      path: `${PROJECT_URL}/icons/socials/codepen.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/codepen-dark.svg`,
      linkPrefix: "https://www.codepen.io/",
      linkSuffix: "",
      url: "",
    },
    stackoverflow: {
      label: "Stack Overflow",
      path: `${PROJECT_URL}/icons/socials/stackoverflow.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/stackoverflow-dark.svg`,
      linkPrefix: "https://www.stackoverflow.com/users/",
      linkSuffix: "",
      url: "",
    },
    rss: {
      label: "RSS",
      path: `${PROJECT_URL}/icons/socials/rss.svg`,
      darkPath: `${PROJECT_URL}/icons/socials/rss-dark.svg`,
      linkPrefix: "https://",
      linkSuffix: "",
      url: "",
    },
  },
  badges: [
    {
      id: "twitterFollowers",
      name: "Twitter Followers",
      show: false,
      type: "followers"
    },
    {
      id: "githubFollowers",
      name: "GitHub Followers",
      show: false,
      type: "followers"
    },
    {
      id: "githubVisits",
      name: "GitHub Visits",
      show: false,
      type: "visits"
    },
    {
      id: "githubStatsCard",
      name: "GitHub Stats",
      show: false,
      type: "stats",
      stars: true,
      commits: true,
      prs: true,
      issues: true,
      contribs: true,
      privateCommits: true,
    },
    {
      id: "githubCommitsGraph",
      name: "GitHub Commits Graph",
      show: false,
      type: "graph"
    },
    {
      id: "githubStreak",
      name: "GitHub Streak",
      show: false,
      type: "streak"
    },
    {
      id: "twitchStatus",
      name: "Twitch Status",
      show: false,
      type: "status"
    },
    {
      id: "topLangsCard",
      name: "Top Languages",
      show: false,
      type: "languages"
    },
    {
      id: "reposCard",
      name: "Featured Repos",
      show: false,
      type: "repos",
      repoOne: "",
      repoTwo: null,
      repoThree: null,
      repoFour: null,
    }
  ],
  cardStyle: {
    selected: false,
    titleColor: "0891b2",
    titleColorEdit: false,
    textColor: "ffffff",
    textColorEdit: false,
    iconColor: "0891b2",
    iconColorEdit: false,
    bgColor: "1c1917",
    bgColorEdit: false,
    hideBorder: true,
    showIcons: true,
  },
  support: supportStore,
  sidebarOpen: false,
  popOutMenuOpen: false,
  modal: false,
};

// Enhanced Reducer with proper error handling
function reducer(state, action) {
  try {
    switch (action.type) {
      // Hydrate the store
      case ACTIONS.HYDRATE_STORED_STATE:
        return {
          ...state,
          ...action.value
        };

      // Show Sections
      case ACTIONS.SHOW_SECTION:
        return {
          ...state,
          section: action.payload,
        };

      // Set Active Section
      case ACTIONS.SET_ACTIVE_SECTION:
        return {
          ...state,
          activeSection: action.payload.section,
        };

      // Select Render Mode
      case ACTIONS.SELECT_RENDER_MODE:
        return {
          ...state,
          renderMode: action.payload,
        };

      // Set Theme
      case ACTIONS.SET_THEME:
        return {
          ...state,
          theme: action.payload.theme,
        };

      // Introduction Actions
      case ACTIONS.ADD_INTRODUCTION:
        return {
          ...state,
          introduction: {
            ...state.introduction,
            [action.payload.title]: action.payload.value,
          },
        };

      // Update Profile Data
      case ACTIONS.UPDATE_PROFILE_FIELD:
        return {
          ...state,
          profileData: {
            ...state.profileData,
            [action.payload.field]: action.payload.value,
          },
        };

      // Set Profile Data
      case ACTIONS.SET_PROFILE_DATA:
        return {
          ...state,
          profileData: action.payload.data,
        };

      // Skills Sections
      case ACTIONS.ADD_SKILL:
        const skillType = action.payload.type;
        const skillPosition = action.payload.position;
        const skillIcon = action.payload.icon;

        if (!state.skills[skillType]) {
          console.warn(`Skill type ${skillType} does not exist`);
          return state;
        }

        return {
          ...state,
          skills: {
            ...state.skills,
            [skillType]: [
              ...state.skills[skillType].slice(0, skillPosition),
              skillIcon,
              ...state.skills[skillType].slice(skillPosition),
            ],
          },
        };

      case ACTIONS.REMOVE_SKILL:
        const removeSkillType = action.payload.type;
        const skillToRemove = action.payload.icon;

        if (!state.skills[removeSkillType]) {
          console.warn(`Skill type ${removeSkillType} does not exist`);
          return state;
        }

        return {
          ...state,
          skills: {
            ...state.skills,
            [removeSkillType]: state.skills[removeSkillType].filter(
              (item) => item.name !== skillToRemove.name
            ),
          },
        };

      // Socials Profiles Actions
      case ACTIONS.ADD_SOCIAL_PROFILE:
        const socialTitle = action.payload.title;
        const socialValue = action.payload.value;

        if (!state.socials[socialTitle]) {
          console.warn(`Social profile ${socialTitle} does not exist`);
          return state;
        }

        return {
          ...state,
          socials: {
            ...state.socials,
            [socialTitle]: {
              ...state.socials[socialTitle],
              linkSuffix: socialValue,
              url: state.socials[socialTitle].linkPrefix + socialValue + (state.socials[socialTitle].linkSuffixTwo || ''),
            },
          },
        };

      // Add Alternative Social Profile
      case ACTIONS.ADD_ALTERNATIVE_SOCIAL_PROFILE:
        const altSocialTitle = action.payload.title;
        const altSocialValue = action.payload.value;

        if (!state.socials[altSocialTitle]) {
          console.warn(`Social profile ${altSocialTitle} does not exist`);
          return state;
        }

        return {
          ...state,
          socials: {
            ...state.socials,
            [altSocialTitle]: {
              ...state.socials[altSocialTitle],
              linkSuffixTwo: altSocialValue,
              url: state.socials[altSocialTitle].linkPrefix + state.socials[altSocialTitle].linkSuffix + altSocialValue,
            },
          },
        };

      // Badges Actions
      case ACTIONS.TOGGLE_BADGE:
        const badgeId = action.payload.title;
        const updatedBadges = state.badges.map(badge => 
          badge.id === badgeId 
            ? { ...badge, show: !badge.show }
            : badge
        );
        
        return {
          ...state,
          badges: updatedBadges,
        };

      case ACTIONS.TOGGLE_GITHUB_STATS:
        const statsBadge = state.badges.find(badge => badge.id === 'githubStatsCard');
        if (!statsBadge) return state;

        const updatedStatsBadge = {
          ...statsBadge,
          [action.payload.keyToHide]: !statsBadge[action.payload.keyToHide]
        };

        return {
          ...state,
          badges: state.badges.map(badge => 
            badge.id === 'githubStatsCard' ? updatedStatsBadge : badge
          ),
        };

      case ACTIONS.TOGGLE_STYLE_COLOR:
        return {
          ...state,
          cardStyle: {
            ...state.cardStyle,
            [action.payload.keyToToggle]: !state.cardStyle[action.payload.keyToToggle],
          },
        };

      case ACTIONS.STYLE_BADGES:
        return {
          ...state,
          cardStyle: {
            ...state.cardStyle,
            [action.payload.keyToStyle]: action.payload.color,
            [action.payload.keyToToggle]: !state.cardStyle[action.payload.keyToToggle],
          },
        };

      case ACTIONS.ADD_REPO:
        const reposBadge = state.badges.find(badge => badge.id === 'reposCard');
        if (!reposBadge) return state;

        const updatedReposBadge = {
          ...reposBadge,
          [action.payload.title]: action.payload.value
        };

        return {
          ...state,
          badges: state.badges.map(badge => 
            badge.id === 'reposCard' ? updatedReposBadge : badge
          ),
        };

      case ACTIONS.DELETE_REPO:
        const deleteReposBadge = state.badges.find(badge => badge.id === 'reposCard');
        if (!deleteReposBadge) return state;

        const updatedDeleteReposBadge = {
          ...deleteReposBadge,
          [action.payload.title]: action.payload.value
        };

        return {
          ...state,
          badges: state.badges.map(badge => 
            badge.id === 'reposCard' ? updatedDeleteReposBadge : badge
          ),
        };

      // Support Actions
      case ACTIONS.ADD_SUPPORT:
        const supportTitle = action.payload.title;
        const supportValue = action.payload.value;

        if (!state.support[supportTitle]) {
          console.warn(`Support option ${supportTitle} does not exist`);
          return state;
        }

        return {
          ...state,
          support: {
            ...state.support,
            [supportTitle]: {
              ...state.support[supportTitle],
              linkSuffix: supportValue,
            },
          },
        };

      case ACTIONS.TOGGLE_COPY_MODAL:
        return {
          ...state,
          modal: action.payload,
        };

      case ACTIONS.TOGGLE_ELEMENT:
        return {
          ...state,
          [action.payload.elementToToggle]: !state[action.payload.elementToToggle],
        };

      case ACTIONS.CLOSE_ELEMENT:
        return {
          ...state,
          [action.payload.elementToClose]: false,
        };

      // Section reordering actions
      case ACTIONS.REORDER_SECTIONS:
        return {
          ...state,
          sectionOrder: action.payload.newOrder,
        };

      case ACTIONS.MOVE_SECTION_UP:
        const { sectionToMove: sectionUp } = action.payload;
        const currentIndexUp = state.sectionOrder.indexOf(sectionUp);
        if (currentIndexUp > 0) {
          const newOrderUp = [...state.sectionOrder];
          [newOrderUp[currentIndexUp], newOrderUp[currentIndexUp - 1]] = [
            newOrderUp[currentIndexUp - 1],
            newOrderUp[currentIndexUp],
          ];
          return {
            ...state,
            sectionOrder: newOrderUp,
          };
        }
        return state;

      case ACTIONS.MOVE_SECTION_DOWN:
        const { sectionToMove: sectionDown } = action.payload;
        const currentIndexDown = state.sectionOrder.indexOf(sectionDown);
        if (currentIndexDown < state.sectionOrder.length - 1) {
          const newOrderDown = [...state.sectionOrder];
          [newOrderDown[currentIndexDown], newOrderDown[currentIndexDown + 1]] = [
            newOrderDown[currentIndexDown + 1],
            newOrderDown[currentIndexDown],
          ];
          return {
            ...state,
            sectionOrder: newOrderDown,
          };
        }
        return state;

      case ACTIONS.RESET_SECTION_ORDER:
        return {
          ...state,
          sectionOrder: ["introduction", "skills", "socials", "badges", "support"],
        };

      // Social reordering actions
      case ACTIONS.REORDER_SOCIALS:
        return {
          ...state,
          socialOrder: action.payload.socialOrder,
        };

      case ACTIONS.RESET_SOCIAL_ORDER:
        return {
          ...state,
          socialOrder: [
            "github",
            "gitlab",
            "twitter",
            "threads",
            "hashnode",
            "medium",
            "devdotto",
            "linkedin",
            "polywork",
            "twitch",
            "youtube",
            "behance",
            "codepen",
            "codesandbox",
            "discord",
            "dribbble",
            "facebook",
            "rss",
            "stackoverflow",
          ],
        };

      // Skills reordering actions
      case ACTIONS.REORDER_SKILLS:
        return {
          ...state,
          skillsOrder: action.payload.skillsOrder,
        };

      case ACTIONS.RESET_SKILLS_ORDER:
        return {
          ...state,
          skillsOrder: [],
        };

      case ACTIONS.CLEAR_ALL_SKILLS:
        return {
          ...state,
          skills: Object.fromEntries(
            SKILL_CATEGORIES.map((category) => [category.name, []])
          ),
          skillsOrder: [],
        };

      // Clear all data action
      case ACTIONS.CLEAR_ALL_DATA:
        return {
          ...initialState,
          _version: state._version, // Keep the version
        };

      // Import data action
      case ACTIONS.IMPORT_DATA:
        return {
          ...state,
          ...action.payload,
        };

      // Open modal action
      case ACTIONS.OPEN_MODAL:
        return {
          ...state,
          modal: true,
        };

      // Close modal action
      case ACTIONS.CLOSE_MODAL:
        return {
          ...state,
          modal: false,
        };

      default:
        console.warn(`Unknown action type: ${action.type}`);
        return state;
    }
  } catch (error) {
    console.error('Reducer error:', error, 'Action:', action);
    return state;
  }
}

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducerWithMiddleware(
    reducer,
    initialState,
    [],
    [storeStateMiddleware]
  );
  const router = useRouter();

  // Google Analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (gtag.GA_TRACKING_ID) {
        gtag.pageview(url);
      }
    };
    
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Load stored state on mount
  useEffect(() => {
    try {
      const storedStateString = localStorage.getItem(STORED_STATE_KEY);

      if (storedStateString) {
        const retrievedStoredState = JSON.parse(storedStateString);

        if (retrievedStoredState) {
          // Migrate stored state to ensure compatibility with current initialState
          const migratedState = migrateStoredState(
            retrievedStoredState,
            initialState
          );
          dispatch({
            type: ACTIONS.HYDRATE_STORED_STATE,
            value: migratedState,
          });
        }
      }
    } catch (error) {
      console.warn("Error loading stored state, using initial state:", error);
      // If there's an error loading stored state, clear it and use initial state
      localStorage.removeItem(STORED_STATE_KEY);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (state.theme) {
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    }
  }, [state.theme]);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      {/* Google Analytics Script */}
      {gtag.GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            id="analytics-tag"
          />
          <Script
            strategy="afterInteractive"
            id="analytics-config"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      
      <ThemeProvider enableSystem={true} attribute="class" defaultTheme={state.theme}>
        <StateContext.Provider value={{ state, dispatch }}>
          {getLayout(<Component {...pageProps} />)}
        </StateContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;