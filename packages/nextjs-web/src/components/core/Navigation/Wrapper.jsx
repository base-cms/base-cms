import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { cleanPath } from '../../../utils';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  tag: 'nav',
};

const Wrapper = ({
  children,
  router,
  tag: Tag,
  ...attrs
}) => {
  const { asPath, route } = router;
  return (
    <Tag data-route={cleanPath(route)} data-path={cleanPath(asPath)} {...attrs}>
      {children}
    </Tag>
  );
};

Wrapper.displayName = 'Core/Navigation/Wrapper';
Wrapper.propTypes = propTypes;
Wrapper.defaultProps = defaultProps;

export default withRouter(Wrapper);
