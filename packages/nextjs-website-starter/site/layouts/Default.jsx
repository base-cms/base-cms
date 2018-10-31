import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { SiteNavbar } from '@base-cms/base4-website-nextjs-bootstrap/core';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const DefaultLayout = ({ children }) => (
  <>
    <SiteNavbar className="sticky-top navbar-dark bg-dark shadow" />
    <Container>
      <Row>
        <Col className="my-3">
          {children}
        </Col>
      </Row>
    </Container>
  </>
);

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
