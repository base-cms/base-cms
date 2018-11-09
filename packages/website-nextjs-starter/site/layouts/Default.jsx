import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { SiteNavbar } from '@base-cms/website-nextjs-bootstrap/core';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const DefaultLayout = ({ children }) => (
  <>
    <SiteNavbar className="sticky-top navbar-dark bg-dark shadow" />
    <Container fluid>
      <Row>
        <Col className="my-3" style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
          {children}
        </Col>
      </Row>
    </Container>
  </>
);

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
