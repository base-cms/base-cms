import { a as _objectWithoutProperties, b as _extends } from './chunk-061f2db9.js';
import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryImageLink, ShortNameLink, CompanyNameLink, Teaser, Row, PrimarySectionNameLink, PublishedDate, AuthorFullNameLinks } from '@base-cms/nextjs-web/components/content';
import classNames from 'classnames';
import { CardBody, ListGroupItem, ListGroup } from './core.js';
import 'next/router';
import '@base-cms/nextjs-web/components/core';
import { get, asArray } from '@base-cms/nextjs-web/utils';

var _jsxFileName = "/base-cms/packages/nextjs-web-bootstrap/src/content/CardImage.jsx";
var propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  linkClassName: PropTypes.string,
  withBody: PropTypes.bool
};
var defaultProps = {
  className: null,
  content: {},
  linkClassName: null,
  withBody: false
};

var ContentCardImage = function ContentCardImage(_ref) {
  var className = _ref.className,
      content = _ref.content,
      linkClassName = _ref.linkClassName,
      withBody = _ref.withBody,
      rest = _objectWithoutProperties(_ref, ["className", "content", "linkClassName", "withBody"]);

  var imgAttrs = {
    className: classNames(withBody ? 'card-img' : 'card-img-top', 'img-fluid embed-responsive-item', className)
  };
  var linkAttrs = {
    className: classNames('embed-responsive', 'embed-responsive-16by9', linkClassName)
  };
  return React.createElement(PrimaryImageLink, _extends({
    content: content,
    linkAttrs: linkAttrs,
    imgAttrs: imgAttrs
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }));
};

ContentCardImage.displayName = 'Content/CardImage';
ContentCardImage.propTypes = propTypes;
ContentCardImage.defaultProps = defaultProps;

var wrapperAttrs = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      modifier = _ref.modifier,
      content = _ref.content,
      className = _ref.className;

  var id = get(content, 'id');
  var type = get(content, 'type');
  return {
    'data-id': id,
    className: classNames('content', "content--".concat(modifier), "content--".concat(type), className)
  };
});

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":322}};
    doc.loc.source = {"body":"fragment ContentCardBodyStyleA on Content {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$1 = "/base-cms/packages/nextjs-web-bootstrap/src/content/CardBody/StyleA.jsx";
var propTypes$1 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    teaser: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$1 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleA = function CardBodyStyleA(_ref) {
  var content = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React.createElement("div", _extends({}, wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 52
    },
    __self: this
  }), React.createElement(ContentCardImage, _extends({
    content: content
  }, imgAttrs, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 53
    },
    __self: this
  })), React.createElement(CardBody, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 54
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    tag: "h4",
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 55
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 56
    },
    __self: this
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text",
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 57
    },
    __self: this
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text",
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 58
    },
    __self: this
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2",
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 59
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 60
    },
    __self: this
  }))));
};

CardBodyStyleA.displayName = 'Content/CardBody/StyleA';
CardBodyStyleA.propTypes = propTypes$1;
CardBodyStyleA.defaultProps = defaultProps$1;
CardBodyStyleA.fragments = {
  content: doc
};

var doc$1 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleB"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":313}};
    doc$1.loc.source = {"body":"fragment ContentCardBodyStyleB on Content {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$2 = "/base-cms/packages/nextjs-web-bootstrap/src/content/CardBody/StyleB.jsx";
var propTypes$2 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$2 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleB = function CardBodyStyleB(_ref) {
  var content = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React.createElement("div", _extends({}, wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 50
    },
    __self: this
  }), React.createElement(ContentCardImage, _extends({
    content: content
  }, imgAttrs, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 51
    },
    __self: this
  })), React.createElement(CardBody, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 52
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    tag: "h4",
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 53
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 54
    },
    __self: this
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text",
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 55
    },
    __self: this
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2",
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 56
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 57
    },
    __self: this
  }))));
};

CardBodyStyleB.displayName = 'Content/CardBody/StyleB';
CardBodyStyleB.propTypes = propTypes$2;
CardBodyStyleB.defaultProps = defaultProps$2;
CardBodyStyleB.fragments = {
  content: doc$1
};

