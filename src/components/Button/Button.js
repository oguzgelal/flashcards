import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Button } from 'evergreen-ui';

export default styled(Button)`
  ${p => p.theme.mobile`
    height: 42px;
  `}
`;
