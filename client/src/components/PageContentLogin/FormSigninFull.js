import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Button from '../Button';

import constants from '../../constants';
import { messagesActions } from '../Messages';

import { loginUser } from '../../store/user/actions';

// [ Styled Components >>>>>>>
const FormWrap = styled(Form)`
  padding: 20px 10px;

  border: 5px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const Label = styled.label`
  ${'' /* here must be styles */}
`;

// const FakeLabel = styled.span`
//   ${'' /* here must be styles */}
// `;

const TextField = styled(Field)`
  ${'' /* here must be styles */}
`;

const StyledError = styled(ErrorMessage).attrs({ component: 'p' })`
  color: red;
`;

const FormLine = styled.div`
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;
// <<<<<<< Styled Components ]
const yupSchema = yup.object().shape({
  login: yup.string().required('Login is required!'),
  password: yup.string().required('Password is required!')
});

class FormSigninFull extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          login: '',
          password: ''
        }}
        validationSchema={yupSchema}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <FormWrap>
            <Title>Login:</Title>
            <FormLine>
              <Label htmlFor="FormSigninFull.login">Login: </Label>
              <TextField type="text" name="login" id="FormSigninFull.login" />
              <StyledError name="login" />
            </FormLine>

            <FormLine>
              <Label htmlFor="FormSigninFull.password1">Password: </Label>
              <TextField
                type="password"
                name="password"
                id="FormSigninFull.password"
              />
              <StyledError name="password" />
            </FormLine>

            <ButtonsWrap>
              <Button type="submit" disabled={this.props.isSubmitting}>
                Login!
              </Button>
              <Button style={{ marginLeft: '20px' }} type="reset">
                reset?
              </Button>
            </ButtonsWrap>
          </FormWrap>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    this.props.loginUser(values).then(data => {
      if (data.ok) {
        formikBag.resetForm();
      } else {
        formikBag.setSubmitting(false);
        messagesActions.showError(data.message || 'Sign in error');
      }
    });
  };
}

FormSigninFull.propTypes = {
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
)(FormSigninFull);
