import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

import { Pane, Card } from 'evergreen-ui';
import { ButtonGroup, buttonsPropType } from '../../Button';
import FlashcardItem from './FlashcardItem';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  background-color: transparent;
`;

const CardWrapper = styled.div`
  display: flex;
  ${p => p.hasButtons && `
    border-bottom: none;
  `}
`;

const FrontWrapper = styled.div`
  width: 50%;
  min-height: 150px;
  border-radius: 3px;
  padding-bottom: 22px;
  transform: rotate(-3deg);
  border: 1px solid ${p => p.theme.colors.border.default};
  z-index: 3;
  background-color: ${p => p.theme.t.flashcardBgFront()};
  * { color: ${p => p.theme.t.flashcardColorFront()}; }

  ${p => p.hasButtons && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const BackWrapper = styled.div`
  width: 50%;
  min-height: 150px;
  padding-bottom: 22px;
  border-radius: 3px;
  border: 1px solid ${p => p.theme.colors.border.default};
  transform: rotate(5deg);
  background-color: ${p => p.theme.t.flashcardBgBack()};
  * { color: ${p => p.theme.t.flashcardColorBack()}; }
`;

const Filler = styled.div`
  border-radius: 2px;
  background-color: ${p => p.theme.scales.neutral.N5};
  height: 16px;
  opacity: 0.2;
  width: 90%;
  margin-top: 2px;
`;

const FlashcardPreview = props => {

  return (
    <Wrapper>

      <CardWrapper>

        {/* front card */}
        <FrontWrapper>
          <FlashcardItem
            title="Front"
            value={<Filler />}
            alignLeft
            style={{ marginTop: 12 }}
          />
        </FrontWrapper>

        {/* back card */}
        <BackWrapper>
          <FlashcardItem
            title="Back"
            value={<Filler />}
            alignLeft
          />
        </BackWrapper>
      </CardWrapper>

      {/* title 
        <FooterWrapper>
          Flashcards
        </FooterWrapper>
      */}

    </Wrapper>
  )
};

FlashcardPreview.propTypes = {
  frontFiller: PropTypes.bool,
  frontItem: PropTypes.any,
  backFiller: PropTypes.bool,
  backItem: PropTypes.any,
  title: PropTypes.any,
};

FlashcardPreview.defaultProps = {
}

export default FlashcardPreview;
