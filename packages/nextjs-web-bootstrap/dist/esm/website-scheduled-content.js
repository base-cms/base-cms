import { a as _objectWithoutProperties, c as _objectSpread, b as _extends, d as _taggedTemplateLiteral } from './chunk-061f2db9.js';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '@base-cms/nextjs-web/components/content';
import 'classnames';
import { Card } from './core.js';
import 'next/router';
import '@base-cms/nextjs-web/components/core';
import { asArray, isFunction } from '@base-cms/nextjs-web/utils';
import { CardBodyA, CardBodyC, ListGroupC, ListGroupA, CardBodyD, CardBodyE, ListGroupD, CardBodyB, ListGroupB } from './content.js';
import { WebsiteScheduledContent } from '@base-cms/nextjs-web/queries';
import gql from 'graphql-tag';

var _jsxFileName = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/CardDeckA.jsx";
var fragment = CardBodyA.fragments.content;
var propTypes = {
  interstitial: PropTypes.func,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var nodes = asArray(items);
    var renderInter = isFunction(interstitial) ? interstitial : defaultProps.interstitial;
    return React.createElement("div", _extends({
      className: "row"
    }, attrs, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    }), nodes.map(function (content, index) {
      return React.createElement(Fragment, {
        key: content.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }, React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        },
        __self: this
      }, React.createElement(Card, {
        className: "h-100",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, React.createElement(CardBodyA, {
        content: content,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        },
        __self: this
      }))), index === 3 && React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, renderInter()));
    }));
  });
};

BlockCardDeckA.displayName = 'WebsiteScheduledContent/Blocks/CardDeckA';
BlockCardDeckA.propTypes = propTypes;
BlockCardDeckA.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/CardDeckB.jsx";
var fragment$1 = CardBodyC.fragments.content;
var propTypes$1 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 36
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$1,
        lineNumber: 38
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 41
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var nodes = asArray(items);
    return React.createElement("div", _extends({
      className: "row"
    }, attrs, {
      __source: {
        fileName: _jsxFileName$1,
        lineNumber: 51
      },
      __self: this
    }), nodes.map(function (content) {
      return React.createElement(Fragment, {
        key: content.id,
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 53
        },
        __self: this
      }, React.createElement("div", {
        className: "mb-3 col-12 col-md-6 col-lg-3",
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 54
        },
        __self: this
      }, React.createElement(Card, {
        className: "h-100",
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 55
        },
        __self: this
      }, React.createElement(CardBodyC, {
        content: content,
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 56
        },
        __self: this
      }))));
    }));
  });
};

BlockCardDeckB.displayName = 'WebsiteScheduledContent/Blocks/CardDeckB';
BlockCardDeckB.propTypes = propTypes$1;
BlockCardDeckB.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/CardDeckC.jsx";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockCardDeckC on Content {\n    ...ContentListGroupStyleC\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 50
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 52
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 55
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var nodes = asArray(items);
    var set1 = nodes.slice(0, 8) || [];
    var set2 = nodes.slice(8) || [];
    var renderAd1 = isFunction(ad1) ? ad1 : defaultProps$2.ad1;
    var renderAd2 = isFunction(ad2) ? ad2 : defaultProps$2.ad2;
    return React.createElement(Fragment, {
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 70
      },
      __self: this
    }, React.createElement("div", _extends({
      className: "row"
    }, attrs, {
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 71
      },
      __self: this
    }), set1.map(function (content, index) {
      return React.createElement(Fragment, {
        key: content.id,
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 73
        },
        __self: this
      }, React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4",
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 74
        },
        __self: this
      }, React.createElement(Card, {
        className: "h-100",
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 75
        },
        __self: this
      }, React.createElement(CardBodyA, {
        content: content,
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 76
        },
        __self: this
      }))), index === 3 && React.createElement("div", {
        className: "mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center",
        __source: {
          fileName: _jsxFileName$2,
          lineNumber: 80
        },
        __self: this
      }, renderAd1()));
    })), React.createElement("div", {
      className: "row",
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 87
      },
      __self: this
    }, React.createElement("div", {
      className: "col-lg-4 mb-3 d-flex justify-content-center align-items-center",
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 88
      },
      __self: this
    }, renderAd2()), React.createElement("div", {
      className: "col-lg-8",
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 91
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 92
      },
      __self: this
    }, React.createElement(ListGroupC, {
      flush: true,
      nodes: set2,
      __source: {
        fileName: _jsxFileName$2,
        lineNumber: 93
      },
      __self: this
    })))));
  });
};

BlockCardDeckC.displayName = 'WebsiteScheduledContent/Blocks/CardDeckC';
BlockCardDeckC.propTypes = propTypes$2;
BlockCardDeckC.defaultProps = defaultProps$2;

