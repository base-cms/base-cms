import { a as _extends, c as _objectSpread, b as _objectWithoutProperties, j as _taggedTemplateLiteral } from './chunk-cfc9ba70.js';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { WebsiteScheduledContent } from '@base-cms/website-nextjs/queries';
import { isFunction, asArray } from '@base-cms/website-nextjs/utils';
import { Card } from './core.js';
import { CardBodyA, CardBodyC, ListGroupC, ListGroupA, CardBodyD, CardBodyE, ListGroupD, CardBodyB, ListGroupB } from './content.js';
import gql from 'graphql-tag';
import 'classnames';
import 'next/router';
import '@base-cms/website-nextjs/components/core';
import '@base-cms/website-nextjs/config';
import '@base-cms/website-nextjs/components/content';

var fragment = CardBodyA.fragments.content;
var propTypes = {
  interstitial: PropTypes.func,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps = {
  interstitial: function interstitial(v) {
    return v;
  },
  query: {}
};

var BlockCardDeckA = function BlockCardDeckA(_ref) {
  var query = _ref.query,
      interstitial = _ref.interstitial,
      attrs = _objectWithoutProperties(_ref, ["query", "interstitial"]);

  var props = _objectSpread({}, query, {
    fragment: fragment
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var nodes = asArray(items);
    var renderInter = isFunction(interstitial) ? interstitial : defaultProps.interstitial;
    return React.createElement("div", _extends({
      className: "row"
    }, attrs), nodes.map(function (content, index) {
      return React.createElement(Fragment, {
        key: content.id
      }, React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4"
      }, React.createElement(Card, {
        className: "h-100"
      }, React.createElement(CardBodyA, {
        content: content
      }))), index === 3 && React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center"
      }, renderInter()));
    }));
  });
};

BlockCardDeckA.displayName = 'WebsiteScheduledContent/Blocks/CardDeckA';
BlockCardDeckA.propTypes = propTypes;
BlockCardDeckA.defaultProps = defaultProps;

var fragment$1 = CardBodyC.fragments.content;
var propTypes$1 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$1 = {
  query: {}
};

var BlockCardDeckB = function BlockCardDeckB(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$1
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var nodes = asArray(items);
    return React.createElement("div", _extends({
      className: "row"
    }, attrs), nodes.map(function (content) {
      return React.createElement(Fragment, {
        key: content.id
      }, React.createElement("div", {
        className: "mb-3 col-12 col-md-6 col-lg-3"
      }, React.createElement(Card, {
        className: "h-100"
      }, React.createElement(CardBodyC, {
        content: content
      }))));
    }));
  });
};

BlockCardDeckB.displayName = 'WebsiteScheduledContent/Blocks/CardDeckB';
BlockCardDeckB.propTypes = propTypes$1;
BlockCardDeckB.defaultProps = defaultProps$1;

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockCardDeckC on PlatformContent {\n    ...ContentListGroupStyleC\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$2 = gql(_templateObject(), CardBodyA.fragments.content, ListGroupC.fragments.content);
var propTypes$2 = {
  ad1: PropTypes.func,
  ad2: PropTypes.func,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$2 = {
  ad1: function ad1(v) {
    return v;
  },
  ad2: function ad2(v) {
    return v;
  },
  query: {}
};

var BlockCardDeckC = function BlockCardDeckC(_ref) {
  var query = _ref.query,
      ad1 = _ref.ad1,
      ad2 = _ref.ad2,
      attrs = _objectWithoutProperties(_ref, ["query", "ad1", "ad2"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$2
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var nodes = asArray(items);
    var set1 = nodes.slice(0, 8) || [];
    var set2 = nodes.slice(8) || [];
    var renderAd1 = isFunction(ad1) ? ad1 : defaultProps$2.ad1;
    var renderAd2 = isFunction(ad2) ? ad2 : defaultProps$2.ad2;
    return React.createElement(Fragment, null, React.createElement("div", _extends({
      className: "row"
    }, attrs), set1.map(function (content, index) {
      return React.createElement(Fragment, {
        key: content.id
      }, React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4"
      }, React.createElement(Card, {
        className: "h-100"
      }, React.createElement(CardBodyA, {
        content: content
      }))), index === 3 && React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center"
      }, renderAd1()));
    })), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-lg-4 mb-3 d-flex justify-content-center align-items-center"
    }, renderAd2()), React.createElement("div", {
      className: "col-lg-8"
    }, React.createElement(Card, null, React.createElement(ListGroupC, {
      flush: true,
      nodes: set2
    })))));
  });
};

BlockCardDeckC.displayName = 'WebsiteScheduledContent/Blocks/CardDeckC';
BlockCardDeckC.propTypes = propTypes$2;
BlockCardDeckC.defaultProps = defaultProps$2;

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleA on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$3 = gql(_templateObject$1(), CardBodyA.fragments.content, ListGroupA.fragments.content);
var propTypes$3 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$3 = {
  query: {}
};

var BlockHeroA = function BlockHeroA(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$3
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React.createElement(Card, null, React.createElement(CardBodyA, _extends({
      content: content
    }, attrs)))), React.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React.createElement(Card, null, React.createElement(ListGroupA, _extends({
      flush: true,
      nodes: nodes
    }, attrs)))));
  });
};

BlockHeroA.displayName = 'WebsiteScheduledContent/Blocks/HeroA';
BlockHeroA.propTypes = propTypes$3;
BlockHeroA.defaultProps = defaultProps$3;

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleB on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleD\n  }\n  ", "\n  ", "\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$4 = gql(_templateObject$2(), CardBodyD.fragments.content, ListGroupA.fragments.content);
var propTypes$4 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$4 = {
  query: {}
};

