module.exports = {
  /**
   *
   */
  YoutubePageInfo: {
    resultsPerPage: ({ resultsPerPage = 10 } = {}) => resultsPerPage,
    totalResults: ({ totalResults = 0 } = {}) => totalResults,
  },
  YoutubePlaylistItems: {
    items: ({ items = [] } = {}) => items,
  },
};
