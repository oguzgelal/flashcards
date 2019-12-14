import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Pane, Card } from 'evergreen-ui';

const styles = props => `
  outline: none;
  &:hover { cursor: pointer; }
  &:focus { box-shadow: 0 0 10px lightgray; }

  ${props.disabled && `
    &:hover { cursor: default; }
    &:focus { box-shadow: none; }
  `}
`;

const BasePane = styled(Pane)`${styles}`;
const BaseCard = styled(Card)`${styles}`;

const Clickable = ({ children, useCard, onClick, disabled, ...props }) => {
  let Base = BasePane;
  if (useCard) Base = BaseCard;

  return (
    <Base
      role="button"
      tabIndex="0"
      disabled={disabled}
      onKeyDown={e => (!disabled && (e.keyCode === 13 || e.keyCode === 32) && typeof onClick === 'function') && onClick(e)}
      onClick={e => { if(!disabled && typeof onClick === 'function') onClick(e); }}
      {...props}
    >
      {children}
    </Base>
  );
};

Clickable.propTypes = {
  children: PropTypes.any,
};

export default Clickable;