var BlockHeroB = function BlockHeroB(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$4
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React.createElement(Card, null, React.createElement(CardBodyD, _extends({
      content: content
    }, attrs)))), React.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React.createElement(Card, null, React.createElement(ListGroupA, _extends({
      flush: true,
      nodes: nodes
    }, attrs)))));
  });
};

BlockHeroB.displayName = 'WebsiteScheduledContent/Blocks/HeroB';
BlockHeroB.propTypes = propTypes$4;
BlockHeroB.defaultProps = defaultProps$4;

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleC on PlatformContent {\n    ...ContentListGroupStyleD\n    ...ContentCardBodyStyleE\n  }\n  ", "\n  ", "\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$5 = gql(_templateObject$3(), CardBodyE.fragments.content, ListGroupD.fragments.content);
var propTypes$5 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$5 = {
  query: {}
};

var BlockHeroC = function BlockHeroC(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$5
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React.createElement(Card, null, React.createElement(CardBodyE, _extends({
      content: content
    }, attrs)))), React.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React.createElement(Card, null, React.createElement(ListGroupD, _extends({
      flush: true,
      nodes: nodes
    }, attrs)))));
  });
};

BlockHeroC.displayName = 'WebsiteScheduledContent/Blocks/HeroC';
BlockHeroC.propTypes = propTypes$5;
BlockHeroC.defaultProps = defaultProps$5;

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleD on PlatformContent {\n    ...ContentListGroupStyleD\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$6 = gql(_templateObject$4(), CardBodyA.fragments.content, ListGroupD.fragments.content);
var propTypes$6 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$6 = {
  query: {}
};

var BlockHeroD = function BlockHeroD(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$6
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var set1 = items.slice(0, 2) || [];
    var set2 = items.slice(2) || [];
    return React.createElement("div", _extends({
      className: "row"
    }, attrs), set1.map(function (content) {
      return React.createElement("div", {
        className: "col-4",
        key: content.id
      }, React.createElement(Card, {
        className: "h-100"
      }, React.createElement(CardBodyA, {
        content: content
      })));
    }), React.createElement("div", {
      className: "col-4"
    }, React.createElement(Card, {
      className: "h-100"
    }, React.createElement(ListGroupD, {
      flush: true,
      nodes: set2
    }))));
  });
};

BlockHeroD.displayName = 'WebsiteScheduledContent/Blocks/HeroD';
BlockHeroD.propTypes = propTypes$6;
BlockHeroD.defaultProps = defaultProps$6;

var fragment$7 = ListGroupA.fragments.content;
var propTypes$7 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$7 = {
  query: {}
};

var BlockListGroupA = function BlockListGroupA(_ref) {
  var header = _ref.header,
      query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["header", "query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$7
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    return React.createElement(Card, attrs, header && React.createElement("div", {
      className: "card-header"
    }, header), React.createElement(ListGroupA, {
      flush: true,
      nodes: items
    }));
  });
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes$7;
BlockListGroupA.defaultProps = defaultProps$7;

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockListGroupB on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleB\n  }\n  ", "\n  ", "\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$8 = gql(_templateObject$5(), CardBodyB.fragments.content, ListGroupA.fragments.content);
var propTypes$8 = {
  header: PropTypes.string,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$8 = {
  header: null,
  query: {}
};

var BlockListGroupB = function BlockListGroupB(_ref) {
  var header = _ref.header,
      query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["header", "query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$8
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement(Card, attrs, header && React.createElement("div", {
      className: "card-header"
    }, header), React.createElement(CardBodyB, {
      content: content,
      imgAttrs: {
        className: header ? 'rounded-0' : null
      }
    }), React.createElement(ListGroupA, {
      flush: true,
      nodes: nodes
    }));
  });
};

BlockListGroupB.displayName = 'WebsiteScheduledContent/Blocks/ListGroupB';
BlockListGroupB.propTypes = propTypes$8;
BlockListGroupB.defaultProps = defaultProps$8;

var fragment$9 = ListGroupB.fragments.content;
var propTypes$9 = {
  header: PropTypes.string,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$9 = {
  header: null,
  query: {}
};

var BlockListGroupC = function BlockListGroupC(_ref) {
  var header = _ref.header,
      query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["header", "query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$9
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    return React.createElement(Card, attrs, header && React.createElement("div", {
      className: "card-header"
    }, header), React.createElement(ListGroupB, {
      flush: true,
      nodes: items
    }));
  });
};

BlockListGroupC.displayName = 'WebsiteScheduledContent/Blocks/ListGroupC';
BlockListGroupC.propTypes = propTypes$9;
BlockListGroupC.defaultProps = defaultProps$9;

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockListGroupD on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$a = gql(_templateObject$6(), CardBodyA.fragments.content, ListGroupA.fragments.content);
var propTypes$a = {
  header: PropTypes.string,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$a = {
  header: null,
  query: {}
};

var BlockListGroupD = function BlockListGroupD(_ref) {
  var header = _ref.header,
      query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["header", "query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$a
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement(Card, attrs, header && React.createElement("div", {
      className: "card-header"
    }, header), React.createElement(CardBodyA, {
      content: content,
      imgAttrs: {
        className: header ? 'rounded-0' : null
      }
    }), React.createElement(ListGroupA, {
      flush: true,
      nodes: nodes
    }));
  });
};

BlockListGroupD.displayName = 'WebsiteScheduledContent/Blocks/ListGroupD';
BlockListGroupD.propTypes = propTypes$a;
BlockListGroupD.defaultProps = defaultProps$a;

export { BlockCardDeckA, BlockCardDeckB, BlockCardDeckC, BlockHeroA, BlockHeroB, BlockHeroC, BlockHeroD, BlockListGroupA, BlockListGroupB, BlockListGroupC, BlockListGroupD };
