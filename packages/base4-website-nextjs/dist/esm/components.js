import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createMarkup, cleanPath } from './utils.js';
import Head from 'next/head';

var formatValue = function formatValue(value, format) {
  if (!value) return '';
  var date = moment(value);
  if (!date.isValid()) return '';
  return moment(value).format(format);
};

var FormatDate = function FormatDate(_ref) {
  var className = _ref.className,
      collapsable = _ref.collapsable,
      format = _ref.format,
      Tag = _ref.tag,
      value = _ref.value;
  var formatted = formatValue(value, format);
  if (collapsable && !formatted) return null;
  return React.createElement(Tag, {
    className: className
  }, formatValue(value, format));
};

FormatDate.propTypes = {
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.number,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
FormatDate.defaultProps = {
  className: null,
  collapsable: true,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null
};

var HTML = function HTML(_ref) {
  var className = _ref.className,
      collapsable = _ref.collapsable,
      html = _ref.html,
      Tag = _ref.tag;
  if (!html && collapsable) return null;
  return React.createElement(Tag, {
    className: className,
    dangerouslySetInnerHTML: createMarkup(html)
  });
};

HTML.propTypes = {
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  html: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
HTML.defaultProps = {
  className: null,
  collapsable: true,
  html: '',
  tag: 'div'
};

var MetaDescription = function MetaDescription(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React.createElement(Head, null, React.createElement("meta", {
    name: "description",
    content: value
  }));
};

MetaDescription.propTypes = {
  value: PropTypes.string
};
MetaDescription.defaultProps = {
  value: null
};

var PageTitle = function PageTitle(_ref) {
  var value = _ref.value,
      siteName = _ref.siteName,
      concateWith = _ref.concateWith;
  var title = siteName ? "".concat(value, " ").concat(concateWith, " ").concat(siteName) : value;
  return React.createElement(Head, null, React.createElement("title", null, title));
};

PageTitle.propTypes = {
  value: PropTypes.string.isRequired,
  siteName: PropTypes.string,
  concateWith: PropTypes.string
};
PageTitle.defaultProps = {
  siteName: null,
  concateWith: '|'
};

var RelCanonical = function RelCanonical(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React.createElement(Head, null, React.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(cleanPath(pathname))
  }));
};

RelCanonical.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired
};

export { FormatDate, HTML, MetaDescription, PageTitle, RelCanonical };
