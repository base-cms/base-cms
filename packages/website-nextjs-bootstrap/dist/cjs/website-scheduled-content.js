'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var queries = require('@base-cms/website-nextjs/queries');
var utils = require('@base-cms/website-nextjs/utils');
var core = require('./core.js');
var content = require('./content.js');
var gql = _interopDefault(require('graphql-tag'));
require('classnames');
require('next/router');
require('@base-cms/website-nextjs/components/core');
require('@base-cms/website-nextjs/config');
require('@base-cms/website-nextjs/components/content');

var fragment = content.CardBodyA.fragments.content;
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query", "interstitial"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var nodes = utils.asArray(items);
    var renderInter = utils.isFunction(interstitial) ? interstitial : defaultProps.interstitial;
    return React__default.createElement("div", __chunk_1._extends({
      className: "row"
    }, attrs), nodes.map(function (content$$1, index) {
      return React__default.createElement(React.Fragment, {
        key: content$$1.id
      }, React__default.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4"
      }, React__default.createElement(core.Card, {
        className: "h-100"
      }, React__default.createElement(content.CardBodyA, {
        content: content$$1
      }))), index === 3 && React__default.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center"
      }, renderInter()));
    }));
  });
};

BlockCardDeckA.displayName = 'WebsiteScheduledContent/Blocks/CardDeckA';
BlockCardDeckA.propTypes = propTypes;
BlockCardDeckA.defaultProps = defaultProps;

var fragment$1 = content.CardBodyC.fragments.content;
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$1
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var nodes = utils.asArray(items);
    return React__default.createElement("div", __chunk_1._extends({
      className: "row"
    }, attrs), nodes.map(function (content$$1) {
      return React__default.createElement(React.Fragment, {
        key: content$$1.id
      }, React__default.createElement("div", {
        className: "mb-3 col-12 col-md-6 col-lg-3"
      }, React__default.createElement(core.Card, {
        className: "h-100"
      }, React__default.createElement(content.CardBodyC, {
        content: content$$1
      }))));
    }));
  });
};

BlockCardDeckB.displayName = 'WebsiteScheduledContent/Blocks/CardDeckB';
BlockCardDeckB.propTypes = propTypes$1;
BlockCardDeckB.defaultProps = defaultProps$1;

function _templateObject() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockCardDeckC on PlatformContent {\n    ...ContentListGroupStyleC\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$2 = gql(_templateObject(), content.CardBodyA.fragments.content, content.ListGroupC.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query", "ad1", "ad2"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$2
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var nodes = utils.asArray(items);
    var set1 = nodes.slice(0, 8) || [];
    var set2 = nodes.slice(8) || [];
    var renderAd1 = utils.isFunction(ad1) ? ad1 : defaultProps$2.ad1;
    var renderAd2 = utils.isFunction(ad2) ? ad2 : defaultProps$2.ad2;
    return React__default.createElement(React.Fragment, null, React__default.createElement("div", __chunk_1._extends({
      className: "row"
    }, attrs), set1.map(function (content$$1, index) {
      return React__default.createElement(React.Fragment, {
        key: content$$1.id
      }, React__default.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4"
      }, React__default.createElement(core.Card, {
        className: "h-100"
      }, React__default.createElement(content.CardBodyA, {
        content: content$$1
      }))), index === 3 && React__default.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center"
      }, renderAd1()));
    })), React__default.createElement("div", {
      className: "row"
    }, React__default.createElement("div", {
      className: "col-lg-4 mb-3 d-flex justify-content-center align-items-center"
    }, renderAd2()), React__default.createElement("div", {
      className: "col-lg-8"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.ListGroupC, {
      flush: true,
      nodes: set2
    })))));
  });
};

BlockCardDeckC.displayName = 'WebsiteScheduledContent/Blocks/CardDeckC';
BlockCardDeckC.propTypes = propTypes$2;
BlockCardDeckC.defaultProps = defaultProps$2;

function _templateObject$1() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleA on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$3 = gql(_templateObject$1(), content.CardBodyA.fragments.content, content.ListGroupA.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$3
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var content$$1 = items[0] || {};
    var nodes = items.slice(1) || [];
    return React__default.createElement("div", {
      className: "row"
    }, React__default.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.CardBodyA, __chunk_1._extends({
      content: content$$1
    }, attrs)))), React__default.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.ListGroupA, __chunk_1._extends({
      flush: true,
      nodes: nodes
    }, attrs)))));
  });
};

BlockHeroA.displayName = 'WebsiteScheduledContent/Blocks/HeroA';
BlockHeroA.propTypes = propTypes$3;
BlockHeroA.defaultProps = defaultProps$3;

function _templateObject$2() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleB on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleD\n  }\n  ", "\n  ", "\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$4 = gql(_templateObject$2(), content.CardBodyD.fragments.content, content.ListGroupA.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$4
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var content$$1 = items[0] || {};
    var nodes = items.slice(1) || [];
    return React__default.createElement("div", {
      className: "row"
    }, React__default.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.CardBodyD, __chunk_1._extends({
      content: content$$1
    }, attrs)))), React__default.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.ListGroupA, __chunk_1._extends({
      flush: true,
      nodes: nodes
    }, attrs)))));
  });
};

BlockHeroB.displayName = 'WebsiteScheduledContent/Blocks/HeroB';
BlockHeroB.propTypes = propTypes$4;
BlockHeroB.defaultProps = defaultProps$4;

