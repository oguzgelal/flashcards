import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import { Pane, Card } from 'evergreen-ui';
import { ButtonGroup, buttonsPropType } from '../Button';

const Wrapper = styled(Pane)`
  width: 100%;
  display: flex;
  flex-flow: column;
  background-color: transparent;
`;

const CardWrapper = styled(Pane)`
  display: flex;
  ${p => p.hasButtons && `
    border-bottom: none;
  `}
`;

const FrontWrapper = styled(Card)`
  width: 50%;
  min-height: 140px;
  padding-bottom: 22px;
  transform: rotate(-3deg);
  z-index: 3;
  background-color: ${p => p.theme.flashcardBgFront};
  * { color: ${p => p.theme.flashcardColorFront}; }

  ${p => p.hasButtons && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const BackWrapper = styled(Card)`
  width: 50%;
  min-height: 140px;
  padding-bottom: 22px;
  transform: rotate(5deg);
  background-color: ${p => p.theme.flashcardBgBack};
  * { color: ${p => p.theme.flashcardColorBack}; }

  ${p => p.hasButtons && `
    border-bottom-right-radius: 0;
  `}
`;

const FooterWrapper = styled(Card)`
  margin-top: -12px;
  z-index: 9;
`;

const FlashcardPreview = props => {

  const frontItem = get(props, 'frontItem');
  const backItem = get(props, 'backItem');
  const buttons = get(props, 'buttons');
  const sessionActive = get(props, 'sessionActive');

  return (
    <Wrapper>

      <CardWrapper hasButtons={!isNil(buttons)}>
        <FrontWrapper border hasButtons={!isNil(buttons)}>
          {frontItem}
        </FrontWrapper>
        <BackWrapper border hasButtons={!isNil(buttons)}>
          {backItem}
        </BackWrapper>
      </CardWrapper>

      {!isNil(buttons) && (
        <FooterWrapper>
          <ButtonGroup
            buttons={buttons}
            buttonStyles={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </FooterWrapper>
      )}

    </Wrapper>
  )
};

FlashcardPreview.propTypes = {
  frontItem: PropTypes.any,
  backItem: PropTypes.any,
  sessionActive: PropTypes.bool,
  buttons: buttonsPropType,
};

FlashcardPreview.defaultProps = {
}

export default FlashcardPreview;
