import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.3);
`;

class ModalWrap2 extends React.Component {
  render() {
    return (
      <ModalWrap data-modal="wrap" onClick={this.handleWrapClick}>
        {this.props.children}
      </ModalWrap>
    );
  }

  handleWrapClick = e => {
    if (e.target.dataset.modal === 'wrap') {
      this.props.closeModal();
    }
  };

  handleEscapeDown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.document.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.handleEscapeDown);
  }
}

ModalWrap2.propTypes = {
  children: PropTypes.any.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalWrap2;