var _jsxFileName$3 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/HeroA.jsx";

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleA on Content {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 43
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 45
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$3,
          lineNumber: 48
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row",
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 58
      },
      __self: this
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8",
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 59
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 60
      },
      __self: this
    }, React.createElement(CardBodyA, _extends({
      content: content
    }, attrs, {
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 61
      },
      __self: this
    })))), React.createElement("div", {
      className: "col-lg-5 col-xl-4",
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 64
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 65
      },
      __self: this
    }, React.createElement(ListGroupA, _extends({
      flush: true,
      nodes: nodes
    }, attrs, {
      __source: {
        fileName: _jsxFileName$3,
        lineNumber: 66
      },
      __self: this
    })))));
  });
};

BlockHeroA.displayName = 'WebsiteScheduledContent/Blocks/HeroA';
BlockHeroA.propTypes = propTypes$3;
BlockHeroA.defaultProps = defaultProps$3;

var _jsxFileName$4 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/HeroB.jsx";

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleB on Content {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleD\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$4,
      lineNumber: 43
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 45
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$4,
          lineNumber: 48
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row",
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 58
      },
      __self: this
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8",
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 59
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 60
      },
      __self: this
    }, React.createElement(CardBodyD, _extends({
      content: content
    }, attrs, {
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 61
      },
      __self: this
    })))), React.createElement("div", {
      className: "col-lg-5 col-xl-4",
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 64
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 65
      },
      __self: this
    }, React.createElement(ListGroupA, _extends({
      flush: true,
      nodes: nodes
    }, attrs, {
      __source: {
        fileName: _jsxFileName$4,
        lineNumber: 66
      },
      __self: this
    })))));
  });
};

BlockHeroB.displayName = 'WebsiteScheduledContent/Blocks/HeroB';
BlockHeroB.propTypes = propTypes$4;
BlockHeroB.defaultProps = defaultProps$4;

var _jsxFileName$5 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/HeroC.jsx";

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleC on Content {\n    ...ContentListGroupStyleD\n    ...ContentCardBodyStyleE\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$5,
      lineNumber: 43
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 45
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$5,
          lineNumber: 48
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row",
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 58
      },
      __self: this
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8",
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 59
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 60
      },
      __self: this
    }, React.createElement(CardBodyE, _extends({
      content: content
    }, attrs, {
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 61
      },
      __self: this
    })))), React.createElement("div", {
      className: "col-lg-5 col-xl-4",
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 64
      },
      __self: this
    }, React.createElement(Card, {
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 65
      },
      __self: this
    }, React.createElement(ListGroupD, _extends({
      flush: true,
      nodes: nodes
    }, attrs, {
      __source: {
        fileName: _jsxFileName$5,
        lineNumber: 66
      },
      __self: this
    })))));
  });
};

BlockHeroC.displayName = 'WebsiteScheduledContent/Blocks/HeroC';
BlockHeroC.propTypes = propTypes$5;
BlockHeroC.defaultProps = defaultProps$5;

var _jsxFileName$6 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/HeroD.jsx";

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleD on Content {\n    ...ContentListGroupStyleD\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$6,
      lineNumber: 43
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$6,
        lineNumber: 45
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 48
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var set1 = items.slice(0, 2) || [];
    var set2 = items.slice(2) || [];
    return React.createElement("div", _extends({
      className: "row"
    }, attrs, {
      __source: {
        fileName: _jsxFileName$6,
        lineNumber: 58
      },
      __self: this
    }), set1.map(function (content) {
      return React.createElement("div", {
        className: "col-4",
        key: content.id,
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 60
        },
        __self: this
      }, React.createElement(Card, {
        className: "h-100",
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 61
        },
        __self: this
      }, React.createElement(CardBodyA, {
        content: content,
        __source: {
          fileName: _jsxFileName$6,
          lineNumber: 62
        },
        __self: this
      })));
    }), React.createElement("div", {
      className: "col-4",
      __source: {
        fileName: _jsxFileName$6,
        lineNumber: 66
      },
      __self: this
    }, React.createElement(Card, {
      className: "h-100",
      __source: {
        fileName: _jsxFileName$6,
        lineNumber: 67
      },
      __self: this
    }, React.createElement(ListGroupD, {
      flush: true,
      nodes: set2,
      __source: {
        fileName: _jsxFileName$6,
        lineNumber: 68
      },
      __self: this
    }))));
  });
};

BlockHeroD.displayName = 'WebsiteScheduledContent/Blocks/HeroD';
BlockHeroD.propTypes = propTypes$6;
BlockHeroD.defaultProps = defaultProps$6;

