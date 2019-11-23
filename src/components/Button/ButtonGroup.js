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
`;

const ButtonStyled = styled(Button)`
  flex-shrink: 0;
  flex-grow: 1;
  &:not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
