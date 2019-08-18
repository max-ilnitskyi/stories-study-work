import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import FormikFieldWrap from './FormikFieldWrap';

import constants from '../constants';
import { mixins } from '../styles';

// [ Styled Components >>>>>>>

const ColorsList = styled.ul`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ColorsListItem = styled.li`
  margin-left: 10px;
`;

const ChooseColorLabel = styled.label`
  display: block;
  width: 30px;
  height: 30px;

  border-radius: 50%;
  cursor: pointer;
`;

const ChooseColor = styled(Field).attrs({ type: 'radio' })`
  ${mixins.visuallyHidden}

  & + ${ChooseColorLabel} {
    background-color: ${props => props.value};
  }

  &:checked + ${ChooseColorLabel} {
    box-shadow: 0 0 0 2px white, 
      0 0 0 4px ${constants.styles.LIGHT_GREY_COLOR}, 
      0 0 0 5px transparent;
  }

  &:focus + ${ChooseColorLabel} {
    /* box-shadow: 0 0 0 4px grey; */
    box-shadow: 0 0 0 2px white, 0 0 0 5px ${constants.styles.GREY_COLOR};
  }
`;

// <<<<<<< Styled Components ]

class FormikSelectColor extends React.Component {
  render() {
    const {
      colors,
      selectedColor,
      formName,
      fieldName,
      label,
      hasError
    } = this.props;

    return (
      <FormikFieldWrap
        formName={formName}
        fieldName={fieldName}
        label={label}
        hasError={hasError}
      >
        <ColorsList>
          {colors.map(color => (
            <ColorsListItem key={color}>
              <ChooseColor
                name={fieldName}
                id={`${formName}.${fieldName}.${color}`}
                value={color}
                checked={color === selectedColor}
              />
              <ChooseColorLabel htmlFor={`${formName}.${fieldName}.${color}`} />
            </ColorsListItem>
          ))}
        </ColorsList>
      </FormikFieldWrap>
    );
  }
}

FormikSelectColor.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  selectedColor: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  label: PropTypes.string
};

export default FormikSelectColor;
