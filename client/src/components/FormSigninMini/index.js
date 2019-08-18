import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import Button from '../Button';
import SigninIcon from './SigninIcon';

import constants from '../../constants';
import { messagesActions } from '../Messages';

import { loginUser } from '../../store/user/actions';

// [ Styled Components >>>>>>>
const FormWrap = styled(Form)`
  display: flex;
`;

const TextField = styled(Field)`
  display: block;
  width: 150px;
  padding: 3px;

  border: 1px solid ${constants.styles.SECONDARY_COLOR};
`;

const FieldsWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

const SigninButton = styled(Button)`
  width: 40px;
  padding: 0;

  flex-shrink: 0;
  flex-grow: 0;

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
// <<<<<<< Styled Components ]

class FormSigninMini extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          login: '',
          password: ''
        }}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <FormWrap>
            <FieldsWrap>
              <TextField type="text" name="login" placeholder="login" />
              <TextField
                type="password"
                name="password"
                placeholder="password"
              />
            </FieldsWrap>

            <SigninButton type="submit" disabled={this.props.isSubmitting}>
              <SigninIcon />
            </SigninButton>
          </FormWrap>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    this.props.loginUser(values).then(data => {
      if (data.ok) {
        formikBag.resetForm();
        messagesActions.showSuccess('You successfully logged in');
      } else {
        formikBag.setSubmitting(false);
        messagesActions.showError(data.message);
      }
    });
  };
}

FormSigninMini.propTypes = {
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // storiesList: storiesList(state)
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSigninMini);
