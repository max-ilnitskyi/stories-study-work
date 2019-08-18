import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormSigninMini from '../FormSigninMini';
import Button from '../Button';
import SignoutIcon from './SignoutIcon';

import { user } from '../../store/user/selectors';
import { logoutUser } from '../../store/user/actions';

import { messagesActions } from '../Messages';

const UserPanelWrap = styled.div`
  display: flex;
  align-items: center;
`;

const SignoutButton = styled(Button)`
  padding: 0;
  width: 40px;
  margin-left: 10px;
`;

const UserLogin = styled.p`
  max-width: 200px;
  font-size: 24px;
  font-weight: bold;
`;

class UserPanel extends React.Component {
  render() {
    return this.props.user ? (
      <UserPanelWrap>
        <UserLogin>{this.props.user.login}</UserLogin>
        <SignoutButton type="button" onClick={this.handleLogout}>
          <SignoutIcon />
        </SignoutButton>
      </UserPanelWrap>
    ) : (
      <UserPanelWrap>
        <FormSigninMini />
      </UserPanelWrap>
    );
  }
  renderLogged() {}

  handleLogout = () => {
    this.props.logoutUser().then(data => {
      if (data.ok) {
        messagesActions.showSuccess('You Successfully logged out');
      } else {
        messagesActions.showError(data.message || 'Error');
      }
    });
  };
}

UserPanel.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  user: user(state)
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
