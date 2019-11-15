import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { TextInput } from 'evergreen-ui';

export default styled(TextInput)`
  ${p => p.theme.mobile`
    height: 38px;
  `}
`;
