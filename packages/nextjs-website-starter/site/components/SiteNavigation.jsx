import React from 'react';
import { LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import {
  name as siteName,
  logo as siteLogo,
  primaryNavItems,
  secondaryNavItems,
} from '../../site.config';

const SiteNavigation = () => (
  <Navbar color="dark" className="sticky-top shadow" dark expand>
    <div className="d-flex flex-column">
      <div className="d-flex flex-row">
        <LinkElement to="/" className="navbar-brand ml-2" value={siteName}>
          {(value) => {
            if (siteLogo) return <img src={siteLogo} title={value} alt={value} height={25} />;
            return value;
          }}
        </LinkElement>
        <Nav className="small align-self-center" navbar>
          {secondaryNavItems.map((item) => {
            return (
              <NavItem key={item.to}>
                <LinkElement to={item.to} className="nav-link" value={item.label} />
              </NavItem>
            );
          })}
        </Nav>
      </div>
      <Nav navbar>
        {primaryNavItems.map((item) => {
          return (
            <NavItem key={item.to}>
              <LinkElement to={item.to} className="nav-link" value={item.label} />
            </NavItem>
          );
        })}
      </Nav>
    </div>
  </Navbar>
);

export default SiteNavigation;
