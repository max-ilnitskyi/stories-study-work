import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from './Button';
import LinksDropList from './LinksDropList';

const LinkForAs = Button.withoutCustomProps(Link);

const PaginationWrap = styled.div`
  display: flex;
`;

const NearButton = styled(Button)`
  &:first-of-type {
    margin-right: 10px;
  }
  &:last-of-type {
    margin-left: 10px;
  }
`;

class Pagination extends React.Component {
  render() {
    const { pages, currentPageNum } = this.props;

    if (!pages) return null;

    const prevPage =
      currentPageNum === 1
        ? { ...pages[0], isDisabled: true }
        : { ...pages[currentPageNum - 2], isDisabled: false };

    const nextPage =
      currentPageNum === pages.length
        ? { ...pages[pages.length - 1], isDisabled: true }
        : { ...pages[currentPageNum], isDisabled: false };

    return (
      <PaginationWrap>
        <NearButton
          as={LinkForAs}
          to={prevPage.href}
          disabled={prevPage.isDisabled}
          onClick={this.handlePageClick}
        >
          Prev.
        </NearButton>

        <LinksDropList pages={pages} currentPageNum={currentPageNum} />

        <NearButton
          as={LinkForAs}
          to={nextPage.href}
          disabled={nextPage.isDisabled}
          onClick={this.handlePageClick}
        >
          Next
        </NearButton>
      </PaginationWrap>
    );
  }

  handlePageClick = event => {
    // Not handle click if link is disabled
    if (event.target.attributes.disabled) event.preventDefault();
  };
}

Pagination.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({ href: PropTypes.string.isRequired })
  ),
  currentPageNum: PropTypes.number
};

export default Pagination;
