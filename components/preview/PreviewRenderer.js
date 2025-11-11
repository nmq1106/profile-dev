import React from "react";
import { useTheme } from "next-themes";
import DraggableSocialIcon from "./DraggableSocialIcon";
import DraggableSkillIcon from "./DraggableSkillIcon";

export default function PreviewRenderer({
  state,
  sectionOrder,
  skillsEmpty,
  socialsShowing,
  badgesShowing,
  supportStore,
  withSupport,
  socialsOrder,
  onSocialDragStart,
  onSocialDragOver,
  onSocialDrop,
  isSocialDragging,
  socialDraggedIndex,
  skillsOrder,
  onSkillsDragStart,
  onSkillsDragOver,
  onSkillsDrop,
  isSkillsDragging,
  skillsDraggedIndex,
}) {
  const { theme } = useTheme();

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

  // Helper function to get social URL
  const getSocialUrl = (socialKey) => {
    const social = state.socials?.[socialKey];
    if (!social) return '';
    
    if (social.url) return social.url;
    if (social.linkPrefix && social.linkSuffix) {
      return social.linkPrefix + social.linkSuffix + (social.linkSuffixTwo || '');
    }
    return '';
  };

  // Helper function to get social suffix
  const getSocialSuffix = (socialKey) => {
    return state.socials?.[socialKey]?.linkSuffix || '';
  };

  const renderSection = (sectionType) => {
    switch (sectionType) {
      case "introduction":
        return (
          <div
            className={`${
              state.introduction?.name ||
              state.introduction?.animatedHand ||
              state.introduction?.shortDescription ||
              state.introduction?.longDescription ||
              state.introduction?.location ||
              (state.introduction?.workingOnTitle &&
                state.introduction?.workingOnLink) ||
              (state.introduction?.portfolioTitle &&
                state.introduction?.portfolioLink) ||
              state.introduction?.emailMe ||
              state.introduction?.learning ||
              state.introduction?.collaborateOn ||
              state.introduction?.additionalInfo
                ? "mb-6"
                : ""
            }`}
          >
            {!state.introduction?.name ? null : (
              <div className="mb-4">
                {state.introduction.animatedHand === 0 && (
                  <h1 className="text-2xl font-bold text-dark-800 dark:text-white mb-2">
                    Hi 👋 My name is {state.introduction.name}
                  </h1>
                )}
                {state.introduction.animatedHand !== 0 && (
                  <h1 className="text-2xl font-bold text-dark-800 dark:text-white mb-2">
                    Hi{" "}
                    <span className="inline-flex align-middle">
                      <img
                        height="32px"
                        width="32px"
                        src="https://user-images.githubusercontent.com/18350557/176309783-0785949b-9127-417c-8b55-ab5a4333674e.gif"
                        alt="Animated hand"
                        className="inline-block mx-1"
                      />
                    </span>
                    My name is {state.introduction.name}
                  </h1>
                )}
              </div>
            )}
            
            {state.introduction?.shortDescription ? (
              <h2 className="text-xl font-semibold text-dark-700 dark:text-light-300 mb-3">
                {state.introduction.shortDescription}
              </h2>
            ) : null}

            {state.introduction?.longDescription
              ? state.introduction.longDescription.split("\n").map((line, index) => (
                  <p className="whitespace-pre-line text-dark-600 dark:text-light-400 mb-2 leading-relaxed" key={index}>
                    {line}
                  </p>
                ))
              : null}

            <ul
              className={`${
                state.introduction?.location ||
                (state.introduction?.workingOnTitle &&
                  state.introduction?.workingOnLink) ||
                (state.introduction?.portfolioTitle &&
                  state.introduction?.portfolioLink) ||
                state.introduction?.learning ||
                state.introduction?.emailMe ||
                state.introduction?.collaborateOn ||
                state.introduction?.additionalInfo
                  ? "mt-4 space-y-2"
                  : ""
              } list-disc list-inside text-dark-600 dark:text-light-400`}
            >
              {state.introduction?.location ? (
                <li className="leading-relaxed">
                  🌍&nbsp; I&apos;m based in {state.introduction.location}
                </li>
              ) : null}
              
              {state.introduction?.portfolioTitle &&
              state.introduction?.portfolioLink ? (
                <li className="leading-relaxed">
                  🖥️&nbsp; See my portfolio at{" "}
                  <a
                    href={`${state.introduction.portfolioLink.startsWith('http') ? '' : 'http://'}${state.introduction.portfolioLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-light dark:text-brand-light dark:hover:text-brand transition-colors"
                  >
                    {state.introduction.portfolioTitle}
                  </a>
                </li>
              ) : null}
              
              {state.introduction?.emailMe ? (
                <li className="leading-relaxed">
                  ✉️&nbsp; You can contact me at{" "}
                  <a 
                    href={`mailto:${state.introduction.emailMe}`}
                    className="text-brand hover:text-brand-light dark:text-brand-light dark:hover:text-brand transition-colors"
                  >
                    {state.introduction.emailMe}
                  </a>
                </li>
              ) : null}
              
              {state.introduction?.workingOnTitle &&
              state.introduction?.workingOnLink ? (
                <li className="leading-relaxed">
                  🚀&nbsp; I&apos;m currently working on{" "}
                  <a
                    href={`${state.introduction.workingOnLink.startsWith('http') ? '' : 'http://'}${state.introduction.workingOnLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-light dark:text-brand-light dark:hover:text-brand transition-colors"
                  >
                    {state.introduction.workingOnTitle}
                  </a>
                </li>
              ) : null}
              
              {state.introduction?.learning ? (
                <li className="leading-relaxed">
                  🧠&nbsp; I&apos;m learning {state.introduction.learning}
                </li>
              ) : null}
              
              {state.introduction?.collaborateOn ? (
                <li className="leading-relaxed">
                  🤝&nbsp; I&apos;m open to collaborating on{" "}
                  {state.introduction.collaborateOn}
                </li>
              ) : null}
              
              {state.introduction?.additionalInfo ? (
                <li className="leading-relaxed">
                  ⚡&nbsp; {state.introduction.additionalInfo}
                </li>
              ) : null}
            </ul>
          </div>
        );

      case "badges":
        const githubFollowersBadge = getBadge('githubFollowers');
        const twitterFollowersBadge = getBadge('twitterFollowers');
        const twitchStatusBadge = getBadge('twitchStatus');
        const githubStatsCardBadge = getBadge('githubStatsCard');
        const githubCommitsGraphBadge = getBadge('githubCommitsGraph');
        const githubStreakBadge = getBadge('githubStreak');
        const topLangsCardBadge = getBadge('topLangsCard');
        const reposCardBadge = getBadge('reposCard');

        return (
          <div className="mb-6">
            {/* GitHub, Twitter and Twitch Badges */}
            <div
              className={`flex flex-wrap gap-3 ${
                isBadgeSelected('githubFollowers') ||
                isBadgeSelected('twitterFollowers') ||
                isBadgeSelected('twitchStatus')
                  ? "mb-6"
                  : "mb-0"
              }`}
            >
              {isBadgeSelected('githubFollowers') && getSocialSuffix('github') ? (
                <img
                  src={`https://img.shields.io/github/followers/${getSocialSuffix('github')}?logo=github&style=for-the-badge&color=${state.cardStyle?.iconColor || '0891b2'}&labelColor=${state.cardStyle?.bgColor || '1c1917'}`}
                  alt={`GitHub followers for ${getSocialSuffix('github')}`}
                  className="h-7 object-contain"
                />
              ) : null}
              
              {isBadgeSelected('twitterFollowers') && getSocialSuffix('twitter') ? (
                <img
                  src={`https://img.shields.io/twitter/follow/${getSocialSuffix('twitter')}?logo=twitter&style=for-the-badge&color=${state.cardStyle?.iconColor || '0891b2'}&labelColor=${state.cardStyle?.bgColor || '1c1917'}`}
                  alt={`Twitter followers for ${getSocialSuffix('twitter')}`}
                  className="h-7 object-contain"
                />
              ) : null}
              
              {isBadgeSelected('twitchStatus') && getSocialSuffix('twitch') ? (
                <img
                  src={`https://img.shields.io/twitch/status/${getSocialSuffix('twitch')}?logo=twitchsx&style=for-the-badge&color=${state.cardStyle?.iconColor || '0891b2'}&labelColor=${state.cardStyle?.bgColor || '1c1917'}&label=TWITCH+STATUS`}
                  alt={`Twitch status for ${getSocialSuffix('twitch')}`}
                  className="h-7 object-contain"
                />
              ) : null}
            </div>

            {badgesShowing && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4">
                  Badges
                </h3>
              </div>
            )}

            {/* Badges Section Preview */}
            <div className="space-y-6">
              {(isBadgeSelected('githubStatsCard') ||
                isBadgeSelected('githubCommitsGraph') ||
                isBadgeSelected('githubStreak') ||
                isBadgeSelected('topLangsCard')) && (
                <p className="font-bold text-dark-700 dark:text-light-300 text-lg">
                  My GitHub Stats
                </p>
              )}

              {isBadgeSelected('githubStatsCard') && getSocialSuffix('github') ? (
                <a
                  href={`https://www.github.com/${getSocialSuffix('github')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${
                      getSocialSuffix('github')
                    }&hide=${
                      githubStatsCardBadge?.stars ? '' : 'stars,'
                    }${githubStatsCardBadge?.commits ? '' : 'commits,'}${
                      githubStatsCardBadge?.prs ? '' : 'prs,'
                    }${githubStatsCardBadge?.issues ? '' : 'issues,'}${
                      githubStatsCardBadge?.contribs ? '' : 'contribs'
                    }${
                      githubStatsCardBadge?.privateCommits
                        ? '&count_private=true'
                        : ''
                    }&title_color=${
                      state.cardStyle?.titleColor || '0891b2'
                    }&text_color=${
                      state.cardStyle?.textColor || 'ffffff'
                    }&icon_color=${state.cardStyle?.iconColor || '0891b2'}&bg_color=${
                      state.cardStyle?.bgColor || '1c1917'
                    }&hide_border=${state.cardStyle?.hideBorder !== false}&border_radius=0&show_icons=${state.cardStyle?.showIcons !== false}`}
                    alt="GitHub Stats"
                    className="w-full max-w-2xl"
                  />
                </a>
              ) : null}

              {isBadgeSelected('githubStreak') && getSocialSuffix('github') ? (
                <a
                  href={`https://www.github.com/${getSocialSuffix('github')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${getSocialSuffix('github')}&stroke=${state.cardStyle?.textColor || 'ffffff'}&background=${state.cardStyle?.bgColor || '1c1917'}&ring=${state.cardStyle?.titleColor || '0891b2'}&fire=${state.cardStyle?.titleColor || '0891b2'}&currStreakNum=${state.cardStyle?.textColor || 'ffffff'}&currStreakLabel=${state.cardStyle?.titleColor || '0891b2'}&sideNums=${state.cardStyle?.textColor || 'ffffff'}&sideLabels=${state.cardStyle?.textColor || 'ffffff'}&dates=${state.cardStyle?.textColor || 'ffffff'}&hide_border=${state.cardStyle?.hideBorder !== false}`}
                    alt="GitHub Streak"
                    className="w-full max-w-2xl"
                  />
                </a>
              ) : null}

              {isBadgeSelected('githubCommitsGraph') && getSocialSuffix('github') ? (
                <a
                  href={`https://www.github.com/${getSocialSuffix('github')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${getSocialSuffix('github')}&bg_color=${state.cardStyle?.bgColor || '1c1917'}&color=${state.cardStyle?.textColor || 'ffffff'}&line=${state.cardStyle?.iconColor || '0891b2'}&point=${state.cardStyle?.textColor || 'ffffff'}&area_color=${state.cardStyle?.bgColor || '1c1917'}&area=true&hide_border=${state.cardStyle?.hideBorder !== false}&custom_title=GitHub%20Commits%20Graph`}
                    alt="GitHub Commits Graph"
                    className="w-full max-w-4xl"
                  />
                </a>
              ) : null}

              {isBadgeSelected('topLangsCard') && getSocialSuffix('github') ? (
                <a
                  href={`https://www.github.com/${getSocialSuffix('github')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${getSocialSuffix('github')}&langs_count=10&title_color=${state.cardStyle?.titleColor || '0891b2'}&text_color=${state.cardStyle?.textColor || 'ffffff'}&icon_color=${state.cardStyle?.iconColor || '0891b2'}&bg_color=${state.cardStyle?.bgColor || '1c1917'}&hide_border=${state.cardStyle?.hideBorder !== false}&locale=en&custom_title=Top%20%Languages`}
                    alt="Top Languages"
                    className="w-full max-w-2xl"
                  />
                </a>
              ) : null}

              {/* Repo Cards */}
              {isBadgeSelected('reposCard') && getSocialSuffix('github') ? (
                <div className="space-y-4">
                  <p className="font-bold text-dark-700 dark:text-light-300 text-lg">
                    Top Repositories
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reposCardBadge?.repoOne ? (
                      <a
                        href={`https://www.github.com/${getSocialSuffix('github')}/${reposCardBadge.repoOne}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`https://github-readme-stats.vercel.app/api/pin/?username=${getSocialSuffix('github')}&repo=${reposCardBadge.repoOne}&title_color=${state.cardStyle?.titleColor || '0891b2'}&text_color=${state.cardStyle?.textColor || 'ffffff'}&icon_color=${state.cardStyle?.iconColor || '0891b2'}&bg_color=${state.cardStyle?.bgColor || '1c1917'}&hide_border=${state.cardStyle?.hideBorder !== false}&locale=en`}
                          alt={`Repository: ${reposCardBadge.repoOne}`}
                          className="w-full"
                        />
                      </a>
                    ) : (
                      <div className="text-sm text-dark-500 dark:text-light-400 p-4 bg-light-100 dark:bg-dark-700 rounded-lg">
                        Please enter a repository name.
                      </div>
                    )}

                    {reposCardBadge?.repoTwo ? (
                      <a
                        href={`https://www.github.com/${getSocialSuffix('github')}/${reposCardBadge.repoTwo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`https://github-readme-stats.vercel.app/api/pin/?username=${getSocialSuffix('github')}&repo=${reposCardBadge.repoTwo}&title_color=${state.cardStyle?.titleColor || '0891b2'}&text_color=${state.cardStyle?.textColor || 'ffffff'}&icon_color=${state.cardStyle?.iconColor || '0891b2'}&bg_color=${state.cardStyle?.bgColor || '1c1917'}&hide_border=${state.cardStyle?.hideBorder !== false}&locale=en`}
                          alt={`Repository: ${reposCardBadge.repoTwo}`}
                          className="w-full"
                        />
                      </a>
                    ) : null}

                    {reposCardBadge?.repoThree ? (
                      <a
                        href={`https://www.github.com/${getSocialSuffix('github')}/${reposCardBadge.repoThree}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`https://github-readme-stats.vercel.app/api/pin/?username=${getSocialSuffix('github')}&repo=${reposCardBadge.repoThree}&title_color=${state.cardStyle?.titleColor || '0891b2'}&text_color=${state.cardStyle?.textColor || 'ffffff'}&icon_color=${state.cardStyle?.iconColor || '0891b2'}&bg_color=${state.cardStyle?.bgColor || '1c1917'}&hide_border=${state.cardStyle?.hideBorder !== false}&locale=en`}
                          alt={`Repository: ${reposCardBadge.repoThree}`}
                          className="w-full"
                        />
                      </a>
                    ) : null}

                    {reposCardBadge?.repoFour ? (
                      <a
                        href={`https://www.github.com/${getSocialSuffix('github')}/${reposCardBadge.repoFour}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`https://github-readme-stats.vercel.app/api/pin/?username=${getSocialSuffix('github')}&repo=${reposCardBadge.repoFour}&title_color=${state.cardStyle?.titleColor || '0891b2'}&text_color=${state.cardStyle?.textColor || 'ffffff'}&icon_color=${state.cardStyle?.iconColor || '0891b2'}&bg_color=${state.cardStyle?.bgColor || '1c1917'}&hide_border=${state.cardStyle?.hideBorder !== false}&locale=en`}
                          alt={`Repository: ${reposCardBadge.repoFour}`}
                          className="w-full"
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="mb-6">
            {/* Skills Section Preview */}
            {!skillsEmpty && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white">
                  Skills
                </h3>
              </div>
            )}

            {/* Skills Section Preview */}
            <div className={`${skillsEmpty ? "mb-0" : "mb-4"}`}>
              {/* Icons Display */}
              {skillsOrder && skillsOrder.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skillsOrder.map((skill, index) => (
                    <DraggableSkillIcon
                      key={`skill-${skill.path}-${index}`}
                      skill={skill}
                      index={index}
                      onDragStart={onSkillsDragStart}
                      onDragOver={onSkillsDragOver}
                      onDrop={onSkillsDrop}
                      isDragging={isSkillsDragging}
                      draggedIndex={skillsDraggedIndex}
                    />
                  ))}
                </div>
              ) : (
                !skillsEmpty && (
                  <p className="text-dark-500 dark:text-light-400 text-sm">
                    No skills added yet. Add some skills to see them here.
                  </p>
                )
              )}
            </div>
          </div>
        );

      case "socials":
        return (
          <div className="mb-6">
            {/* Socials Title Preview */}
            {socialsShowing && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white">
                  Socials
                </h3>
              </div>
            )}

            {/* Socials Section Preview */}
            <div className={`${socialsShowing ? "mb-4" : ""}`}>
              {/* Show socials based on order, but only those with links */}
              {socialsOrder && socialsOrder.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {socialsOrder.map(({ key, data }, index) => (
                    <DraggableSocialIcon
                      key={`social-${key}-${index}`}
                      socialKey={key}
                      socialData={data}
                      index={index}
                      onDragStart={onSocialDragStart}
                      onDragOver={onSocialDragOver}
                      onDrop={onSocialDrop}
                      isDragging={isSocialDragging}
                      draggedIndex={socialDraggedIndex}
                    />
                  ))}
                </div>
              ) : (
                socialsShowing && (
                  <p className="text-dark-500 dark:text-light-400 text-sm">
                    No social links added yet. Add some social profiles to see them here.
                  </p>
                )
              )}
            </div>
          </div>
        );

      case "support":
        return (
          <div className={`${withSupport ? "mt-6" : ""}`}>
            {withSupport && (
              <>
                <h3 className="text-xl font-semibold text-dark-800 dark:text-white mb-4">
                  Support
                </h3>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(state.support || {}).map(([key, value]) =>
                    value && value.linkSuffix ? (
                      <div
                        className="inline-block"
                        key={`${value.linkPrefix || ""}${value.linkSuffix || ""}`}
                      >
                        <a
                          href={`${value.linkPrefix || ""}${value.linkSuffix || ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={value?.previewIMG || supportStore[key]?.previewIMG}
                            alt={`Support ${key}`}
                            className="object-contain"
                            width="150"
                            height="50"
                          />
                        </a>
                      </div>
                    ) : null
                  )}
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <article id="preview-container" className="relative bg-white dark:bg-dark-800 rounded-2xl p-6 border border-light-200 dark:border-dark-600 shadow-lg">
      {sectionOrder.map((sectionType, index) => (
        <React.Fragment key={`section-${sectionType}-${index}`}>
          {renderSection(sectionType)}
        </React.Fragment>
      ))}
    </article>
  );
}