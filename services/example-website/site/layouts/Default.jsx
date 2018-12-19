import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { SiteConfigContext } from '@base-cms/nextjs-web/config';
import { LinkElement } from '@base-cms/nextjs-web/components/core';
import { SiteNavbar, NavItem } from '@base-cms/nextjs-web-bootstrap/core';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const DefaultLayout = ({ children }) => (
  <>
    <SiteNavbar className="sticky-top navbar-expand navbar-dark bg-dark shadow">
      <SiteConfigContext.Consumer>
        {config => (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <LinkElement to="/" className="navbar-brand ml-2" value={config.get('name')}>
                {(value) => {
                  const siteLogo = config.get('logo');
                  if (siteLogo) {
                    return (
                      <img src={siteLogo} title={value} alt={value} height={25} />
                    );
                  }
                  return value;
                }}
              </LinkElement>
              <ul className="navbar-nav small align-self-center">
                {config.getAsArray('secondaryNavItems').map(item => <NavItem key={item.to} to={item.to} value={item.label} />)}
              </ul>
            </div>
            <ul className="navbar-nav">
              {config.getAsArray('primaryNavItems').map(item => <NavItem key={item.to} to={item.to} value={item.label} />)}
            </ul>
          </div>
        )}
      </SiteConfigContext.Consumer>
    </SiteNavbar>
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
