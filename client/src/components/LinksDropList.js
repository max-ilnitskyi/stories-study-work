import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import constants from '../constants';

const pageCommon = css`
  display: block;
  width: 150px;
  padding: 5px;
  padding-right: 20px;

  font-size: 18px;
  color: ${constants.styles.DARK_SECONDARY_COLOR};
  cursor: pointer;
  text-decoration: none;
  background-color: #fff;
  border: 2px solid currentColor;

  &:hover,
  &:active {
    color: ${constants.styles.SECONDARY_COLOR};
  }
`;

const LinksDropListWrap = styled.div`
  position: relative;
`;

const PlaceHolder = styled.div`
  ${pageCommon}

  :focus {
    background-color: #ddd;
  }

  :before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 8px solid currentColor;
    border-bottom: 0px solid transparent;
    right: 4px;
    top: 45%;
  }
`;

const LinksList = styled.div`
  position: absolute;
  z-index: 10;
  max-height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 1px solid rgba(0, 0, 0, 0.3);
  ${({ side }) => (side === 'bottom' ? 'top: 100%;' : 'bottom: 100%;')}
`;

const LinksItem = styled.div``;

const StyledLink = styled(Link)`
  ${pageCommon}
`;
const Backgroung = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

class LinksDropList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      side: 'bottom'
    };
  }

  render() {
    const { pages, currentPageNum } = this.props;
    const { isOpen, side } = this.state;

    const currentPage = pages[currentPageNum - 1];

    return (
      <LinksDropListWrap>
        {isOpen && (
          <Backgroung data-drop="back" onClick={this.handleBackClick} />
        )}

        <PlaceHolder onClick={this.handlePlaceHolderClick} tabIndex="0">
          {currentPage.text}
        </PlaceHolder>

        {isOpen && (
          <LinksList side={side}>
            {pages.map(item => (
              <LinksItem key={item.text}>
                <StyledLink onClick={this.handlePageClick} to={item.href}>
                  {item.text}
                </StyledLink>
              </LinksItem>
            ))}
          </LinksList>
        )}
      </LinksDropListWrap>
    );
  }

  componentDidMount() {
    window.document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.handleEscapeDown);
  }

  handleBackClick = event => {
    if (!this.state.isOpen || event.target.dataset.drop !== 'back') return;

    this.setState({ isOpen: false });
  };

  handlePageClick = event => {
    this.setState({ isOpen: false });
  };

  handleEscapeDown = e => {
    if (!this.state.isOpen) return;

    if (e.key === 'Escape') {
      this.setState({ isOpen: false });
    }
  };

  handlePlaceHolderClick = event => {
    const isClickAboveCenter = event.clientY * 2 < window.innerHeight;
    const side = isClickAboveCenter ? 'bottom' : 'top';
    this.setState({ isOpen: true, side });
  };
}

LinksDropList.propTypes = {
  pages: PropTypes.array,
  currentPageNum: PropTypes.number
};

export default LinksDropList;
