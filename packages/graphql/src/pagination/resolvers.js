module.exports = {
  totalCount: paginated => paginated.getTotalCount(),
  edges: paginated => paginated.getEdges(),
  pageInfo: paginated => ({
    hasNextPage: () => paginated.hasNextPage(),
    endCursor: () => paginated.getEndCursor(),
  }),
};
