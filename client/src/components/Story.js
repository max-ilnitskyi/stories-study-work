import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from './Button';

import constants from '../constants';

const LinkForAs = Button.withoutCustomProps(Link);

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StoryWrap = styled.article`
  position: relative;
  padding: 10px;

  background-color: #fff;
  border-radius: 5px;
  border: 2px solid ${props => props.color};

  animation: ${show} 0.5s ease;
`;

const ButtonsWrap = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  float: right;
  /* right: 5px;
  top: 5px; */

  & > * {
    margin-left: 5px;
  }

  @media (min-width: ${constants.breakpoints.TABLET}px) {
    flex-direction: row;
  }

  @media (min-width: ${constants.breakpoints.DESKTOP}px) {
    opacity: 0.3;

    ${StoryWrap}:hover & {
      opacity: 1;
    }
  }
`;

const StoryButton = styled(Button)`
  font-size: 16px;
  margin-bottom: 5px;

  @media (min-width: ${constants.breakpoints.TABLET}px) {
    margin-bottom: 0;
  }
`;

const StoryTitle = styled.h3``;

const StoryText = styled.p`
  margin-top: 10px;
`;

const OtherDataWrap = styled.div`
  display: flex;
  clear: both;
  margin-top: 10px;
`;

const StoryAuthor = styled.p`
  max-width: calc(100% - 120px);

  font-size: 14px;
  color: grey;
`;

const StoryCreatedDate = styled.p`
  margin-left: auto;

  font-size: 14px;
  color: grey;
`;

// prop 'glbal' render element without delete button and show author
class Story extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createdAt: props.createdAt
        ? new Date(props.createdAt).toLocaleDateString()
        : 'unknown'
    };
  }

  render() {
    return (
      <StoryWrap color={this.props.color}>
        <ButtonsWrap>
          <StoryButton
            as={LinkForAs}
            to={`/story/${this.props._id}`}
            color="#C1CD00"
            outline
          >
            link
          </StoryButton>
          {!this.props.global && (
            <StoryButton
              disabled={this.props.isWaitingDeleteResponse}
              type="button"
              onClick={this.handleDeleteButtonClick}
              color="#FC2727"
              outline
              loading={this.props.isWaitingDeleteResponse}
            >
              delete
            </StoryButton>
          )}
        </ButtonsWrap>
        <StoryTitle>{this.props.title}</StoryTitle>
        <StoryText>{this.props.text}</StoryText>
        <OtherDataWrap>
          {this.props.global && (
            <StoryAuthor>
              Author: {(this.props.user && this.props.user.login) || 'unknown'}
            </StoryAuthor>
          )}
          <StoryCreatedDate>Created: {this.state.createdAt}</StoryCreatedDate>
        </OtherDataWrap>
      </StoryWrap>
    );
  }

  handleDeleteButtonClick = () => {
    // Call deleteStory from props with current story ID
    this.props.deleteStory(this.props._id);
  };
}

Story.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ login: PropTypes.string })
  ]),
  deleteStory: PropTypes.func,
  isWaitingDeleteResponse: PropTypes.bool
};

export default Story;