var doc$2 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleC"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":202}};
    doc$2.loc.source = {"body":"fragment ContentCardBodyStyleC on Content {\n  id\n  type\n  shortName\n  canonicalPath\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$3 = "/base-cms/packages/nextjs-web-bootstrap/src/content/CardBody/StyleC.jsx";
var propTypes$3 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$3 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleC = function CardBodyStyleC(_ref) {
  var content = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React.createElement("div", _extends({}, wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 35
    },
    __self: this
  }), React.createElement(ContentCardImage, _extends({
    content: content
  }, imgAttrs, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 36
    },
    __self: this
  })), React.createElement(CardBody, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 37
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    tag: "h5",
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 38
    },
    __self: this
  })));
};

CardBodyStyleC.displayName = 'Content/CardBody/StyleC';
CardBodyStyleC.propTypes = propTypes$3;
CardBodyStyleC.defaultProps = defaultProps$3;
CardBodyStyleC.fragments = {
  content: doc$2
};

var doc$3 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleD"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":322}};
    doc$3.loc.source = {"body":"fragment ContentCardBodyStyleD on Content {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$4 = "/base-cms/packages/nextjs-web-bootstrap/src/content/CardBody/StyleD.jsx";
var propTypes$4 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    teaser: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$4 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleD = function CardBodyStyleD(_ref) {
  var content = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React.createElement("div", _extends({}, wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 52
    },
    __self: this
  }), React.createElement(ContentCardImage, _extends({
    withBody: true,
    content: content
  }, imgAttrs, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 53
    },
    __self: this
  })), React.createElement(CardBody, _extends({
    overImage: true
  }, attrs, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 54
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    tag: "h4",
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 55
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 56
    },
    __self: this
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text",
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 57
    },
    __self: this
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text",
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 58
    },
    __self: this
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2",
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 59
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 60
    },
    __self: this
  }))));
};

CardBodyStyleD.displayName = 'Content/CardBody/StyleD';
CardBodyStyleD.propTypes = propTypes$4;
CardBodyStyleD.defaultProps = defaultProps$4;
CardBodyStyleD.fragments = {
  content: doc$3
};

var doc$4 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleE"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Authorable"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fullName"},"arguments":[],"directives":[]}]}}]}}]}}]}}]}}],"loc":{"start":0,"end":471}};
    doc$4.loc.source = {"body":"fragment ContentCardBodyStyleE on Content {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n  ... on Authorable {\n    authors {\n      edges {\n        node {\n          id\n          canonicalPath\n          fullName\n        }\n      }\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$5 = "/base-cms/packages/nextjs-web-bootstrap/src/content/CardBody/StyleE.jsx";
var propTypes$5 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    teaser: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    authors: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.number,
          fullName: PropTypes.string,
          canonicalPath: PropTypes.string
        })
      }))
    }),
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$5 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleE = function CardBodyStyleE(_ref) {
  var content = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React.createElement("div", _extends({}, wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 62
    },
    __self: this
  }), React.createElement(ContentCardImage, _extends({
    withBody: true,
    content: content
  }, imgAttrs, {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 63
    },
    __self: this
  })), React.createElement(CardBody, _extends({
    overImage: true
  }, attrs, {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 64
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    tag: "h4",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 65
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 66
    },
    __self: this
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 67
    },
    __self: this
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 68
    },
    __self: this
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 69
    },
    __self: this
  }), React.createElement(AuthorFullNameLinks, {
    content: content,
    className: "mr-2 d-inline-block",
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 70
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 71
    },
    __self: this
  }))));
};

CardBodyStyleE.displayName = 'Content/CardBody/StyleE';
CardBodyStyleE.propTypes = propTypes$5;
CardBodyStyleE.defaultProps = defaultProps$5;
CardBodyStyleE.fragments = {
  content: doc$4
};

var _jsxFileName$6 = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/Item/StyleA.jsx";
var propTypes$6 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    })
  })
};
var defaultProps$6 = {
  content: {}
};

