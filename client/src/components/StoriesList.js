import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Story from './Story';

const StoriesListWrap = styled.div``;

const StyledList = styled.ul``;

const StyledListItem = styled.li`
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

class StoriesList extends React.Component {
  render() {
    return (
      <StoriesListWrap>
        <StyledList>
          {this.props.stories &&
            this.props.stories.map(story => (
              <StyledListItem key={story._id}>
                <Story
                  {...story}
                  global={this.props.global}
                  deleteStory={this.props.deleteStory}
                  isWaitingDeleteResponse={
                    this.props.storiesWaitingDeleteResponse &&
                    this.props.storiesWaitingDeleteResponse[story._id]
                  }
                />
              </StyledListItem>
            ))}
        </StyledList>
      </StoriesListWrap>
    );
  }
}

StoriesList.propTypes = {
  stories: PropTypes.array,
  deleteStory: PropTypes.func,
  global: PropTypes.bool,
  storiesWaitingDeleteResponse: PropTypes.any
};

export default StoriesList;
