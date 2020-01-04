import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Icon, Heading, Pane } from 'evergreen-ui';

import Clickable from '../Clickable';

const borderRadius = 4;

const Wrapper = styled(Pane)`
  border-top: none;
`;

const composerHeaderMobile = p => `
  padding-left: 22px;
  padding-right: 22px;
  border-radius: 0;
  border-left: none;
  border-right: none;
  top: -1px;
`;

const ComposerHeader = styled(Clickable)`
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 22px 42px;
  background-color: white;
  z-index: 11;
  position: sticky;
  top: ${-1 * borderRadius}px;
  background-color: rgba(255, 255, 255, .98);
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;

  ${p => !p.open && `
    border-bottom-left-radius: ${borderRadius}px;
    border-bottom-right-radius: ${borderRadius}px;
  `}

  @media ${p => p.theme.mobile} {
    ${p => composerHeaderMobile(p)}
  }
  ${p => p.forceMobile && `
    ${composerHeaderMobile(p)}
  `}
`;

const composerBodyMobile = p => `
  padding: ${p.theme.bodyPadding}px;
  padding-top: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
`;
const ComposerBody = styled(Pane)`
  padding: 22px 42px;
  padding-bottom: 32px;
  padding-top: 12px;
  border-top: none;
  border-bottom-right-radius: ${borderRadius}px;
  border-bottom-left-radius: ${borderRadius}px;
  margin-top: -4px;
  background-color: white;

  @media ${p => p.theme.mobile} {
    ${p => composerBodyMobile(p)}
  }
  ${p => p.forceMobile && `
    ${composerBodyMobile(p)}
  `}
`;

const ComposerGroup = props => {
  const [open, setOpen] = useState(true);

  return (
    <Wrapper>
      <ComposerHeader
        border
        open={open}
        onClick={() => setOpen(!open)}
        forceMobile={props.forceMobile}
      >
        <Heading>{props.title}</Heading>
        <div style={{ flexGrow: 1 }} />
        {open && <Icon icon="caret-down" />}
        {!open && <Icon icon="caret-right" />}
      </ComposerHeader>
      {open && (
        <ComposerBody border forceMobile={props.forceMobile}>
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
  forceMobile: PropTypes.bool,
};

ComposerGroup.defaultProps = {
}

export default ComposerGroup;
