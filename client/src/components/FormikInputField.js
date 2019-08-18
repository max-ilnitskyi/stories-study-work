import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import FormikFieldWrap from './FormikFieldWrap';

import constants from '../constants';

// [ Styled Components >>>>>>>
const FiltratedPropsField = ({ hasError, ...props }) => <Field {...props} />;

const StyledField = styled(FiltratedPropsField)`
  width: 100%;
  padding: 8px;

  font-size: 16px;
  color: black;
  border-radius: 3px;
  border: 1px solid
    ${({ hasError }) => (hasError ? 'red' : constants.styles.GREY_COLOR)};
  background-color: #fff;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px
      ${({ hasError }) => (hasError ? 'red' : constants.styles.GREY_COLOR)};
  }
`;

// <<<<<<< Styled Components ]

class FormikInputField extends React.Component {
  render() {
    const {
      formName,
      fieldName,
      label,
      placeholder,
      type = 'text',
      hasError,
      ...restProps
    } = this.props;
    const fieldId = `${formName}.${fieldName}`;

    return (
      <FormikFieldWrap
        formName={formName}
        fieldName={fieldName}
        label={label}
        hasError={hasError}
      >
        <StyledField
          hasError={hasError}
          type={type}
          placeholder={placeholder}
          name={fieldName}
          id={fieldId}
          {...restProps}
        />
      </FormikFieldWrap>
    );
  }
}

FormikInputField.propTypes = {
  formName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

export default FormikInputField;
