import { a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PrimaryImageLink, CompanyNameLink, PrimarySectionNameLink, PublishedDate, Row, ShortNameLink, Teaser, AuthorFullNameLinks } from '@base-cms/website-nextjs/components/content';
import { get, asArray } from '@base-cms/website-nextjs/utils';
import { CardBody, ListGroupItem, ListGroup } from './core.js';
import 'next/router';
import '@base-cms/website-nextjs/components/core';
import '@base-cms/website-nextjs/config';

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
  }, rest));
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

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":378}};
    doc.loc.source = {"body":"fragment ContentCardBodyStyleA on PlatformContent {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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

  return React.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), React.createElement(ContentCardImage, _extends({
    content: content
  }, imgAttrs)), React.createElement(CardBody, attrs, React.createElement(ShortNameLink, {
    content: content,
    tag: "h4"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text"
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(PublishedDate, {
    content: content
  }))));
};

CardBodyStyleA.displayName = 'Content/CardBody/StyleA';
CardBodyStyleA.propTypes = propTypes$1;
CardBodyStyleA.defaultProps = defaultProps$1;
CardBodyStyleA.fragments = {
  content: doc
};

var doc$1 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleB"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":369}};
    doc$1.loc.source = {"body":"fragment ContentCardBodyStyleB on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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

  return React.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), React.createElement(ContentCardImage, _extends({
    content: content
  }, imgAttrs)), React.createElement(CardBody, attrs, React.createElement(ShortNameLink, {
    content: content,
    tag: "h4"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(PublishedDate, {
    content: content
  }))));
};

CardBodyStyleB.displayName = 'Content/CardBody/StyleB';
CardBodyStyleB.propTypes = propTypes$2;
CardBodyStyleB.defaultProps = defaultProps$2;
CardBodyStyleB.fragments = {
  content: doc$1
};

var doc$2 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleC"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":210}};
    doc$2.loc.source = {"body":"fragment ContentCardBodyStyleC on PlatformContent {\n  id\n  type\n  shortName\n  canonicalPath\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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

  return React.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), React.createElement(ContentCardImage, _extends({
    content: content
  }, imgAttrs)), React.createElement(CardBody, attrs, React.createElement(ShortNameLink, {
    content: content,
    tag: "h5"
  })));
};

CardBodyStyleC.displayName = 'Content/CardBody/StyleC';
CardBodyStyleC.propTypes = propTypes$3;
CardBodyStyleC.defaultProps = defaultProps$3;
CardBodyStyleC.fragments = {
  content: doc$2
};

var doc$3 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleD"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":378}};
    doc$3.loc.source = {"body":"fragment ContentCardBodyStyleD on PlatformContent {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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

  return React.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), React.createElement(ContentCardImage, _extends({
    withBody: true,
    content: content
  }, imgAttrs)), React.createElement(CardBody, _extends({
    overImage: true
  }, attrs), React.createElement(ShortNameLink, {
    content: content,
    tag: "h4"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text"
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(PublishedDate, {
    content: content
  }))));
};

CardBodyStyleD.displayName = 'Content/CardBody/StyleD';
CardBodyStyleD.propTypes = propTypes$4;
CardBodyStyleD.defaultProps = defaultProps$4;
CardBodyStyleD.fragments = {
  content: doc$3
};

var doc$4 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleE"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentArticle"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"fullName"},"arguments":[],"directives":[]}]}}]}}]}}]}}]}}],"loc":{"start":0,"end":539}};
    doc$4.loc.source = {"body":"fragment ContentCardBodyStyleE on PlatformContent {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n  ... on PlatformContentArticle {\n    authors {\n      edges {\n        node {\n          id\n          canonicalPath\n          fullName\n        }\n      }\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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

  return React.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content
  }), React.createElement(ContentCardImage, _extends({
    withBody: true,
    content: content
  }, imgAttrs)), React.createElement(CardBody, _extends({
    overImage: true
  }, attrs), React.createElement(ShortNameLink, {
    content: content,
    tag: "h4"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text"
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(AuthorFullNameLinks, {
    content: content,
    className: "mr-2 d-inline-block"
  }), React.createElement(PublishedDate, {
    content: content
  }))));
};

CardBodyStyleE.displayName = 'Content/CardBody/StyleE';
CardBodyStyleE.propTypes = propTypes$5;
CardBodyStyleE.defaultProps = defaultProps$5;
CardBodyStyleE.fragments = {
  content: doc$4
};

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
  return React.createElement(ListGroupItem, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From "
  }), React.createElement(Row, {
    tag: "small"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(PublishedDate, {
    content: content
  })));
};

ListGroupItemStyleA.displayName = 'Content/ListGroup/Item/StyleA';
ListGroupItemStyleA.propTypes = propTypes$6;
ListGroupItemStyleA.defaultProps = defaultProps$6;

