import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import { Pane } from 'evergreen-ui';

import Button from './Button';

const Wrapper = styled(Pane)`
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 3px;
  overflow: hidden;
`;

const ButtonStyled = styled(Button)`
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 0;
  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  &:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &:not(:first-of-type) {
    margin-left: -1px;
  }
`;

const ButtonGroup = props => {
  const buttons = get(props, 'buttons') || [];
  return (
    <Wrapper>
      {buttons.map(({ children, label, ...p }) => (
        <ButtonStyled
          {...p}
          {...(props.buttonProps || {})}
          style={{
            ...(get(p, 'style') || {}),
            ...(props.buttonStyles || {})
          }}
        >
          {children || label}
        </ButtonStyled>
      ))}
    </Wrapper>
  )
};

export const buttonsPropType = PropTypes.arrayOf(PropTypes.object);

ButtonGroup.propTypes = {
  // array of props of the buttons
  buttons: buttonsPropType,
  // styles that will be applied to all buttons
  buttonStyles: PropTypes.object,
  // props that will be applied to all buttons
  buttonProps: PropTypes.object,
};

export default ButtonGroup;
