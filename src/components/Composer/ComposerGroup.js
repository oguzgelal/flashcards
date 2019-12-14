import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Icon, Heading, Pane, Card } from 'evergreen-ui';

import Clickable from '../Clickable';

const Wrapper = styled(Card)`
  background-color: ${p => p.theme.colors.background.tint2};
`;

const ComposerHeader = styled(Clickable).attrs({ useCard: true })`
  display: flex;
  align-items: center;
  padding: 22px 42px;
  background-color: white;
  position: sticky;
  top: -5px;
  z-index: 10;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  ${p => !p.open && `
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom: none;
  `}
`;

const ComposerBody = styled(Pane)`
  padding: 22px 42px;
  padding-bottom: 32px;
  border-top: none;
`;

const ComposerGroup = props => {
  const [open, setOpen] = useState(true);

  return (
    <Wrapper border>
      <ComposerHeader
        borderBottom
        open={open}
        onClick={() => setOpen(!open)}
      >
        <Heading>{props.title}</Heading>
        <div style={{ flexGrow: 1 }} />
        {open && <Icon icon="caret-down" />}
        {!open && <Icon icon="caret-right" />}
      </ComposerHeader>
      {open && (
        <ComposerBody>
          {props.children}
        </ComposerBody>
      )}
    </Wrapper>
  )
};

ComposerGroup.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default ComposerGroup;
