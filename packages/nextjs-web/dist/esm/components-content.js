import { j as _objectWithoutProperties, f as _extends } from './chunk-cc870ac4.js';
import React, { Fragment } from 'react';
import './chunk-fccae6e7.js';
import { getAsObject as _getAsObject, modelClassNames, isFunction as isFn, titleizeType, getAsArray as _getAsArray, get as _get } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import { get } from 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import { c as ObjectValue } from './chunk-559b4f38.js';
import './routing.js';
import { a as LinkElement } from './chunk-e963a041.js';
import classNames from 'classnames';
import { a as withModelFieldClass } from './chunk-4277d5cc.js';
import { a as Link } from './chunk-6e8ab5f7.js';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/content/Link.jsx";
var propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // The content canonical path.
  canonicalPath: PropTypes.string.isRequired,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  value: null
}; // @todo Do not make this clickable if the canonicalPath matches the route.

var ContentLink = function ContentLink(_ref) {
  var canonicalPath = _ref.canonicalPath,
      rest = _objectWithoutProperties(_ref, ["canonicalPath"]);

  return React.createElement(LinkElement, _extends({
    to: canonicalPath,
    className: "content__link"
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }));
};

ContentLink.displayName = 'Content/Link';
ContentLink.propTypes = propTypes;
ContentLink.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/content/Wrapper.jsx";
var propTypes$1 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
  className: null,
  content: {},
  tag: 'article'
};

var ContentWrapper = function ContentWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      content = _ref.content,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "className", "content", "tag"]);

  var _ref2 = content || {},
      id = _ref2.id,
      type = _ref2.type;

  return React.createElement(Tag, _extends({
    "data-id": id,
    className: classNames('content', 'content--display', "content--".concat(type), className)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 30
    },
    __self: this
  }), children);
};

ContentWrapper.displayName = 'Content/Wrapper';
ContentWrapper.propTypes = propTypes$1;
ContentWrapper.defaultProps = defaultProps$1;

var ObjectValue$1 = withModelFieldClass('content')(ObjectValue);

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/content/Elements/Body.jsx";
var propTypes$2 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    body: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$2 = {
  collapsible: true,
  content: {},
  tag: 'div'
};

var ContentBody = function ContentBody(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
    asHTML: true,
    path: "body",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 20
    },
    __self: this
  }));
};

ContentBody.displayName = 'Content/Elements/Body';
ContentBody.propTypes = propTypes$2;
ContentBody.defaultProps = defaultProps$2;

var _jsxFileName$3 = "/base-cms/packages/nextjs-web/src/components/content/Elements/Name.jsx";
var propTypes$3 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$3 = {
  collapsible: true,
  content: {},
  tag: 'h1'
};

var ContentName = function ContentName(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "name",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 20
    },
    __self: this
  }));
};

ContentName.displayName = 'Content/Elements/Name';
ContentName.propTypes = propTypes$3;
ContentName.defaultProps = defaultProps$3;

var _jsxFileName$4 = "/base-cms/packages/nextjs-web/src/components/content/Elements/PrimaryImage.jsx";
var propTypes$4 = {
  children: PropTypes.func,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$4 = {
  children: function children(v) {
    return v;
  },
  className: null,
  collapsible: true,
  content: {},
  imgAttrs: {},
  tag: 'div'
};

var PrimaryImage = function PrimaryImage(_ref) {
  var children = _ref.children,
      className = _ref.className,
      collapsible = _ref.collapsible,
      content = _ref.content,
      imgAttrs = _ref.imgAttrs,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "className", "collapsible", "content", "imgAttrs", "tag"]);

  var primaryImage = _getAsObject(content, 'primaryImage');
  var src = primaryImage.src,
      alt = primaryImage.alt;
  var render = isFn(children) ? children : defaultProps$4.children;
  if (collapsible && (!src || !alt)) return null;
  var image = React.createElement("img", _extends({
    src: src,
    alt: alt
  }, imgAttrs, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 42
    },
    __self: this
  }));
  return React.createElement(Tag, _extends({
    className: classNames(modelClassNames('content', 'primaryImage'), className)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 44
    },
    __self: this
  }), render(image));
};

PrimaryImage.displayName = 'Content/Elements/PrimaryImage';
PrimaryImage.propTypes = propTypes$4;
PrimaryImage.defaultProps = defaultProps$4;

