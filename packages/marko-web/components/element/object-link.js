const { isObject } = require('@base-cms/utils');
const { get } = require('@base-cms/object-path');

/**
 * Use `siteContext.path` first and then fallback to `canonicalPath`.
 * Content uses the former, other models use the latter.
 * This should be made consistent across all types at some point.
 */
const defaultHref = obj => get(obj, 'siteContext.path', get(obj, 'canonicalPath'));

/**
 * Converts `marko-web-obj` link input into "standard" `marko-web-link` input.
 */
module.exports = (linkInput, obj) => {
  // Generate default link when link input is true.
  if (linkInput === true) return { href: defaultHref(obj) };
  // If no link input was provided, return null.
  if (!isObject(linkInput)) return null;

  const {
    field,
    href,
    target,
    rel,
    title,
    class: className,
    attrs,
  } = linkInput;
  if (href) {
    // When `href` is specifically set, do not convert the input.
    return {
      href,
      target,
      rel,
      title,
      class: className,
      attrs,
    };
  }
  // Return the customized input
  return {
    href: field ? get(obj, field) : defaultHref(obj),
    target,
    rel,
    title,
    class: className,
    attrs,
  };
};
