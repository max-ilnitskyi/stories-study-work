import styled from 'styled-components';
import { Link } from 'react-router-dom';

import constants from '../constants';

const TextLink = styled.a.attrs({ as: Link })`
  color: ${constants.styles.DARK_SECONDARY_COLOR};

  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export default TextLink;
