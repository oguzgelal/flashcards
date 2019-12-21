import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';

import { Icon, Portal, SideSheet, Pane, Heading, Paragraph } from 'evergreen-ui';
import { HeaderButton } from '../Button';

import { isMobile, useIsDevice } from '../../utils/isDevice';

const Header = styled(Pane)`
  z-index: 1;
  flex-shrink: 0;
  padding: ${p => p.theme.bodyPadding}px;
  display: flex;
`;

const HeadingContainer = styled(Pane)`
  flex-shrink: 0;
  flex-grow: 1;
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

const HeaderButtonStyled = styled(HeaderButton)`
  padding: 8px;
  border-radius: 50%;
  height: unset;
`;

const Body = styled(Pane)`
  flex: 1;
  overflow-y: scroll;
  padding: ${p => p.theme.bodyPadding}px;
`;

const SideSheetComponent = props => {

  const mobile = useIsDevice(isMobile);

  const closeButton = (
    <HeaderButtonStyled onClick={props.close}>
      <Icon icon="cross" />
    </HeaderButtonStyled>
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
          flex: '1',
          flexDirection: 'column',
          zIndex: 999
        }}
      >

        {/* header */}
        {!isNil(props.title) && (
          <Header elevation={0}>
            <HeadingContainer>
              <Heading size={600}>{props.title}</Heading>
              {props.desc && (
                <Paragraph size={400}>
                  {props.desc}
                </Paragraph>
              )}
            </HeadingContainer>

            {mobile && (
              <CloseButtonContainer>
                {closeButton}
              </CloseButtonContainer>
            )}
          </Header>
        )}

        {isNil(props.title) && mobile && (
          <CloseButtonAbsoluteContainer>
            {closeButton}
          </CloseButtonAbsoluteContainer>
        )}

        <Body background="tint2" {...(props.bodyProps || {})} style={props.bodyStyle}>
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
