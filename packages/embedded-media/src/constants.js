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

  /**
   * The default HTML element to use for HTML tags.
   */
  DEFAULT_HTML_ELEMENT: 'span', // @deprecated

  TAG_ATTR_PREFIX,

  /**
   * The attribute name that siginfies the html element the tag should use.
   */
  TAG_ELEMENT_ATTR_NAME: 'data-embed-element', // @deprecated

  /**
   * The attribute name that siginfies the tag id.
   */
  TAG_ID_ATTR_NAME: `${TAG_ATTR_PREFIX}-id`,

  /**
   * The attribute name that siginfies the tag type.
   */
  TAG_TYPE_ATTR_NAME: `${TAG_ATTR_PREFIX}-type`,

  /**
   * The attribute name that siginfies a tag is in an error state.
   */
  TAG_INVALID_ATTR_NAME: 'data-embed-invalid', // @deprecated

  /**
   * The attribute name that siginfies a tag is in a disabled HTML display state.
   */
  TAG_DISABLED_ATTR_NAME: 'data-embed-disabled', // @deprecated
};
