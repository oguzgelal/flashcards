import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Pane, Card, Text, Heading } from 'evergreen-ui';

const Wrapper = styled(Card)`
  width: 100%;
  display: flex;
  flex-flow: column;
  padding: 22px;
  background-color: ${p => p.theme.colors.background.tint1};
`;

const CardItemWrapper = styled(Text)`
  padding: 22px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  height: auto;
`;

const CardItemTitle = styled(Text).attrs({ size: 300 })``;
const CardItemTitleWrapper = styled(Pane)`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardItemValue = styled(Heading).attrs({ size: 900 })``;
const CardItemValueWrapper = styled(Pane)`
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrontWrapper = styled(Card)`
  background-color: ${p => p.theme.scales.neutral.N10};
  * { color: ${p => p.theme.scales.neutral.N1}; }
`;

const StudyDeck = props => (
  <Wrapper border>
    <FrontWrapper>
      <CardItemWrapper>
        <CardItemTitleWrapper>
          <CardItemTitle>Reading</CardItemTitle>
        </CardItemTitleWrapper>
        <CardItemValueWrapper>
          <CardItemValue>こんにちは</CardItemValue>
        </CardItemValueWrapper>
      </CardItemWrapper>
    </FrontWrapper>
  </Wrapper>
);

StudyDeck.propTypes = {
};

export default StudyDeck;
