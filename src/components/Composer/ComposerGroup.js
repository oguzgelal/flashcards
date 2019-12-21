import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Icon, Heading, Card } from 'evergreen-ui';

import Clickable from '../Clickable';

const Wrapper = styled(Card)`
  border-top: none;
`;

const gap = 8;

const Cover = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: ${gap + 6}px;
  background-color: inherit;
  z-index: 10;

  @media ${p => p.theme.mobile} {
    display: none;
  }
  ${p => p.forceMobile && `
    display: none;
  `}
`;


const composerHeaderMobile = p => `
  padding-left: 22px;
  padding-right: 22px;
  border-radius: 0;
  border-left: none;
  border-right: none;
  top: 0px;
`;
const ComposerHeader = styled(Clickable).attrs({ useCard: true })`
  position: sticky;
  top: ${gap}px;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 22px 42px;
  background-color: white;
  position: sticky;
  z-index: 11;

  ${p => !p.open && `
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
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
  border: none;
`;
const ComposerBody = styled(Card)`
  padding: 22px 42px;
  padding-bottom: 32px;
  padding-top: 12px;
  border-top: none;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  margin-top: -4px;
  background-color: transparent;

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
    <>
      <Cover forceMobile={props.forceMobile} />
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
          <ComposerBody forceMobile={props.forceMobile}>
            {props.children}
          </ComposerBody>
        )}
      </Wrapper>
    </>
  )
};

ComposerGroup.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  children: PropTypes.any,
  forceMobile: PropTypes.bool,
};

export default ComposerGroup;
