// this component must be rendered in single place
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Container from './Container';

// Lifetime of message
const MESSAGE_LIFE_TIME = 3;

// Show and hide transitions
const SHOW_TRANSITION = 0.5;
const HIDE_TRANSITION = 0.5;

const show = keyframes`
  from {
    opacity: 0;
    margin-bottom: -50px;
  }

  to {
    opacity: 1;
    margin-bottom: 0;
  }
`;

const hide = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const MessagesWrap = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

const Message = styled.p`
  padding: 15px;
`;

const MessageWrap = styled.div`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: rgba(230, 230, 230, 0.9);
  background-color: ${props =>
    (props.type === 'success' && 'rgba(218, 233, 239, 0.9)') ||
    (props.type === 'error' && 'rgba(239, 233, 218, 0.9)')};
  & ${Message} {
    color: #000;
    color: ${props =>
      (props.type === 'success' && '#050') ||
      (props.type === 'error' && '#500')};
  }

  animation: ${show} ${SHOW_TRANSITION + 's'} ease,
    ${hide} ${HIDE_TRANSITION + 's'}
      ${MESSAGE_LIFE_TIME - HIDE_TRANSITION + 's'} ease;
`;

const HideAll = styled.button`
  z-index: 100;
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 5px;

  cursor: pointer;
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 1;
  }
`;

const HideAllContainer = styled(Container)`
  position: relative;
`;

// for future exports
let showMessage, showSuccess, showError;

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    // bindings for exports
    showMessage = this.showMessage.bind(this);
    showSuccess = this.showSuccess.bind(this);
    showError = this.showError.bind(this);
  }

  render() {
    return (
      <MessagesWrap>
        {this.state.messages.map(({ text, type, id }) => (
          <MessageWrap key={id} type={type}>
            <Container>
              <Message type={type}>{text}</Message>
            </Container>
          </MessageWrap>
        ))}

        {this.state.messages.length !== 0 && (
          <HideAllContainer>
            <HideAll onClick={this.handleHideAllButton}>hide all</HideAll>
          </HideAllContainer>
        )}
      </MessagesWrap>
    );
  }

  componentWillUnmount() {
    this.hideAllMessages();
  }

  // Function for export to show message with any type(inform by default)
  showMessage(text, type = 'inform') {
    const id = getNewId(); // Get id for new message

    // Set timeout to hide message
    const hideTimeout = setTimeout(() => {
      this.hideMessage(id);
    }, MESSAGE_LIFE_TIME * 1000);

    // Add new message to state
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text,
          type,
          hideTimeout,
          id
        }
      ]
    });
  }

  // Function for export to show success message
  showSuccess(text) {
    this.showMessage(text, 'success');
  }

  // Function for export to show error message
  showError(text) {
    this.showMessage(text, 'error');
  }

  // Hide message by id
  // In this case message wil be hidden immedeatly, HIDE_TRANSITION will not work
  hideMessage(id) {
    // Get copy of messages array
    const messages = [...this.state.messages];
    // Find message by id
    const targetIndex = messages.findIndex(message => message.id === id);

    // If message founded remove it from array and update state
    if (targetIndex !== -1) {
      messages.splice(targetIndex, 1);
      this.setState({
        messages
      });
    }
  }

  // Hide all messages
  hideAllMessages() {
    // Clear all timeouts
    this.state.messages.forEach(message => {
      clearTimeout(message.hideTimeout);
    });

    // Clear state
    this.setState({
      messages: []
    });
  }

  // Hide all messages by button click
  handleHideAllButton = () => {
    this.hideAllMessages();
  };
}

// Generate unique id for new message
let nextId = 1;
function getNewId() {
  return nextId++;
}

// Prepare to export actions
const messagesActions = {
  showMessage: (...args) => {
    showMessage(...args);
  },
  showSuccess: (...args) => {
    showSuccess(...args);
  },
  showError: (...args) => {
    showError(...args);
  }
};

export default Messages;
export { messagesActions };
