import React from 'react';
import styled, { keyframes } from 'styled-components';

const SCALE = 0.8; // How many space to use
const SHOW_TRANSITION = 0.5;

const rotateAnimation = keyframes`
  0% {
    transform: scale(${SCALE}) rotate(0);
  }
  100% {
    transform: scale(${SCALE}) rotate(360deg);
  }
`;

const showAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  padding-left: 15%;
  padding-right: 15%;

  fill: black;
  fill: ${props => props.color};

  animation: ${rotateAnimation} 4s infinite linear,
    ${showAnimation} ${SHOW_TRANSITION + 's'} ease;
`;

const StandartWrap = styled.div`
  max-width: 25vh;
  margin-left: auto;
  margin-right: auto;
`;

// Show spinning gear wheel, uses available space
function Loading(props) {
  const SvgImage = (
    <Svg color={props.color} viewBox="0 0 84 84">
      <path d="M75.921 42c0-5.237 3.224-9.372 8.079-12.213a44.165 44.165 0 0 0-3.459-8.36c-5.444 1.425-9.851-.708-13.555-4.412S62.148 8.903 63.573 3.46A43.995 43.995 0 0 0 55.213 0C52.371 4.856 47.238 8.08 42 8.08c-5.237 0-10.37-3.223-13.213-8.08a44.125 44.125 0 0 0-8.359 3.458c1.424 5.444.291 9.852-3.413 13.557-3.704 3.704-8.112 5.837-13.556 4.414A44.048 44.048 0 0 0 0 29.788C4.855 32.628 8.079 36.764 8.079 42S4.855 52.371 0 55.213a44.147 44.147 0 0 0 3.459 8.361c5.444-1.425 9.852-.291 13.556 3.413 3.703 3.705 4.837 8.111 3.413 13.555A44.042 44.042 0 0 0 28.788 84c2.843-4.855 7.975-8.08 13.212-8.08 5.238 0 10.371 3.225 13.213 8.08a44.031 44.031 0 0 0 8.361-3.46c-1.424-5.442-.292-9.849 3.412-13.554 3.704-3.704 8.111-5.838 13.555-4.413A44.147 44.147 0 0 0 84 54.212c-4.855-2.841-8.079-6.975-8.079-12.212zM42 60.266c-10.087 0-18.265-8.178-18.265-18.266S31.912 23.734 42 23.734 60.265 31.912 60.265 42c0 10.088-8.177 18.266-18.265 18.266z" />
    </Svg>
  );

  if (props.standart) {
    return <StandartWrap>{SvgImage}</StandartWrap>;
  }

  return SvgImage;
}

export default Loading;
