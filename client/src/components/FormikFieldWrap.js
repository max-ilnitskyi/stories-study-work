import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import constants from '../constants';

// [ Styled Components >>>>>>>

const FieldWrap = styled.div`
  position: relative;

  color: ${({ hasError }) => (hasError ? 'red' : constants.styles.GREY_COLOR)};
`;

const Label = styled.label`
  display: block;

  font-size: 12px;
  color: currentColor;
`;

const StyledError = styled(ErrorMessage).attrs({ component: 'p' })`
  font-size: 12px;
  color: currentColor;
`;

// <<<<<<< Styled Components ]

class FormikFieldWrap extends React.Component {
  render() {
    const { formName, fieldName, label, hasError, children } = this.props;
    const fieldId = `${formName}.${fieldName}`;

    return (
      <FieldWrap hasError={hasError}>
        <Label htmlFor={fieldId}>{label}</Label>
        {children}
        <StyledError name={fieldName} />
      </FieldWrap>
    );
  }
}

FormikFieldWrap.propTypes = {
  formName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldId: PropTypes.string,
  hasError: PropTypes.bool,
  label: PropTypes.string
};

export default FormikFieldWrap;
