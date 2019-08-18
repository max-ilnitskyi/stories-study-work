import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormNewStory from '../FormNewStory';
import TextLink from '../TextLink';
import Paragraph from '../Paragraph';
import Loading from '../Loading';
import StoriesList from '../StoriesList';
import Pagination from '../Pagination';

import {
  myStoriesList,
  myStoriesFetchState
} from '../../store/stories/selectors';
import { user } from '../../store/user/selectors';
import { fetchMyStories, deleteMyStory } from '../../store/stories/actions';
import { messagesActions } from '../Messages';
import {
  headTitleMyStories as headTitle,
  deleteStoryRequestSuccessText,
  deleteStoryRequestErrorText,
  registrationLink
} from '../../data';

const FormWrap = styled.div`
  margin-bottom: 30px;
`;

const PaginationWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`;

const PaginationWrapTop = styled(PaginationWrap)`
  margin-bottom: 20px;
`;

const PaginationWrapBottom = styled(PaginationWrap)`
  margin-top: 20px;
`;

class PageContentMyStories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storiesWaitingDeleteResponse: {}
    };

    this.storiesOnPage = 10; // How many stories on page will be showed
    this.mainAddress = '/my-stories';
  }

  render() {
    const currentPageNum = Number(this.props.match.params.page) || 1;
    const isNeedPagination = this.props.myStoriesList
      ? this.props.myStoriesList.length > this.storiesOnPage
      : false;

    const currentStoriesList = this.getCurrentStoriesList(currentPageNum);
    const pages = this.getPages();

    return (
      <PageContentWrap>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        {this.props.user && (
          <FormWrap>
            <FormNewStory />
          </FormWrap>
        )}

        {this.props.user &&
          !this.props.myStoriesList &&
          this.props.myStoriesFetchState === 'pending' && <Loading standart />}

        {this.props.user &&
          !this.props.myStoriesList &&
          this.props.myStoriesFetchState === 'error' && (
            <Paragraph>
              There is some problems in loading data. Try to reload page later.
            </Paragraph>
          )}

        {this.props.user &&
          this.props.myStoriesList &&
          this.props.myStoriesList.length === 0 && (
            <Paragraph>
              Here are not any stories yet. Create one with the form above.
            </Paragraph>
          )}

        {!this.props.user && (
          <Paragraph>
            To post your own stories you need sign in with form at the upper
            right corner (or{' '}
            <TextLink to={registrationLink.href}>create new account</TextLink>{' '}
            if you have not any yet).
          </Paragraph>
        )}

        {isNeedPagination && (
          <PaginationWrapTop>
            <Pagination pages={pages} currentPageNum={currentPageNum} />
          </PaginationWrapTop>
        )}

        <StoriesList
          stories={currentStoriesList}
          storiesWaitingDeleteResponse={this.state.storiesWaitingDeleteResponse}
          deleteStory={this.deleteStory}
        />

        {isNeedPagination && (
          <PaginationWrapBottom>
            <Pagination pages={pages} currentPageNum={currentPageNum} />
          </PaginationWrapBottom>
        )}
      </PageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchMyStories();
  }

  deleteStory = storyId => {
    this.setState({
      storiesWaitingDeleteResponse: {
        ...this.state.storiesWaitingDeleteResponse,
        [storyId]: true
      }
    });

    this.props.deleteMyStory(storyId).then(data => {
      if (data.ok) {
        messagesActions.showSuccess(deleteStoryRequestSuccessText);
        this.setState({
          storiesWaitingDeleteResponse: {
            ...this.state.storiesWaitingDeleteResponse,
            [storyId]: false
          }
        });
      } else {
        messagesActions.showError(deleteStoryRequestErrorText);
        this.setState({
          storiesWaitingDeleteResponse: {
            ...this.state.storiesWaitingDeleteResponse,
            [storyId]: false
          }
        });
      }
    });
  };

  getCurrentStoriesList(currentPageNum) {
    const myStoriesList = this.props.myStoriesList;

    // Return currentStoriesList if exist for current page
    if (
      this.currentStoriesList &&
      this.currentStoriesList.page === currentPageNum &&
      this.currentStoriesList.full === myStoriesList
    )
      return this.currentStoriesList;

    // Make and return new currentStoriesList, if myStoriesList already fetched
    if (myStoriesList) {
      const storiesOnPage = this.storiesOnPage;

      // Slice stories for current page
      const currentStoriesList = myStoriesList.slice(
        (currentPageNum - 1) * storiesOnPage,
        currentPageNum * storiesOnPage
      );
      currentStoriesList.page = currentPageNum; // Point page of stories
      currentStoriesList.full = myStoriesList; // Point full list

      this.currentStoriesList = currentStoriesList; // Save current list

      return currentStoriesList;
    }

    // Return null if can not return list
    return null;
  }

  getPages() {
    if (this.props.myStoriesList) {
      const mainAddress = this.mainAddress;
      const pages = [];
      pages.push({ href: mainAddress, text: `Page 1` });

      const pagesAmount = Math.ceil(
        this.props.myStoriesList.length / this.storiesOnPage
      );
      // debugger;
      for (let i = 2; i <= pagesAmount; i++) {
        pages.push({ href: `${mainAddress}/${i}`, text: `Page ${i}` });
      }

      return pages;
    }

    // Return null if can not return pages
    return null;
  }
}

PageContentMyStories.propTypes = {
  myStoriesList: PropTypes.array,
  fetchMyStories: PropTypes.func.isRequired,
  deleteMyStory: PropTypes.func.isRequired,
  myStoriesFetchState: PropTypes.string,
  user: PropTypes.shape({})
};

const mapStateToProps = state => ({
  myStoriesList: myStoriesList(state),
  myStoriesFetchState: myStoriesFetchState(state),
  user: user(state)
});

const mapDispatchToProps = {
  fetchMyStories,
  deleteMyStory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMyStories);
