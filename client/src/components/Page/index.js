import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

const StyledPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

class Page extends React.Component {
  render() {
    return (
      <StyledPage>
        <Header />
        <Main>{this.props.children}</Main>
        <Footer />
      </StyledPage>
    );
  }
}

export default Page;
