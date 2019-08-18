import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { Redirect } from 'react-router-dom';

import PageContentWrap from '../PageContentWrap';
import Loading from '../Loading';
import Paragraph from '../Paragraph';
import StoriesList from '../StoriesList';
import Pagination from '../Pagination';

import {
  allStoriesList,
  allStoriesFetchState
} from '../../store/stories/selectors';
import { fetchAllStories } from '../../store/stories/actions';
import { headTitleAllStories as headTitle } from '../../data';

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

    this.storiesOnPage = 10; // How many stories on page will be showed
    this.mainAddress = '/all-stories';
  }

  render() {
    const currentPageNum = Number(this.props.match.params.page) || 1;
    const isNeedPagination = this.props.allStoriesList
      ? this.props.allStoriesList.length > this.storiesOnPage
      : false;

    const currentStoriesList = this.getCurrentStoriesList(currentPageNum);
    const pages = this.getPages();

    return (
      <PageContentWrap>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>
        {!this.props.allStoriesList &&
          this.props.allStoriesFetchState === 'pending' && <Loading standart />}

        {!this.props.allStoriesList &&
          this.props.allStoriesFetchState === 'error' && (
            <Paragraph>
              Here is some problems in loading data. Try to reload page later.
            </Paragraph>
          )}

        {this.props.allStoriesList &&
          this.props.allStoriesList.length === 0 && (
            <Paragraph>Here are not any stories yet...</Paragraph>
          )}

        {isNeedPagination && (
          <PaginationWrapTop>
            <Pagination pages={pages} currentPageNum={currentPageNum} />
          </PaginationWrapTop>
        )}

        <StoriesList stories={currentStoriesList} global />

        {isNeedPagination && (
          <PaginationWrapBottom>
            <Pagination pages={pages} currentPageNum={currentPageNum} />
          </PaginationWrapBottom>
        )}
      </PageContentWrap>
    );
  }

  componentDidMount() {
    this.props.fetchAllStories();
  }

  getCurrentStoriesList(currentPageNum) {
    // Return currentStoriesList if exist for current page
    if (
      this.currentStoriesList &&
      this.currentStoriesList.page === currentPageNum
    )
      return this.currentStoriesList;

    // Make and return new currentStoriesList, if allStoriesList already fetched
    if (this.props.allStoriesList) {
      const storiesOnPage = this.storiesOnPage;

      // Slice stories for current page
      const currentStoriesList = this.props.allStoriesList.slice(
        (currentPageNum - 1) * storiesOnPage,
        currentPageNum * storiesOnPage
      );
      currentStoriesList.page = currentPageNum; // Point page of stories

      this.currentStoriesList = currentStoriesList; // Save current list

      return currentStoriesList;
    }

    // Return null if can not return list
    return null;
  }

  getPages() {
    if (this.props.allStoriesList) {
      const mainAddress = this.mainAddress;
      const pages = [];
      pages.push({ href: mainAddress, text: `Page 1` });

      const pagesAmount = Math.ceil(
        this.props.allStoriesList.length / this.storiesOnPage
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
  allStoriesList: PropTypes.array,
  fetchAllStories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allStoriesList: allStoriesList(state),
  allStoriesFetchState: allStoriesFetchState(state)
});

const mapDispatchToProps = {
  fetchAllStories
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentMyStories);