var ListGroupItemStyleA = function ListGroupItemStyleA(_ref) {
  var content = _ref.content;
  return React.createElement(ListGroupItem, _extends({}, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 38
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1",
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 39
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 40
    },
    __self: this
  }), React.createElement(Row, {
    tag: "small",
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 41
    },
    __self: this
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2",
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 42
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 43
    },
    __self: this
  })));
};

ListGroupItemStyleA.displayName = 'Content/ListGroup/Item/StyleA';
ListGroupItemStyleA.propTypes = propTypes$6;
ListGroupItemStyleA.defaultProps = defaultProps$6;

var doc$5 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":198}};
    doc$5.loc.source = {"body":"fragment ContentListGroupStyleA on Content {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$7 = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/StyleA.jsx";
var propTypes$7 = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$7 = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleA = function ListGroupStyleA(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = _objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = asArray(nodes);
  return items.length ? React.createElement(ListGroup, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 28
    },
    __self: this
  }), items.map(function (content) {
    return React.createElement(ListGroupItemStyleA, _extends({
      key: content.id,
      content: content
    }, itemAttrs, {
      __source: {
        fileName: _jsxFileName$7,
        lineNumber: 30
      },
      __self: this
    }));
  })) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes$7;
ListGroupStyleA.defaultProps = defaultProps$7;
ListGroupStyleA.fragments = {
  content: doc$5
};

var _jsxFileName$8 = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/Item/StyleB.jsx";
var propTypes$8 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  })
};
var defaultProps$8 = {
  content: {}
};

var ListGroupItemStyleB = function ListGroupItemStyleB(_ref) {
  var content = _ref.content;
  return React.createElement(ListGroupItem, _extends({}, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 42
    },
    __self: this
  }), React.createElement("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 44
    },
    __self: this
  }, React.createElement("div", {
    className: "col-4 pr-0",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 45
    },
    __self: this
  }, React.createElement(PrimaryImageLink, {
    content: content,
    imgAttrs: {
      className: 'img-fluid'
    },
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 46
    },
    __self: this
  })), React.createElement("div", {
    className: "col-8",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 48
    },
    __self: this
  }, React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 49
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 50
    },
    __self: this
  }), React.createElement(PrimarySectionNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 51
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    tag: "small",
    className: "d-block",
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 52
    },
    __self: this
  }))));
};

ListGroupItemStyleB.displayName = 'Content/ListGroup/Item/StyleB';
ListGroupItemStyleB.propTypes = propTypes$8;
ListGroupItemStyleB.defaultProps = defaultProps$8;

var doc$6 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleB"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":314}};
    doc$6.loc.source = {"body":"fragment ContentListGroupStyleB on Content {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$9 = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/StyleB.jsx";
var propTypes$9 = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$9 = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleB = function ListGroupStyleB(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = _objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = asArray(nodes);
  return items.length ? React.createElement(ListGroup, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$9,
      lineNumber: 28
    },
    __self: this
  }), items.map(function (content) {
    return React.createElement(ListGroupItemStyleB, _extends({
      key: content.id,
      content: content
    }, itemAttrs, {
      __source: {
        fileName: _jsxFileName$9,
        lineNumber: 30
      },
      __self: this
    }));
  })) : null;
};

ListGroupStyleB.displayName = 'Content/ListGroup/StyleB';
ListGroupStyleB.propTypes = propTypes$9;
ListGroupStyleB.defaultProps = defaultProps$9;
ListGroupStyleB.fragments = {
  content: doc$6
};

var _jsxFileName$a = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/Item/StyleC.jsx";
var propTypes$a = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    teaser: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  })
};
var defaultProps$a = {
  content: {}
};

var ListGroupItemStyleC = function ListGroupItemStyleC(_ref) {
  var content = _ref.content;
  return React.createElement(ListGroupItem, _extends({}, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 44
    },
    __self: this
  }), React.createElement("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 46
    },
    __self: this
  }, React.createElement("div", {
    className: "col-4 pr-0",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 47
    },
    __self: this
  }, React.createElement(PrimaryImageLink, {
    content: content,
    imgAttrs: {
      className: 'img-fluid'
    },
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 48
    },
    __self: this
  })), React.createElement("div", {
    className: "col-8",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 50
    },
    __self: this
  }, React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 51
    },
    __self: this
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From ",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 52
    },
    __self: this
  }), React.createElement(Teaser, {
    content: content,
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 53
    },
    __self: this
  }), React.createElement(PrimarySectionNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 54
    },
    __self: this
  }), React.createElement(PublishedDate, {
    content: content,
    tag: "small",
    className: "d-block",
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 55
    },
    __self: this
  }))));
};

