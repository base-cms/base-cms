import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import SiteNavigation from '../components/SiteNavigation';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const DefaultLayout = ({ children }) => (
  <>
    <SiteNavigation />
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
