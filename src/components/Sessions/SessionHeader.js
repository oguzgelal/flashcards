import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Pane } from 'evergreen-ui';
import { IconButton } from '../Button';
import Tooltip from '../Tooltip';

const Wrapper = styled(Pane)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  background-color: transparent;
  border: none;
  position: sticky;
  top: 0;
`;

const Body = styled(Pane)`
  flex-grow: 1;
`;

const SessionHeader = props => (
  <Wrapper>

    {/* header contents */}
    <Body>{props.children}</Body>

    {/* minimize session */}
    {typeof props.minimize === 'function' && (
      <Tooltip content="Minimize">
        <IconButton
          appearance="minimal"
          icon="minus"
          iconSize={22}
          onClick={props.minimize}
        />
      </Tooltip>
    )}


    {/* end session */}
    {typeof props.terminate === 'function' && (
      <Tooltip content="End Session">
        <IconButton
          appearance="minimal"
          icon="cross"
          iconSize={22}
          onClick={props.terminate}
        />
      </Tooltip>
    )}


  </Wrapper>
);

SessionHeader.propTypes = {
  children: PropTypes.any,
  minimize: PropTypes.func,
  terminate: PropTypes.func,
};

export default SessionHeader;
