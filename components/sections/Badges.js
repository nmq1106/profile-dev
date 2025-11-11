import React, { useRef, useContext } from "react";
import { ACTIONS } from "../../lib/constants/actions";
import { StateContext } from "../../pages/_app";
import NextSection from "../buttons/NextSection";
import PreviousSection from "../buttons/PreviousSection";

import SectionHeader from "../SectionHeader";
import ToggleBadgeButton from "../buttons/ToggleBadgeButton";
import StyleBadgeButton from "../buttons/StyleBadgeButton";
import ToggleBadgeElementCheckbox from "../buttons/ToggleBadgeElementCheckbox";
import AddRepoInput from "../forms/AddRepoInput";
import AddRepo from "../buttons/AddRepo";
import DeleteRepo from "../buttons/DeleteRepo";

const Badges = React.forwardRef((props, ref) => {
  const {
    badgesShowing,
    colorStore,
    handleStyleBadge,
    handleChangeBadgeColor,
    handleBadgeToggle,
    handleBadgeElementToggle,
  } = props;
  const { state, dispatch } = useContext(StateContext);

  // Helper function to get badge by ID
  const getBadge = (badgeId) => {
    return Array.isArray(state.badges) 
      ? state.badges.find(badge => badge.id === badgeId)
      : null;
  };

  // Helper function to check if badge is selected
  const isBadgeSelected = (badgeId) => {
    const badge = getBadge(badgeId);
    return badge ? badge.show : false;
  };

  // Helper function to get badge property
  const getBadgeProperty = (badgeId, property) => {
    const badge = getBadge(badgeId);
    return badge ? badge[property] : null;
  };

  // Get specific badges
  const githubStatsCardBadge = getBadge('githubStatsCard');
  const reposCardBadge = getBadge('reposCard');

  // Repo Card Refs
  const repoOneRef = useRef();
  const repoTwoRef = useRef();
  const repoThreeRef = useRef();
  const repoFourRef = useRef();

  return (
    <>
      <section className="section-header-wrapper">
        <SectionHeader
          header={"Badges"}
          subhead={`Add some badges and stats to your profile.`}
        />
        <div className="flex mt-4">
          <PreviousSection sectionToGoTo={"socials"} />
          <NextSection sectionToGoTo={"support"} />
        </div>
      </section>
      <section className="flex flex-col overflow-y-auto">
        <div ref={ref}></div>
        <section className="flex flex-col p-6">
          {/* Customise */}
          <article className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase text-dark-700 dark:text-white">
              Style badges:
            </p>
            {!badgesShowing ? (
              <p className="text-sm text-dark-500 dark:text-light-400">
                Select a badge below to customise its appearance.
              </p>
            ) : null}
            <article className="grid grid-cols-1 gap-3 mb-4 xl:grid-cols-2">
              <StyleBadgeButton
                colorList={colorStore.lightColors}
                badgeKeyToStyle={"titleColor"}
                badgeText={"Title"}
                handleStyleBadge={handleStyleBadge}
                badgeKeyToHide={"titleColorEdit"}
                badgesShowing={badgesShowing}
                handleChangeBadgeColor={handleChangeBadgeColor}
              />

              <StyleBadgeButton
                colorList={colorStore.lightColors}
                badgeKeyToStyle={"textColor"}
                badgeText={"Text"}
                handleStyleBadge={handleStyleBadge}
                badgeKeyToHide={"textColorEdit"}
                badgesShowing={badgesShowing}
                handleChangeBadgeColor={handleChangeBadgeColor}
              />

              <StyleBadgeButton
                colorList={colorStore.lightColors}
                badgeKeyToStyle={"iconColor"}
                badgeText={"Icons"}
                handleStyleBadge={handleStyleBadge}
                badgeKeyToHide={"iconColorEdit"}
                badgesShowing={badgesShowing}
                handleChangeBadgeColor={handleChangeBadgeColor}
              />

              <StyleBadgeButton
                colorList={colorStore.darkColors}
                badgeKeyToStyle={"bgColor"}
                badgeText={"Background"}
                handleStyleBadge={handleStyleBadge}
                badgeKeyToHide={"bgColorEdit"}
                badgesShowing={badgesShowing}
                handleChangeBadgeColor={handleChangeBadgeColor}
              />
            </article>
          </article>

          {/* GitHub Badges Section */}
          <article className="flex flex-col mb-6 gap-y-4">
            <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-2">
              GitHub
            </h3>
            {!state.socials?.github?.linkSuffix ? (
              <p className="mb-3 text-sm text-dark-500 dark:text-light-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                Please{" "}
                <button
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.SHOW_SECTION,
                      payload: "socials",
                    });
                  }}
                  className="text-brand hover:text-brand-light dark:text-brand-light dark:hover:text-brand font-medium underline transition-colors"
                >
                  add your GitHub profile
                </button>{" "}
                in the socials section to enable GitHub badges.
              </p>
            ) : null}

            {/* GitHub Stats Card */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"githubStatsCard"}
                profileLink={"github"}
                badgeText={"GitHub Stats Card"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('githubStatsCard')}
              />

              <article
                className={`flex flex-col p-4 border-t border-light-200 dark:border-dark-600 overflow-hidden transform transition-all duration-300 ease-in-out ${
                  isBadgeSelected('githubStatsCard')
                    ? "max-h-96 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
              >
                <p className="mb-3 text-sm font-semibold uppercase text-dark-600 dark:text-light-400">
                  Show Stats:
                </p>
                <article className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <ToggleBadgeElementCheckbox
                    badgeType={"githubStatsCard"}
                    badgeKeyToHide={"stars"}
                    badgeText={"Stars"}
                    handleBadgeElementToggle={handleBadgeElementToggle}
                    isChecked={githubStatsCardBadge?.stars !== false}
                  />
                  <ToggleBadgeElementCheckbox
                    badgeType={"githubStatsCard"}
                    badgeKeyToHide={"commits"}
                    badgeText={"Commits"}
                    handleBadgeElementToggle={handleBadgeElementToggle}
                    isChecked={githubStatsCardBadge?.commits !== false}
                  />
                  <ToggleBadgeElementCheckbox
                    badgeType={"githubStatsCard"}
                    badgeKeyToHide={"prs"}
                    badgeText={"Pull Requests"}
                    handleBadgeElementToggle={handleBadgeElementToggle}
                    isChecked={githubStatsCardBadge?.prs !== false}
                  />
                  <ToggleBadgeElementCheckbox
                    badgeType={"githubStatsCard"}
                    badgeKeyToHide={"issues"}
                    badgeText={"Issues"}
                    handleBadgeElementToggle={handleBadgeElementToggle}
                    isChecked={githubStatsCardBadge?.issues !== false}
                  />
                  <ToggleBadgeElementCheckbox
                    badgeType={"githubStatsCard"}
                    badgeKeyToHide={"contribs"}
                    badgeText={"Contributions"}
                    handleBadgeElementToggle={handleBadgeElementToggle}
                    isChecked={githubStatsCardBadge?.contribs !== false}
                  />
                  <ToggleBadgeElementCheckbox
                    badgeType={"githubStatsCard"}
                    badgeKeyToHide={"privateCommits"}
                    badgeText={"Private Commits"}
                    handleBadgeElementToggle={handleBadgeElementToggle}
                    isChecked={githubStatsCardBadge?.privateCommits !== false}
                  />
                </article>
              </article>
            </article>

            {/* GitHub Streak */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"githubStreak"}
                profileLink={"github"}
                badgeText={"GitHub Commit Streak"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('githubStreak')}
              />
            </article>

            {/* Top Languages Card */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"topLangsCard"}
                profileLink={"github"}
                badgeText={"Top Languages"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('topLangsCard')}
              />
            </article>

            {/* Repository Card */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"reposCard"}
                profileLink={"github"}
                badgeText={"Featured Repositories"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('reposCard')}
              />

              <article
                className={`flex flex-col p-4 border-t border-light-200 dark:border-dark-600 overflow-hidden transform transition-all duration-300 ease-in-out ${
                  isBadgeSelected('reposCard')
                    ? "max-h-96 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
              >
                <p className="mb-2 text-sm font-semibold uppercase text-dark-600 dark:text-light-400">
                  Repository Names
                </p>
                <p className="text-sm text-dark-500 dark:text-light-400 mb-4">
                  Enter repository names exactly as they appear on GitHub (case-sensitive).
                </p>
                <article className="grid grid-cols-1 gap-3 mb-4">
                  <AddRepoInput
                    ref={repoOneRef}
                    section={"reposCard"}
                    type={"repoOne"}
                    placeholder={"my-awesome-repo"}
                    action={ACTIONS.ADD_REPO}
                    currentValue={reposCardBadge?.repoOne || ""}
                  />

                  {reposCardBadge?.repoTwo != null ? (
                    <article className="flex gap-x-3">
                      <AddRepoInput
                        ref={repoTwoRef}
                        section={"reposCard"}
                        type={"repoTwo"}
                        placeholder={"another-repo"}
                        action={ACTIONS.ADD_REPO}
                        currentValue={reposCardBadge?.repoTwo || ""}
                      />
                      <DeleteRepo
                        action={ACTIONS.DELETE_REPO}
                        type={"repoTwo"}
                      />
                    </article>
                  ) : null}

                  {reposCardBadge?.repoThree != null ? (
                    <article className="flex gap-x-3">
                      <AddRepoInput
                        ref={repoThreeRef}
                        section={"reposCard"}
                        type={"repoThree"}
                        placeholder={"third-repo"}
                        action={ACTIONS.ADD_REPO}
                        currentValue={reposCardBadge?.repoThree || ""}
                      />
                      <DeleteRepo
                        action={ACTIONS.DELETE_REPO}
                        type={"repoThree"}
                      />
                    </article>
                  ) : null}

                  {reposCardBadge?.repoFour != null ? (
                    <article className="flex gap-x-3">
                      <AddRepoInput
                        ref={repoFourRef}
                        section={"reposCard"}
                        type={"repoFour"}
                        placeholder={"fourth-repo"}
                        action={ACTIONS.ADD_REPO}
                        currentValue={reposCardBadge?.repoFour || ""}
                      />
                      <DeleteRepo
                        action={ACTIONS.DELETE_REPO}
                        type={"repoFour"}
                      />
                    </article>
                  ) : null}
                </article>

                {/* Add Repository Buttons */}
                <div className="flex flex-wrap gap-2">
                  {reposCardBadge?.repoTwo == null && (
                    <AddRepo
                      action={ACTIONS.ADD_REPO}
                      repoNumberToAdd={"repoTwo"}
                      label="Add Second Repo"
                    />
                  )}

                  {reposCardBadge?.repoThree == null && reposCardBadge?.repoTwo != null && (
                    <AddRepo
                      action={ACTIONS.ADD_REPO}
                      repoNumberToAdd={"repoThree"}
                      label="Add Third Repo"
                    />
                  )}

                  {reposCardBadge?.repoFour == null && reposCardBadge?.repoThree != null && (
                    <AddRepo
                      action={ACTIONS.ADD_REPO}
                      repoNumberToAdd={"repoFour"}
                      label="Add Fourth Repo"
                    />
                  )}
                </div>
              </article>
            </article>

            {/* GitHub Followers Badge */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"githubFollowers"}
                profileLink={"github"}
                badgeText={"GitHub Followers Count"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('githubFollowers')}
              />
            </article>
          </article>

          {/* Twitter Badges Section */}
          <article className="flex flex-col mb-6 gap-y-4">
            <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-2">
              X (Twitter)
            </h3>
            {!state.socials?.twitter?.linkSuffix ? (
              <p className="mb-3 text-sm text-dark-500 dark:text-light-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                Please{" "}
                <button
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.SHOW_SECTION,
                      payload: "socials",
                    });
                  }}
                  className="text-brand hover:text-brand-light dark:text-brand-light dark:hover:text-brand font-medium underline transition-colors"
                >
                  add your X profile
                </button>{" "}
                in the socials section to enable Twitter badges.
              </p>
            ) : null}

            {/* Twitter Followers Badge */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"twitterFollowers"}
                profileLink={"twitter"}
                badgeText={"Twitter Followers Count"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('twitterFollowers')}
              />
            </article>
          </article>

          {/* Twitch Badges Section */}
          <article className="flex flex-col mb-6 gap-y-4">
            <h3 className="text-lg font-semibold text-dark-800 dark:text-white mb-2">
              Twitch
            </h3>
            {!state.socials?.twitch?.linkSuffix ? (
              <p className="mb-3 text-sm text-dark-500 dark:text-light-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                Please{" "}
                <button
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.SHOW_SECTION,
                      payload: "socials",
                    });
                  }}
                  className="text-brand hover:text-brand-light dark:text-brand-light dark:hover:text-brand font-medium underline transition-colors"
                >
                  add your Twitch profile
                </button>{" "}
                in the socials section to enable Twitch badges.
              </p>
            ) : null}

            {/* Twitch Status Badge */}
            <article className="border border-light-200 dark:border-dark-600 rounded-lg overflow-hidden">
              <ToggleBadgeButton
                badgeType={"twitchStatus"}
                profileLink={"twitch"}
                badgeText={"Twitch Streaming Status"}
                handleBadgeToggle={handleBadgeToggle}
                isSelected={isBadgeSelected('twitchStatus')}
              />
            </article>
          </article>

          {/* Navigation */}
          <section className="flex mt-6 gap-3">
            <PreviousSection sectionToGoTo={"socials"} />
            <NextSection sectionToGoTo={"support"} />
          </section>
        </section>
      </section>
    </>
  );
});

Badges.displayName = "Badges";
export default Badges;