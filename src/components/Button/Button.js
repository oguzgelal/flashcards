import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  Button,
  IconButton as IconButtonEvergreen
} from 'evergreen-ui';

export const HeaderButton = styled(Button).attrs({ appearance: 'minimal' })`
  position: relative;
  background-color: white;
  border: 1px solid ${p => p.theme.colors.border.muted};
  color: ${p => p.theme.colors.text.dark};
  padding: 8px 12px;
`;

export const IconButton = styled(IconButtonEvergreen)`
  ${p => p.round && `
    border-radius: 50%;
  `}
`;

export default styled(Button)`
  @media ${p => p.theme.mobile} {
    height: 42px;
  }
`;
