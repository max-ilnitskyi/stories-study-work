import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import UserPanel from '../UserPanel';
import Container from '../Container';
import Nav from '../Nav';
import ModalWrap from '../ModalWrap';
import Button from '../Button';
import MenuIcon from './MenuIcon';

import { viewportWidth } from '../../store/viewport/selectors';

import constants from '../../constants';

const LinkForAs = Button.withoutCustomProps(Link);

const HeaderWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 10;
  padding-top: 5px;
  padding-bottom: 5px;

  background-color: ${constants.styles.LIGHT_PRIMARY_COLOR};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const HeaderContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const HeaderNavWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

const HeaderUserPanelWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  margin-left: auto;
`;

const MenuButton = styled(Button)`
  padding: 0;
  width: 40px;
  height: 40px;
  margin-left: auto;
`;

const MenuWrap = styled.div`
  width: 50%;
  min-width: 300px;
  height: 100%;
  padding: 30px 15px;
  overflow-y: auto;
  overflow-x: hidden;

  background-color: white;
`;

// Hash that will be used for modal menu link
const menuHash = '#menu-nav';

class Header extends React.Component {
  render() {
    return this.props.viewportWidth < constants.breakpoints.TABLET
      ? this.renderButtonMenu()
      : this.renderCommonMenu();
  }

  renderButtonMenu() {
    return (
      <HeaderWrap>
        <HeaderContainer>
          {this.props.history.location.hash === menuHash && (
            <ModalWrap closeModal={this.handleMenuClose}>
              <MenuWrap>
                <Nav />
              </MenuWrap>
            </ModalWrap>
          )}

          <HeaderNavWrap>
            <MenuButton
              as={LinkForAs}
              to={menuHash}
              color={constants.styles.DARK_PRIMARY_COLOR}
            >
              <MenuIcon />
            </MenuButton>
          </HeaderNavWrap>
          <HeaderUserPanelWrap>
            <UserPanel />
          </HeaderUserPanelWrap>
        </HeaderContainer>
      </HeaderWrap>
    );
  }

  renderCommonMenu() {
    return (
      <HeaderWrap>
        <HeaderContainer>
          <HeaderNavWrap>
            <Nav />
          </HeaderNavWrap>
          <HeaderUserPanelWrap>
            <UserPanel />
          </HeaderUserPanelWrap>
        </HeaderContainer>
      </HeaderWrap>
    );
  }

  handleMenuClose = () => {
    this.props.history.goBack();
  };
}

Header.propTypes = {
  viewportWidth: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  viewportWidth: viewportWidth(state)
});

const mapDispatchToProps = {
  // logoutUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
