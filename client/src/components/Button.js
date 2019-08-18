import styled, { keyframes, css } from 'styled-components';
import React from 'react';

import constants from '../constants';

const GRADIEN_ANIMATION_BOX_SIZE = '2em';
const ANIMATION_STRIPES_COLOR = 'rgba(0, 0, 0, 0.3)';

const loadingAnimation = keyframes`
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: ${GRADIEN_ANIMATION_BOX_SIZE};
  }
`;

// Can be modefied by props:
// *outline(boolean)
// *color(html color)
// *loading(boolean)
const Button = styled.button.attrs(props => ({
  mainColor: props.color || constants.styles.SECONDARY_COLOR,
  whiteColor: '#fff',
  greyColor: 'grey'
}))`
  display: block;
  padding-right: 0.5em;
  padding-left: 0.5em;
  padding-top: 0;
  padding-bottom: 0;

  font-family: inherit;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  text-align: center;
  border-radius: 0.25em;
  cursor: pointer;
  text-decoration: none;
  transition: 0.1s;

  & * {
    fill: currentColor;
  }

  ${({ outline, mainColor, whiteColor, greyColor }) => `
  color: ${outline ? mainColor : whiteColor};
  border: 2px solid ${mainColor};
  background-color: ${outline ? whiteColor : mainColor};

  :hover {
    color: ${outline ? whiteColor : mainColor};
    background-color: ${outline ? mainColor : whiteColor};
  }

  &[disabled] {
    cursor: default;
    background-color: ${outline ? whiteColor : greyColor};
    color: ${outline ? greyColor : whiteColor};
    border: 2px solid ${greyColor};
  }`}

  ${({ loading }) =>
    loading &&
    css`
      background-image: linear-gradient(
        135deg,
        ${ANIMATION_STRIPES_COLOR} 25%,
        transparent 25%,
        transparent 50%,
        ${ANIMATION_STRIPES_COLOR} 50%,
        ${ANIMATION_STRIPES_COLOR} 75%,
        transparent 75%,
        transparent 100%
      );

      background-size: ${GRADIEN_ANIMATION_BOX_SIZE +
        ' ' +
        GRADIEN_ANIMATION_BOX_SIZE};
      animation: ${loadingAnimation} 1s infinite linear;
    `}
`;

// Returns component with filtrated props
// May be needed when 'as' prop used
Button.withoutCustomProps = Component => ({
  mainColor,
  whiteColor,
  greyColor,
  outline,
  loading,
  ...rest
}) => <Component {...rest} />;

export default Button;
