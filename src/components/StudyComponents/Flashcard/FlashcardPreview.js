import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import { Pane, Card } from 'evergreen-ui';
import { ButtonGroup, buttonsPropType } from '../../Button';
import FlashcardItem from './FlashcardItem';

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
  min-height: 150px;
  padding-bottom: 22px;
  transform: rotate(-3deg);
  z-index: 3;
  background-color: ${p => p.theme.t.flashcardBgFront()};
  * { color: ${p => p.theme.t.flashcardColorFront()}; }

  ${p => p.hasButtons && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const BackWrapper = styled(Card)`
  width: 50%;
  min-height: 150px;
  padding-bottom: 22px;
  transform: rotate(5deg);
  background-color: ${p => p.theme.t.flashcardBgBack()};
  * { color: ${p => p.theme.t.flashcardColorBack()}; }

  ${p => p.hasButtons && `
    border-bottom-right-radius: 0;
  `}
`;

const FooterWrapper = styled(Card)`
  margin-top: -12px;
  z-index: 9;
  background-color: white;
`;

const Filler = styled(Pane)`
  border-radius: 2px;
  background-color: ${p => p.theme.scales.neutral.N5};
  height: 16px;
  opacity: 0.2;
  width: 90%;
  margin-top: 2px;
`;

const FlashcardPreview = props => {

  const frontItem = get(props, 'frontItem');
  const backItem = get(props, 'backItem');
  const buttons = get(props, 'buttons');

  return (
    <Wrapper>

      <CardWrapper hasButtons={!isNil(buttons)}>

        {/* front card */}
        <FrontWrapper border hasButtons={!isNil(buttons)}>
          {typeof frontItem !== 'string' && frontItem}
          {typeof frontItem === 'string' && (
            <FlashcardItem
              title="Front"
              value={frontItem}
              alignLeft
            />
          )}
          {props.frontFiller && (
            <FlashcardItem
              title="Front"
              value={<Filler />}
              alignLeft
              style={{ marginTop: 12 }}
            />
          )}
        </FrontWrapper>

        {/* back card */}
        <BackWrapper border hasButtons={!isNil(buttons)}>
          {typeof backItem !== 'string' && backItem}
          {typeof backItem === 'string' && (
            <FlashcardItem
              title="Back"
              value={backItem}
              alignLeft
            />
          )}
          {props.backFiller && (
            <FlashcardItem
              title="Back"
              value={<Filler />}
              alignLeft
            />
          )}
        </BackWrapper>
      </CardWrapper>

      {/* cta's */}
      {!isNil(buttons) && (
        <FooterWrapper>
          <ButtonGroup
            buttons={buttons}
            buttonStyles={{
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
  frontFiller: PropTypes.bool,
  frontItem: PropTypes.any,
  backFiller: PropTypes.bool,
  backItem: PropTypes.any,
  buttons: buttonsPropType,
};

FlashcardPreview.defaultProps = {
}

export default FlashcardPreview;
