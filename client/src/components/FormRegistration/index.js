import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Button from '../Button';
import FormikInputField from '../FormikInputField';

import fetchJSON from '../../utils/fetchJSON';

import constants from '../../constants';
import { messagesActions } from '../Messages';

import { registrateUser } from '../../store/user/actions';

// [ Styled Components >>>>>>>
const FormWrap = styled(Form)`
  padding: 20px 10px;

  border: 5px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const FieldWrap = styled.div`
  margin-top: 15px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  :first-child {
    margin-top: 0;
  }
`;

const ButtonWrap = styled.div`
  display: block;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`;

const Title = styled.h3`
  max-width: 550px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;

  text-align: center;
`;
// <<<<<<< Styled Components ]

// API request to check is login free, it uses for in validation
const checkLogin = login => fetchJSON.post(`/api/user/check-login`, { login });

// Validation shema
const yupSchema = yup.object().shape({
  login: yup
    .string()
    .required('Login is required!')
    .test('is-exist', 'User with this login already exist', login =>
      checkLogin(login).then(data => Promise.resolve(data.ok && data.isFree))
    ),
  password1: yup.string().required('Password is required!'),
  password2: yup
    .string()
    .required('Please, repeat password!')
    .oneOf([yup.ref('password1')], 'Must be the same')
});

class FormRegistration extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          login: '',
          password1: '',
          password2: ''
        }}
        validationSchema={yupSchema}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <FormWrap>
            <Title>Create new account:</Title>

            <FieldWrap>
              <FormikInputField
                formName="FormRegistration"
                fieldName="login"
                label="Login"
                hasError={props.errors.login && props.touched.login}
              />
            </FieldWrap>
            <FieldWrap>
              <FormikInputField
                formName="FormRegistration"
                fieldName="password1"
                label="Password"
                type="password"
                hasError={props.errors.password1 && props.touched.password1}
              />
            </FieldWrap>
            <FieldWrap>
              <FormikInputField
                formName="FormRegistration"
                fieldName="password2"
                label="Repeat password"
                type="password"
                hasError={props.errors.password2 && props.touched.password2}
              />
            </FieldWrap>

            <ButtonWrap>
              <Button type="submit" disabled={this.props.isSubmitting}>
                Registrate new user!
              </Button>
            </ButtonWrap>
          </FormWrap>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    const userData = {
      login: values.login,
      password: values.password1
    };

    this.props.registrateUser(userData).then(data => {
      if (data.ok) {
        formikBag.resetForm();
      } else {
        formikBag.setSubmitting(false);
        messagesActions.showError(data.message);
      }
    });
  };
}

FormRegistration.propTypes = {
  registrateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // user: user(state)
});

const mapDispatchToProps = {
  registrateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormRegistration);