var _jsxFileName$7 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/ListGroupA.jsx";
var fragment$7 = ListGroupA.fragments.content;
var propTypes$7 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$7,
      lineNumber: 36
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$7,
        lineNumber: 38
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$7,
          lineNumber: 41
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    return React.createElement(Card, _extends({}, attrs, {
      __source: {
        fileName: _jsxFileName$7,
        lineNumber: 49
      },
      __self: this
    }), header && React.createElement("div", {
      className: "card-header",
      __source: {
        fileName: _jsxFileName$7,
        lineNumber: 51
      },
      __self: this
    }, header), React.createElement(ListGroupA, {
      flush: true,
      nodes: items,
      __source: {
        fileName: _jsxFileName$7,
        lineNumber: 53
      },
      __self: this
    }));
  });
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes$7;
BlockListGroupA.defaultProps = defaultProps$7;

var _jsxFileName$8 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/ListGroupB.jsx";

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockListGroupB on Content {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleB\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$8,
      lineNumber: 46
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$8,
        lineNumber: 48
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$8,
          lineNumber: 51
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement(Card, _extends({}, attrs, {
      __source: {
        fileName: _jsxFileName$8,
        lineNumber: 61
      },
      __self: this
    }), header && React.createElement("div", {
      className: "card-header",
      __source: {
        fileName: _jsxFileName$8,
        lineNumber: 63
      },
      __self: this
    }, header), React.createElement(CardBodyB, {
      content: content,
      imgAttrs: {
        className: header ? 'rounded-0' : null
      },
      __source: {
        fileName: _jsxFileName$8,
        lineNumber: 65
      },
      __self: this
    }), React.createElement(ListGroupA, {
      flush: true,
      nodes: nodes,
      __source: {
        fileName: _jsxFileName$8,
        lineNumber: 66
      },
      __self: this
    }));
  });
};

BlockListGroupB.displayName = 'WebsiteScheduledContent/Blocks/ListGroupB';
BlockListGroupB.propTypes = propTypes$8;
BlockListGroupB.defaultProps = defaultProps$8;

var _jsxFileName$9 = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/ListGroupC.jsx";
var fragment$9 = ListGroupB.fragments.content;
var propTypes$9 = {
  header: PropTypes.string,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$9,
      lineNumber: 38
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$9,
        lineNumber: 40
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$9,
          lineNumber: 43
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    return React.createElement(Card, _extends({}, attrs, {
      __source: {
        fileName: _jsxFileName$9,
        lineNumber: 51
      },
      __self: this
    }), header && React.createElement("div", {
      className: "card-header",
      __source: {
        fileName: _jsxFileName$9,
        lineNumber: 53
      },
      __self: this
    }, header), React.createElement(ListGroupB, {
      flush: true,
      nodes: items,
      __source: {
        fileName: _jsxFileName$9,
        lineNumber: 55
      },
      __self: this
    }));
  });
};

BlockListGroupC.displayName = 'WebsiteScheduledContent/Blocks/ListGroupC';
BlockListGroupC.propTypes = propTypes$9;
BlockListGroupC.defaultProps = defaultProps$9;

var _jsxFileName$a = "/base-cms/packages/nextjs-web-bootstrap/src/website-scheduled-content/blocks/ListGroupD.jsx";

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockListGroupD on Content {\n    ...ContentListGroupStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

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
    limit: PropTypes.number,
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

  return React.createElement(WebsiteScheduledContent, _extends({}, props, {
    __source: {
      fileName: _jsxFileName$a,
      lineNumber: 46
    },
    __self: this
  }), function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", {
      __source: {
        fileName: _jsxFileName$a,
        lineNumber: 48
      },
      __self: this
    }, "Loading...");

    if (error) {
      return React.createElement("span", {
        __source: {
          fileName: _jsxFileName$a,
          lineNumber: 51
        },
        __self: this
      }, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement(Card, _extends({}, attrs, {
      __source: {
        fileName: _jsxFileName$a,
        lineNumber: 61
      },
      __self: this
    }), header && React.createElement("div", {
      className: "card-header",
      __source: {
        fileName: _jsxFileName$a,
        lineNumber: 63
      },
      __self: this
    }, header), React.createElement(CardBodyA, {
      content: content,
      imgAttrs: {
        className: header ? 'rounded-0' : null
      },
      __source: {
        fileName: _jsxFileName$a,
        lineNumber: 65
      },
      __self: this
    }), React.createElement(ListGroupA, {
      flush: true,
      nodes: nodes,
      __source: {
        fileName: _jsxFileName$a,
        lineNumber: 66
      },
      __self: this
    }));
  });
};

BlockListGroupD.displayName = 'WebsiteScheduledContent/Blocks/ListGroupD';
BlockListGroupD.propTypes = propTypes$a;
BlockListGroupD.defaultProps = defaultProps$a;

export { BlockCardDeckA, BlockCardDeckB, BlockCardDeckC, BlockHeroA, BlockHeroB, BlockHeroC, BlockHeroD, BlockListGroupA, BlockListGroupB, BlockListGroupC, BlockListGroupD };
