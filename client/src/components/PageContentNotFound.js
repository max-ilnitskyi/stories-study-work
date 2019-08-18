import React from 'react';
import styled from 'styled-components';

import PageContentWrap from './PageContentWrap';

const Pathname = styled.span`
  color: grey;
`;

const ErrorText = styled.h2`
  ${'' /* there must be styles */}
`;

// Not found page for router
function NotFound(props) {
  return (
    <PageContentWrap>
      <ErrorText>
        Sorry, Page <Pathname>{props.location.pathname}</Pathname> not found!
      </ErrorText>
    </PageContentWrap>
  );
}

export default NotFound;
