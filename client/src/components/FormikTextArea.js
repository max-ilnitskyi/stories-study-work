import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import FormikFieldWrap from './FormikFieldWrap';

import constants from '../constants';

// [ Styled Components >>>>>>>
const FiltratedPropsField = ({ hasError, ...props }) => <Field {...props} />;

const StyledTextArea = styled(FiltratedPropsField).attrs({
  component: 'textarea'
})`
  width: 100%;
  padding: 8px;

  resize: none;
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

class FormikTextArea extends React.Component {
  render() {
    const {
      formName,
      fieldName,
      label,
      placeholder,
      rows = 5,
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
        <StyledTextArea
          rows={rows}
          hasError={hasError}
          placeholder={placeholder}
          name={fieldName}
          id={fieldId}
          {...restProps}
        />
      </FormikFieldWrap>
    );
  }
}

FormikTextArea.propTypes = {
  formName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string
};

export default FormikTextArea;