var doc$5 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":254}};
    doc$5.loc.source = {"body":"fragment ContentListGroupStyleA on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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
  return items.length ? React.createElement(ListGroup, attrs, items.map(function (content) {
    return React.createElement(ListGroupItemStyleA, _extends({
      key: content.id,
      content: content
    }, itemAttrs));
  })) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes$7;
ListGroupStyleA.defaultProps = defaultProps$7;
ListGroupStyleA.fragments = {
  content: doc$5
};

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
  return React.createElement(ListGroupItem, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), React.createElement("div", {
    className: "row"
  }, React.createElement("div", {
    className: "col-4 pr-0"
  }, React.createElement(PrimaryImageLink, {
    content: content,
    imgAttrs: {
      className: 'img-fluid'
    }
  })), React.createElement("div", {
    className: "col-8"
  }, React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From "
  }), React.createElement(PrimarySectionNameLink, {
    content: content,
    tag: "small",
    className: "d-block"
  }), React.createElement(PublishedDate, {
    content: content,
    tag: "small",
    className: "d-block"
  }))));
};

ListGroupItemStyleB.displayName = 'Content/ListGroup/Item/StyleB';
ListGroupItemStyleB.propTypes = propTypes$8;
ListGroupItemStyleB.defaultProps = defaultProps$8;

var doc$6 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleB"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":370}};
    doc$6.loc.source = {"body":"fragment ContentListGroupStyleB on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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
  return items.length ? React.createElement(ListGroup, attrs, items.map(function (content) {
    return React.createElement(ListGroupItemStyleB, _extends({
      key: content.id,
      content: content
    }, itemAttrs));
  })) : null;
};

ListGroupStyleB.displayName = 'Content/ListGroup/StyleB';
ListGroupStyleB.propTypes = propTypes$9;
ListGroupStyleB.defaultProps = defaultProps$9;
ListGroupStyleB.fragments = {
  content: doc$6
};

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
  return React.createElement(ListGroupItem, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), React.createElement("div", {
    className: "row"
  }, React.createElement("div", {
    className: "col-4 pr-0"
  }, React.createElement(PrimaryImageLink, {
    content: content,
    imgAttrs: {
      className: 'img-fluid'
    }
  })), React.createElement("div", {
    className: "col-8"
  }, React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From "
  }), React.createElement(Teaser, {
    content: content
  }), React.createElement(PrimarySectionNameLink, {
    content: content,
    tag: "small",
    className: "d-block"
  }), React.createElement(PublishedDate, {
    content: content,
    tag: "small",
    className: "d-block"
  }))));
};

ListGroupItemStyleC.displayName = 'Content/ListGroup/Item/StyleC';
ListGroupItemStyleC.propTypes = propTypes$a;
ListGroupItemStyleC.defaultProps = defaultProps$a;

var doc$7 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleC"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":379}};
    doc$7.loc.source = {"body":"fragment ContentListGroupStyleC on PlatformContent {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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
  return items.length ? React.createElement(ListGroup, attrs, items.map(function (content) {
    return React.createElement(ListGroupItemStyleC, _extends({
      key: content.id,
      content: content
    }, itemAttrs));
  })) : null;
};

ListGroupStyleC.displayName = 'Content/ListGroup/StyleC';
ListGroupStyleC.propTypes = propTypes$b;
ListGroupStyleC.defaultProps = defaultProps$b;
ListGroupStyleC.fragments = {
  content: doc$7
};

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
  return React.createElement(ListGroupItem, wrapperAttrs({
    modifier: 'list-item',
    content: content
  }), React.createElement(PrimarySectionNameLink, {
    content: content,
    tag: "small"
  }), React.createElement(ShortNameLink, {
    content: content,
    className: "mb-0"
  }));
};

ListGroupItemStyleD.displayName = 'Content/ListGroup/Item/StyleD';
ListGroupItemStyleD.propTypes = propTypes$c;
ListGroupItemStyleD.defaultProps = defaultProps$c;

var doc$8 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupStyleD"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":144}};
    doc$8.loc.source = {"body":"fragment ContentListGroupStyleD on PlatformContent {\n  id\n  type\n  shortName\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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
  return items.length ? React.createElement(ListGroup, attrs, items.map(function (content) {
    return React.createElement(ListGroupItemStyleD, _extends({
      key: content.id,
      content: content
    }, itemAttrs));
  })) : null;
};

ListGroupStyleD.displayName = 'Content/ListGroup/StyleD';
ListGroupStyleD.propTypes = propTypes$d;
ListGroupStyleD.defaultProps = defaultProps$d;
ListGroupStyleD.fragments = {
  content: doc$8
};

export { CardBodyStyleA as CardBodyA, CardBodyStyleB as CardBodyB, CardBodyStyleC as CardBodyC, CardBodyStyleD as CardBodyD, CardBodyStyleE as CardBodyE, ContentCardImage as CardImage, ListGroupStyleA as ListGroupA, ListGroupStyleB as ListGroupB, ListGroupStyleC as ListGroupC, ListGroupStyleD as ListGroupD };
