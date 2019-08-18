import React from 'react';
import styled from 'styled-components';

import Container from '../Container';

import bgPattern from '../../assets/imgs/bg-pattern.png';

const MainContentWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 1;

  background-image: url(${bgPattern});
  background-size: 80px;
`;

const MainContentContainer = styled(Container)`
  height: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  background-color: #fff;
`;

class MainContent extends React.Component {
  render() {
    return (
      <MainContentWrap>
        <MainContentContainer>{this.props.children}</MainContentContainer>
      </MainContentWrap>
    );
  }
}

export default MainContent;
