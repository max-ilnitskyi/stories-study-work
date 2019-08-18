import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import Button from '../Button';
import FormikInputField from '../FormikInputField';
import FormikSelectColor from '../FormikSelectColor';
import FormikTextArea from '../FormikTextArea';

import { postMyStory } from '../../store/stories/actions';
import { messagesActions } from '../Messages';

import constants from '../../constants';
import {
  newStoryColorsList as colorsList,
  newStoryTitle as mainTitle,
  newStoryRequestSuccessText,
  newStoryRequestErrorText
} from '../../data';

// [ Styled Components >>>>>>>
const StyledForm = styled(Form)`
  padding: 20px 10px;

  border: 5px solid ${constants.styles.SECONDARY_COLOR};
  border-radius: 5px;
`;

const FormLine = styled.div`
  margin-top: 15px;

  :first-child {
    margin-top: 0;
  }
`;

const ButtonWrap = styled.div`
  display: block;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

// <<<<<<< Styled Components ]

const yupSchema = yup.object().shape({
  title: yup.string().required('Title is required!'),
  text: yup.string().required('Text is required!')
});

class FormNewStory extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          title: '',
          text: '',
          color: colorsList[0]
        }}
        validationSchema={yupSchema}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <StyledForm>
            <Title>{mainTitle}</Title>
            <FormLine>
              <FormikTextArea
                rows="2"
                formName="FormNewStory"
                fieldName="title"
                label="Title"
                hasError={props.errors.title && props.touched.title}
              />
            </FormLine>

            <FormLine>
              <FormikSelectColor
                colors={colorsList}
                selectedColor={props.values.color}
                formName="FormNewStory"
                fieldName="color"
                label="Color"
                hasError={props.errors.color && props.touched.color}
              />
            </FormLine>

            <FormLine>
              <FormikTextArea
                rows="5"
                formName="FormNewStory"
                fieldName="text"
                label="Text"
                hasError={props.errors.text && props.touched.text}
              />
            </FormLine>

            <ButtonWrap>
              <Button
                outline
                type="submit"
                disabled={props.isSubmitting}
                loading={props.isSubmitting}
              >
                Post Story!
              </Button>
            </ButtonWrap>
          </StyledForm>
        )}
      </Formik>
    );
  }

  handleSubmit = (values, formikBag) => {
    this.props.postMyStory(values).then(data => {
      if (data.ok) {
        formikBag.resetForm();
        messagesActions.showSuccess(newStoryRequestSuccessText);
      } else {
        formikBag.setSubmitting(false);
        messagesActions.showError(newStoryRequestErrorText);
      }
    });
  };
}

FormNewStory.propTypes = {
  postMyStory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // here must be selectors, like [prop]: [selector](state);
});

const mapDispatchToProps = {
  postMyStory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormNewStory);
