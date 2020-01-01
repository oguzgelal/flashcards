import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';

import { Icon, Portal, Pane, SideSheet, Heading, Paragraph } from 'evergreen-ui';
import { MinimalButton } from '../Button';

import { isMobile, useIsDevice } from '../../utils/isDevice';

const Body = styled(Pane)`
  overflow-y: scroll;
  padding: ${p => p.theme.bodyPadding}px;
`;

const Header = styled(Pane)`
  flex-shrink: 0;
  z-index: 1;
  padding: ${p => p.theme.bodyPadding}px;
  display: flex;
`;

const HeadingContainer = styled(Pane)`
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const CloseButtonContainer = styled(Pane)`
  flex-shrink: 0;
`;

const CloseButtonAbsoluteContainer = styled(Pane)`
  background-color: transparent;
  position: absolute;
  top: 12px;
  right: 12px;
`;

const MinimalButtonStyled = styled(MinimalButton)`
  padding: 8px;
  border-radius: 50%;
  height: unset;
`;

const SideSheetComponent = props => {

  const mobile = useIsDevice(isMobile);

  const closeButton = (
    <MinimalButtonStyled onClick={props.close}>
      <Icon icon="cross" />
    </MinimalButtonStyled>
  );

  return (
    <Portal>
      <SideSheet
        width={mobile ? '100%' : 420}
        isShown={props.isOpen}
        onCloseComplete={props.close}
        preventBodyScrolling
        containerProps={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
        }}
      >

        {/* header */}
        {!isNil(props.title) && (
          <Header elevation={0}>
            {/* heading */}
            <HeadingContainer>
              {/* heading title */}
              <Heading size={600}>{props.title}</Heading>
              {/* heading description */}
              {props.desc && (
                <Paragraph size={400}>{props.desc}</Paragraph>
              )}
            </HeadingContainer>

            {/* mobile close button */}
            {mobile && (
              <CloseButtonContainer>
                {closeButton}
              </CloseButtonContainer>
            )}
          </Header>
        )}

        {/* close button */}
        {isNil(props.title) && mobile && (
          <CloseButtonAbsoluteContainer>
            {closeButton}
          </CloseButtonAbsoluteContainer>
        )}

        {/* sidesheet body */}
        <Body
          background="tint2"
          {...(props.bodyProps || {})}
          style={props.bodyStyle}
        >
          {props.children}
        </Body>

      </SideSheet>
    </Portal>
  )
};

SideSheetComponent.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  title: PropTypes.any,
  desc: PropTypes.any,
  children: PropTypes.any,
  bodyProps: PropTypes.object,
  bodyStyle: PropTypes.object,
};

export default SideSheetComponent;
