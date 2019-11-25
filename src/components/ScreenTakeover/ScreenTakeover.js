import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Portal, Pane } from 'evergreen-ui';

const Wrapper = styled(Pane)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const ScreenTakeover = ({ children, ...props } = {}) => (
  <Portal>
    <Wrapper {...props}>
      {props.children}
    </Wrapper>
  </Portal>
);

ScreenTakeover.propTypes = {
};

export default ScreenTakeover;
