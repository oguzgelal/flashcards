import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  outline: none;
  &:hover { cursor: pointer; }
  &:focus { box-shadow: 0 0 10px lightgray; }

  ${p => p.disabled && `
    &:hover { cursor: default; }
    &:focus { box-shadow: none; }
  `}
`;

const Clickable = ({ children, onClick, disabled, ...props }) => (
  <Wrapper
    role="button"
    tabIndex="0"
    disabled={disabled}
    onKeyDown={e => (!disabled && (e.keyCode === 13 || e.keyCode === 32) && typeof onClick === 'function') && onClick(e)}
    onClick={e => { if(!disabled && typeof onClick === 'function') onClick(e); }}
    {...props}
  >
    {children}
  </Wrapper>
);

Clickable.propTypes = {
  children: PropTypes.any,
};

export default Clickable;
