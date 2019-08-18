import React from 'react';
import styled from 'styled-components';

import Container from '../Container';

import constants from '../../constants';

const FooterWrap = styled.div`
  flex-shrink: 0;
  flex-grow: 0;

  color: #fff;
  background-color: ${constants.styles.DARK_PRIMARY_COLOR};
`;

const FooterContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Copyright = styled.p`
  text-align: center;
`;

class Footer extends React.Component {
  render() {
    return (
      <FooterWrap>
        <FooterContainer>
          <Copyright>© Stories, 2019</Copyright>
        </FooterContainer>
      </FooterWrap>
    );
  }
}

export default Footer;
