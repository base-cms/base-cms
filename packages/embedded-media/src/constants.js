const TAG_ATTR_PREFIX = 'data-embed';

module.exports = {
  /**
   * The ending database tag.
   */
  DB_TAG_END: ']}%',

  /**
   * The starting database tag.
   */
  DB_TAG_START: '%{[',

  TAG_ATTR_PREFIX,

  /**
   * The attribute name that siginfies the tag id.
   */
  TAG_ID_ATTR_NAME: `${TAG_ATTR_PREFIX}-id`,

  /**
   * The attribute name that siginfies the tag type.
   */
  TAG_TYPE_ATTR_NAME: `${TAG_ATTR_PREFIX}-type`,
};