var _jsxFileName$5 = "/base-cms/packages/nextjs-web/src/components/content/Elements/PublishedDate.jsx";
var propTypes$5 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    published: PropTypes.number
  }),
  format: PropTypes.string,
  prefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$5 = {
  children: undefined,
  collapsible: true,
  content: {},
  format: 'MMM Do, YYYY',
  prefix: '',
  tag: 'time'
};

var ContentPublishedDate = function ContentPublishedDate(_ref) {
  var content = _ref.content,
      children = _ref.children,
      format = _ref.format,
      prefix = _ref.prefix,
      rest = _objectWithoutProperties(_ref, ["content", "children", "format", "prefix"]);

  return React.createElement(ObjectValue$1, _extends({
    asDate: true,
    dateFormat: format,
    path: "published",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 33
    },
    __self: this
  }), function (value) {
    var formatted = prefix ? "".concat(prefix, " ").concat(value) : value;
    if (isFn(children)) return children(formatted);
    return formatted;
  });
};

ContentPublishedDate.displayName = 'Content/Elements/PublishedDate';
ContentPublishedDate.propTypes = propTypes$5;
ContentPublishedDate.defaultProps = defaultProps$5;

var _jsxFileName$6 = "/base-cms/packages/nextjs-web/src/components/content/Elements/Row.jsx";
var propTypes$6 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$6 = {
  className: null,
  tag: 'div'
};

var ContentRow = function ContentRow(_ref) {
  var children = _ref.children,
      className = _ref.className,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React.createElement(Tag, _extends({
    className: classNames('content__element-row', className)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 22
    },
    __self: this
  }), children);
};

ContentRow.propTypes = propTypes$6;
ContentRow.defaultProps = defaultProps$6;

var _jsxFileName$7 = "/base-cms/packages/nextjs-web/src/components/content/Elements/ShortName.jsx";
var propTypes$7 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$7 = {
  collapsible: true,
  content: {},
  tag: 'h5'
};

var ContentShortName = function ContentShortName(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
    asHTML: true,
    path: "shortName",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 20
    },
    __self: this
  }));
};

ContentShortName.displayName = 'Content/Elements/ShortName';
ContentShortName.propTypes = propTypes$7;
ContentShortName.defaultProps = defaultProps$7;

var _jsxFileName$8 = "/base-cms/packages/nextjs-web/src/components/content/Elements/Source.jsx";
var propTypes$8 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$8 = {
  collapsible: true,
  content: {},
  tag: 'span'
};

var ContentSource = function ContentSource(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "source",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 20
    },
    __self: this
  }));
};

ContentSource.displayName = 'Content/Elements/Source';
ContentSource.propTypes = propTypes$8;
ContentSource.defaultProps = defaultProps$8;

var _jsxFileName$9 = "/base-cms/packages/nextjs-web/src/components/content/Elements/Teaser.jsx";
var propTypes$9 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    teaser: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$9 = {
  collapsible: true,
  content: {},
  tag: 'div'
};

var ContentTeaser = function ContentTeaser(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
    asHTML: true,
    path: "teaser",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$9,
      lineNumber: 20
    },
    __self: this
  }));
};

ContentTeaser.displayName = 'Content/Elements/Teaser';
ContentTeaser.propTypes = propTypes$9;
ContentTeaser.defaultProps = defaultProps$9;

var _jsxFileName$a = "/base-cms/packages/nextjs-web/src/components/content/Elements/Type.jsx";
var propTypes$a = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    type: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$a = {
  children: undefined,
  collapsible: true,
  content: {},
  tag: 'span'
};

var ContentType = function ContentType(_ref) {
  var content = _ref.content,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["content", "children"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "type",
    obj: content
  }, rest, {
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 23
    },
    __self: this
  }), function (value) {
    var titleized = titleizeType(value);
    if (isFn(children)) return children(titleized);
    return titleized;
  });
};

ContentType.displayName = 'Content/Elements/Type';
ContentType.propTypes = propTypes$a;
ContentType.defaultProps = defaultProps$a;

