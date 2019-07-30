const websiteScheduledContent = require('./website-scheduled-content');

const { isArray } = Array;

/**
 * Performs a `websiteScheduledContent` with an `optionId`.
 * If the optioned content is less than the requested limit, another query
 * will be perfomed without the option to fill the remaining limit requirement.
 *
 * This is primarily used for creating "Pinned Content" blocks.
 *
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params The params object that will be sent to `websiteScheduledContent`.
 */
module.exports = async (apolloClient, params) => {
  // Must set a default limit.
  const { optionId, limit = 20, optionDepleted } = params;
  // If no option was provided (or the option query is depleted), perform a "regular" query.
  if (!optionId || optionDepleted) return websiteScheduledContent(apolloClient, params);

  // Retrieve content with option (do not allow section bubbling).
  const optioned = await websiteScheduledContent(apolloClient, {
    ...params,
    sectionBubbling: false,
  });
  const { length } = optioned.nodes;

  // If enough optioned content was found to fulfill then return it.
  if (length >= limit) return { ...optioned, optionDepleted: false };

  // Retrieve scheduled content, excluding the option and any found content.
  const ids = optioned.nodes.map(node => node.id);
  const excludeContentIds = isArray(params.excludeContentIds)
    ? [...ids, ...params.excludeContentIds] : ids;
  const scheduled = await websiteScheduledContent(apolloClient, {
    ...params,
    optionId: undefined,
    excludeContentIds,
  });

  // If no optioned content was found then return the scheduled content.
  if (!length) return { ...scheduled, optionDepleted: true };

  // Merge the content up to the limit and return the scheduled page info.
  const diff = limit - length;
  const nodes = [...optioned.nodes, ...scheduled.nodes.slice(0, diff)];
  return { nodes, pageInfo: scheduled.pageInfo, optionDepleted: true };
};