ListGroupItemStyleC.displayName = 'Content/ListGroup/Item/StyleC';
ListGroupItemStyleC.propTypes = propTypes$a;
ListGroupItemStyleC.defaultProps = defaultProps$a;

var doc$7 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleC"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":323}};
    doc$7.loc.source = {"body":"fragment ContentListGroupStyleC on Content {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  company {\n    id\n    name\n    canonicalPath\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$b = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/StyleC.jsx";
var propTypes$b = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$b = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleC = function ListGroupStyleC(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = _objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = asArray(nodes);
  return items.length ? React.createElement(ListGroup, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$b,
      lineNumber: 28
    },
    __self: this
  }), items.map(function (content) {
    return React.createElement(ListGroupItemStyleC, _extends({
      key: content.id,
      content: content
    }, itemAttrs, {
      __source: {
        fileName: _jsxFileName$b,
        lineNumber: 30
      },
      __self: this
    }));
  })) : null;
};

ListGroupStyleC.displayName = 'Content/ListGroup/StyleC';
ListGroupStyleC.propTypes = propTypes$b;
ListGroupStyleC.defaultProps = defaultProps$b;
ListGroupStyleC.fragments = {
  content: doc$7
};

var _jsxFileName$c = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/Item/StyleD.jsx";
var propTypes$c = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    })
  })
};
var defaultProps$c = {
  content: {}
};

var ListGroupItemStyleD = function ListGroupItemStyleD(_ref) {
  var content = _ref.content;
  return React.createElement(ListGroupItem, _extends({}, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), {
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 29
    },
    __self: this
  }), React.createElement(PrimarySectionNameLink, {
    content: content,
    tag: "small",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 30
    },
    __self: this
  }), React.createElement(ShortNameLink, {
    content: content,
    className: "mb-0",
    __source: {
      fileName: _jsxFileName$c,
      lineNumber: 31
    },
    __self: this
  }));
};

ListGroupItemStyleD.displayName = 'Content/ListGroup/Item/StyleD';
ListGroupItemStyleD.propTypes = propTypes$c;
ListGroupItemStyleD.defaultProps = defaultProps$c;

var doc$8 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleD"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":136}};
    doc$8.loc.source = {"body":"fragment ContentListGroupStyleD on Content {\n  id\n  type\n  shortName\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$d = "/base-cms/packages/nextjs-web-bootstrap/src/content/ListGroup/StyleD.jsx";
var propTypes$d = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$d = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleD = function ListGroupStyleD(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = _objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = asArray(nodes);
  return items.length ? React.createElement(ListGroup, _extends({}, attrs, {
    __source: {
      fileName: _jsxFileName$d,
      lineNumber: 28
    },
    __self: this
  }), items.map(function (content) {
    return React.createElement(ListGroupItemStyleD, _extends({
      key: content.id,
      content: content
    }, itemAttrs, {
      __source: {
        fileName: _jsxFileName$d,
        lineNumber: 30
      },
      __self: this
    }));
  })) : null;
};

ListGroupStyleD.displayName = 'Content/ListGroup/StyleD';
ListGroupStyleD.propTypes = propTypes$d;
ListGroupStyleD.defaultProps = defaultProps$d;
ListGroupStyleD.fragments = {
  content: doc$8
};

export { CardBodyStyleA as CardBodyA, CardBodyStyleB as CardBodyB, CardBodyStyleC as CardBodyC, CardBodyStyleD as CardBodyD, CardBodyStyleE as CardBodyE, ContentCardImage as CardImage, ListGroupStyleA as ListGroupA, ListGroupStyleB as ListGroupB, ListGroupStyleC as ListGroupC, ListGroupStyleD as ListGroupD };
