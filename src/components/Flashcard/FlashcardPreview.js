import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import { Pane, Card } from 'evergreen-ui';
import { ButtonGroup, buttonsPropType } from '../Button';

const Wrapper = styled(Card)`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  background-color: ${p => p.theme.flashcardTextColor};
`;

const CardWrapper = styled(Pane)`
  display: flex;
  ${p => p.hasButtons && `
    border-bottom: none;
  `}
`;

const FrontWrapper = styled(Card)`
  width: 50%;
  background-color: ${p => p.theme.flashcardBackground};
  * { color: ${p => p.theme.flashcardTextColor}; }

  ${p => p.hasButtons && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const BackWrapper = styled(Card)`
  width: 50%;
  background-color: ${p => p.theme.flashcardTextColor};
  * { color: ${p => p.theme.flashcardBackground}; }

  ${p => p.hasButtons && `
    border-bottom-right-radius: 0;
  `}
`;

const FooterWrapper = styled(Card)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  * { color: ${p => p.theme.flashcardBackground}; }
`;

const FlashcardPreview = props => {

  const frontItem = get(props, 'frontItem');
  const backItem = get(props, 'backItem');
  const buttons = get(props, 'buttons');

  return (
    <Wrapper>

      <CardWrapper border hasButtons={!isNil(buttons)}>
        <FrontWrapper hasButtons={!isNil(buttons)}>
          {frontItem}
        </FrontWrapper>
        <BackWrapper hasButtons={!isNil(buttons)}>
          {backItem}
        </BackWrapper>
      </CardWrapper>

      {!isNil(buttons) && (
        <FooterWrapper border>
          <ButtonGroup
            buttons={buttons}
            buttonProps={{
              appearance: 'minimal'
            }}
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
  buttons: buttonsPropType,
};

FlashcardPreview.defaultProps = {
}

export default FlashcardPreview;
