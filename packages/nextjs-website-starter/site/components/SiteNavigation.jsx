import React from 'react';
import { LinkElement } from '@base-cms/base4-website-nextjs/components/core';
import {
  name as siteName,
  logo as siteLogo,
  primaryNavItems,
  secondaryNavItems,
} from '../../site.config';

const SiteNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
    <div className="d-flex flex-column">

      <div className="d-flex flex-row">
        <LinkElement to="/" className="navbar-brand ml-2" value={siteName}>
          {(value) => {
            if (siteLogo) return <img src={siteLogo} title={value} alt={value} height={25} />;
            return value;
          }}
        </LinkElement>
        <ul className="navbar-nav small align-self-center">
          {secondaryNavItems.map((item) => {
            return (
              <li className="navbar-item" key={item.label}>
                <LinkElement to={item.to} className="nav-link" value={item.label} />
              </li>
            )
          })}
        </ul>
      </div>

      <ul className="navbar-nav">
        {primaryNavItems.map((item) => {
          return (
            <li className="navbar-item" key={item.label}>
              <LinkElement to={item.to} className="nav-link" value={item.label} />
            </li>
          )
        })}
      </ul>
    </div>
  </nav>
);

export default SiteNavigation;
