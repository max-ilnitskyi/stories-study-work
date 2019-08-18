import React from 'react';
// import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import PageContentWrap from '../PageContentWrap';
import FormSigninFull from './FormSigninFull';

class PageLogin extends React.Component {
  render() {
    return (
      <PageContentWrap>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <FormSigninFull />
      </PageContentWrap>
    );
  }
}

export default PageLogin;
