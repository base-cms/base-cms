import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PrimaryImageLink } from '@base-cms/base4-website-nextjs/components/content';

const propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  linkClassName: PropTypes.string,
  withBody: PropTypes.bool,
};

const defaultProps = {
  className: null,
  content: {},
  linkClassName: null,
  withBody: false,
};

const ContentCardImage = ({
  className,
  content,
  linkClassName,
  withBody,
  ...rest
}) => {
  const imgAttrs = { className: classNames(withBody ? 'card-img' : 'card-img-top img-fluid embed-responsive-item', className) };
  const linkAttrs = { className: classNames('embed-responsive', 'embed-responsive-16by9', linkClassName) };
  return <PrimaryImageLink content={content} linkAttrs={linkAttrs} imgAttrs={imgAttrs} {...rest} />;
};

ContentCardImage.displayName = 'Content/CardImage';
ContentCardImage.propTypes = propTypes;
ContentCardImage.defaultProps = defaultProps;

export default ContentCardImage;
