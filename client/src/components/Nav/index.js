import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import constants from '../../constants';
import { navLinks } from '../../data';

const NavWrap = styled.ul`
  display: flex;
  flex-direction: column;

  @media (min-width: ${constants.breakpoints.TABLET}px) {
    flex-direction: row;
  }
`;

const StyledNavItem = styled.li`
  flex-shrink: 0;
  flex-grow: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding-top: 15px;
  padding-bottom: 15px;

  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  color: ${constants.styles.DARK_SECONDARY_COLOR};

  &:hover,
  &:active {
    color: ${constants.styles.SECONDARY_COLOR};
  }

  @media (min-width: ${constants.breakpoints.TABLET}px) {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

class Nav extends React.Component {
  render() {
    return (
      <NavWrap>
        {navLinks.map(({ name, href }) => (
          <StyledNavItem key={name}>
            <StyledNavLink onClick={this.handleLinkClick} to={href}>
              {name}
            </StyledNavLink>
          </StyledNavItem>
        ))}
      </NavWrap>
    );
  }

  handleLinkClick = () => {
    if (this.props.onLinkClick) this.props.onLinkClick();
  };
}

Nav.propTypes = {
  onLinkClick: PropTypes.func
};

export default Nav;