var _jsxFileName$b = "/base-cms/packages/nextjs-web/src/components/content/Links/ContactFullNames.jsx";
var propTypes$b = {
  children: PropTypes.func,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.oneOf(['authors', 'contributors', 'photographers']).isRequired,
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$b = {
  children: undefined,
  className: null,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div'
};

var ContactFullNameLinks = function ContactFullNameLinks(_ref) {
  var children = _ref.children,
      className = _ref.className,
      collapsible = _ref.collapsible,
      content = _ref.content,
      path = _ref.path,
      prefix = _ref.prefix,
      elementAttrs = _ref.elementAttrs,
      linkAttrs = _ref.linkAttrs,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "className", "collapsible", "content", "path", "prefix", "elementAttrs", "linkAttrs", "tag"]);

  var edgesPath = "".concat(path, ".edges");
  var edges = _getAsArray(content, edgesPath);
  if (collapsible && !edges.length) return null;
  return React.createElement(Tag, _extends({
    className: classNames(modelClassNames('content', edgesPath), className)
  }, attrs, {
    __source: {
      fileName: _jsxFileName$b,
      lineNumber: 46
    },
    __self: this
  }), edges.map(function (edge, index) {
    var key = get(edge, 'node.id');
    var canonicalPath = get(edge, 'node.canonicalPath');
    if (collapsible && !canonicalPath) return null;
    return React.createElement(Fragment, {
      key: key,
      __source: {
        fileName: _jsxFileName$b,
        lineNumber: 52
      },
      __self: this
    }, prefix && index === 0 && "".concat(prefix), React.createElement(ObjectValue$1, _extends({
      path: "node.fullName",
      obj: edge,
      collapsible: collapsible
    }, elementAttrs, {
      __source: {
        fileName: _jsxFileName$b,
        lineNumber: 54
      },
      __self: this
    }), function (fullName) {
      return React.createElement(ContentLink, _extends({
        canonicalPath: canonicalPath,
        value: fullName
      }, linkAttrs, {
        __source: {
          fileName: _jsxFileName$b,
          lineNumber: 56
        },
        __self: this
      }), children);
    }));
  }));
};

ContactFullNameLinks.displayName = 'Content/Links/ContactFullNames';
ContactFullNameLinks.propTypes = propTypes$b;
ContactFullNameLinks.defaultProps = defaultProps$b;

var _jsxFileName$c = "/base-cms/packages/nextjs-web/src/components/content/Links/AuthorFullNames.jsx";
var propTypes$c = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$c = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div'
};

var AuthorFullNameLinks = function AuthorFullNameLinks(props) {
  return React.createElement(ContactFullNameLinks, _extends({
    path: "authors"
  }, props, {
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 24
    },
    __self: this
  }));
};

AuthorFullNameLinks.displayName = 'Content/Links/AuthorFullNames';
AuthorFullNameLinks.propTypes = propTypes$c;
AuthorFullNameLinks.defaultProps = defaultProps$c;

var _jsxFileName$d = "/base-cms/packages/nextjs-web/src/components/content/Links/CompanyName.jsx";
var propTypes$d = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$d = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  prefix: null,
  tag: 'span'
};

var CompanyNameLink = function CompanyNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      prefix = _ref.prefix,
      attrs = _objectWithoutProperties(_ref, ["children", "content", "linkAttrs", "prefix"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "company.name",
    obj: content
  }, attrs, {
    __source: {
      fileName: _jsxFileName$d,
      lineNumber: 35
    },
    __self: this
  }), function (value) {
    var canonicalPath = get(content, 'company.canonicalPath');
    if (!canonicalPath) return null;
    return React.createElement(React.Fragment, null, prefix && "".concat(prefix), React.createElement(ContentLink, _extends({
      canonicalPath: canonicalPath,
      value: value
    }, linkAttrs, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 42
      },
      __self: this
    }), children));
  });
};

CompanyNameLink.displayName = 'Content/Links/CompanyName';
CompanyNameLink.propTypes = propTypes$d;
CompanyNameLink.defaultProps = defaultProps$d;

var _jsxFileName$e = "/base-cms/packages/nextjs-web/src/components/content/Links/ContributorFullNames.jsx";
var propTypes$e = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$e = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div'
};

var ContributorFullNameLinks = function ContributorFullNameLinks(props) {
  return React.createElement(ContactFullNameLinks, _extends({
    path: "contributors"
  }, props, {
    __source: {
      fileName: _jsxFileName$e,
      lineNumber: 24
    },
    __self: this
  }));
};