function _templateObject$3() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleC on PlatformContent {\n    ...ContentListGroupStyleD\n    ...ContentCardBodyStyleE\n  }\n  ", "\n  ", "\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$5 = gql(_templateObject$3(), content.CardBodyE.fragments.content, content.ListGroupD.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$5
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var content$$1 = items[0] || {};
    var nodes = items.slice(1) || [];
    return React__default.createElement("div", {
      className: "row"
    }, React__default.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.CardBodyE, __chunk_1._extends({
      content: content$$1
    }, attrs)))), React__default.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React__default.createElement(core.Card, null, React__default.createElement(content.ListGroupD, __chunk_1._extends({
      flush: true,
      nodes: nodes
    }, attrs)))));
  });
};

BlockHeroC.displayName = 'WebsiteScheduledContent/Blocks/HeroC';
BlockHeroC.propTypes = propTypes$5;
BlockHeroC.defaultProps = defaultProps$5;

function _templateObject$4() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleD on PlatformContent {\n    ...ContentListGroupStyleD\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$6 = gql(_templateObject$4(), content.CardBodyA.fragments.content, content.ListGroupD.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$6
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var set1 = items.slice(0, 2) || [];
    var set2 = items.slice(2) || [];
    return React__default.createElement("div", __chunk_1._extends({
      className: "row"
    }, attrs), set1.map(function (content$$1) {
      return React__default.createElement("div", {
        className: "col-4",
        key: content$$1.id
      }, React__default.createElement(core.Card, {
        className: "h-100"
      }, React__default.createElement(content.CardBodyA, {
        content: content$$1
      })));
    }), React__default.createElement("div", {
      className: "col-4"
    }, React__default.createElement(core.Card, {
      className: "h-100"
    }, React__default.createElement(content.ListGroupD, {
      flush: true,
      nodes: set2
    }))));
  });
};

BlockHeroD.displayName = 'WebsiteScheduledContent/Blocks/HeroD';
BlockHeroD.propTypes = propTypes$6;
BlockHeroD.defaultProps = defaultProps$6;

var fragment$7 = content.ListGroupA.fragments.content;
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["header", "query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$7
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    return React__default.createElement(core.Card, attrs, header && React__default.createElement("div", {
      className: "card-header"
    }, header), React__default.createElement(content.ListGroupA, {
      flush: true,
      nodes: items
    }));
  });
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes$7;
BlockListGroupA.defaultProps = defaultProps$7;

function _templateObject$5() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockListGroupB on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleB\n  }\n  ", "\n  ", "\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$8 = gql(_templateObject$5(), content.CardBodyB.fragments.content, content.ListGroupA.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["header", "query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$8
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var content$$1 = items[0] || {};
    var nodes = items.slice(1) || [];
    return React__default.createElement(core.Card, attrs, header && React__default.createElement("div", {
      className: "card-header"
    }, header), React__default.createElement(content.CardBodyB, {
      content: content$$1,
      imgAttrs: {
        className: header ? 'rounded-0' : null
      }
    }), React__default.createElement(content.ListGroupA, {
      flush: true,
      nodes: nodes
    }));
  });
};

BlockListGroupB.displayName = 'WebsiteScheduledContent/Blocks/ListGroupB';
BlockListGroupB.propTypes = propTypes$8;
BlockListGroupB.defaultProps = defaultProps$8;

var fragment$9 = content.ListGroupB.fragments.content;
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["header", "query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$9
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    return React__default.createElement(core.Card, attrs, header && React__default.createElement("div", {
      className: "card-header"
    }, header), React__default.createElement(content.ListGroupB, {
      flush: true,
      nodes: items
    }));
  });
};

BlockListGroupC.displayName = 'WebsiteScheduledContent/Blocks/ListGroupC';
BlockListGroupC.propTypes = propTypes$9;
BlockListGroupC.defaultProps = defaultProps$9;

function _templateObject$6() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockListGroupD on PlatformContent {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$a = gql(_templateObject$6(), content.CardBodyA.fragments.content, content.ListGroupA.fragments.content);
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["header", "query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment$a
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var content$$1 = items[0] || {};
    var nodes = items.slice(1) || [];
    return React__default.createElement(core.Card, attrs, header && React__default.createElement("div", {
      className: "card-header"
    }, header), React__default.createElement(content.CardBodyA, {
      content: content$$1,
      imgAttrs: {
        className: header ? 'rounded-0' : null
      }
    }), React__default.createElement(content.ListGroupA, {
      flush: true,
      nodes: nodes
    }));
  });
};

BlockListGroupD.displayName = 'WebsiteScheduledContent/Blocks/ListGroupD';
BlockListGroupD.propTypes = propTypes$a;
BlockListGroupD.defaultProps = defaultProps$a;

exports.BlockCardDeckA = BlockCardDeckA;
exports.BlockCardDeckB = BlockCardDeckB;
exports.BlockCardDeckC = BlockCardDeckC;
exports.BlockHeroA = BlockHeroA;
exports.BlockHeroB = BlockHeroB;
exports.BlockHeroC = BlockHeroC;
exports.BlockHeroD = BlockHeroD;
exports.BlockListGroupA = BlockListGroupA;
exports.BlockListGroupB = BlockListGroupB;
exports.BlockListGroupC = BlockListGroupC;
exports.BlockListGroupD = BlockListGroupD;