ContributorFullNameLinks.displayName = 'Content/Links/ContributorFullNames';
ContributorFullNameLinks.propTypes = propTypes$e;
ContributorFullNameLinks.defaultProps = defaultProps$e;

var _jsxFileName$f = "/base-cms/packages/nextjs-web/src/components/content/Links/PrimaryImage.jsx";
var propTypes$f = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  linkAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$f = {
  collapsible: true,
  content: {},
  linkAttrs: {}
};

var PrimaryImageLink = function PrimaryImageLink(_ref) {
  var collapsible = _ref.collapsible,
      content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      attrs = _objectWithoutProperties(_ref, ["collapsible", "content", "linkAttrs"]);

  var canonicalPath = _get(content, 'canonicalPath');
  if (collapsible && !canonicalPath) return null;
  return React.createElement(PrimaryImage, _extends({
    content: content,
    collapsible: collapsible
  }, attrs, {
    __source: {
      fileName: _jsxFileName$f,
      lineNumber: 34
    },
    __self: this
  }), function (image) {
    return React.createElement(ContentLink, _extends({
      canonicalPath: canonicalPath,
      collapsible: false
    }, linkAttrs, {
      __source: {
        fileName: _jsxFileName$f,
        lineNumber: 36
      },
      __self: this
    }), function () {
      return image;
    });
  });
};

PrimaryImageLink.displayName = 'Content/Links/PrimaryImage';
PrimaryImageLink.propTypes = propTypes$f;
PrimaryImageLink.defaultProps = defaultProps$f;

var _jsxFileName$g = "/base-cms/packages/nextjs-web/src/components/content/Links/PrimarySectionName.jsx";
var propTypes$g = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    })
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$g = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  prefix: null,
  tag: 'span'
};

var PrimarySectionNameLink = function PrimarySectionNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      prefix = _ref.prefix,
      linkAttrs = _ref.linkAttrs,
      attrs = _objectWithoutProperties(_ref, ["children", "content", "prefix", "linkAttrs"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "primarySection.name",
    obj: content
  }, attrs, {
    __source: {
      fileName: _jsxFileName$g,
      lineNumber: 38
    },
    __self: this
  }), function (value) {
    var id = get(content, 'primarySection.id');
    var alias = get(content, 'primarySection.alias');
    if (!id || !alias) return null;
    return React.createElement(Link, _extends({
      id: id,
      alias: alias,
      value: value
    }, linkAttrs, {
      __source: {
        fileName: _jsxFileName$g,
        lineNumber: 44
      },
      __self: this
    }), children);
  });
};

PrimarySectionNameLink.propTypes = 'Content/Links/PrimarySectionName';
PrimarySectionNameLink.propTypes = propTypes$g;
PrimarySectionNameLink.defaultProps = defaultProps$g;

var _jsxFileName$h = "/base-cms/packages/nextjs-web/src/components/content/Links/ShortName.jsx";
var propTypes$h = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$h = {
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'h5'
};

var ShortNameLink = function ShortNameLink(_ref) {
  var content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "linkAttrs"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "shortName",
    obj: content
  }, attrs, {
    __source: {
      fileName: _jsxFileName$h,
      lineNumber: 25
    },
    __self: this
  }), function (value) {
    var canonicalPath = get(content, 'canonicalPath');
    if (!canonicalPath) return null;
    return React.createElement(ContentLink, _extends({
      asHTML: true,
      canonicalPath: canonicalPath,
      value: value
    }, linkAttrs, {
      __source: {
        fileName: _jsxFileName$h,
        lineNumber: 29
      },
      __self: this
    }));
  });
};

ShortNameLink.displayName = 'Content/Links/ShortName';
ShortNameLink.propTypes = propTypes$h;
ShortNameLink.defaultProps = defaultProps$h;

export { ContentLink as Link, ContentWrapper as Wrapper, ContentBody as Body, ContentName as Name, ObjectValue$1 as ObjectValue, PrimaryImage, ContentPublishedDate as PublishedDate, ContentRow as Row, ContentShortName as ShortName, ContentSource as Source, ContentTeaser as Teaser, ContentType as Type, AuthorFullNameLinks, CompanyNameLink, ContactFullNameLinks, ContributorFullNameLinks, PrimaryImageLink, PrimarySectionNameLink, ShortNameLink };
