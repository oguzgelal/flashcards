import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { Pane, Text, Heading } from 'evergreen-ui';

const Wrapper = styled(Text)`
  padding: 22px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: auto;
`;

const CardItemTitle = styled(Text).attrs({ size: 300 })``;
const CardItemTitleWrapper = styled(Pane)`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => p.isAlignedLeft && `justify-content: flex-start;`}
  opacity: 0.5;
`;

const CardItemValue = styled(Heading).attrs({ size: 600 })``;
const CardItemValueWrapper = styled(Pane)`
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  ${p => p.isAlignedLeft && `justify-content: flex-start;`}
  padding-top: 2px;
`;

const FlashcardItem = props => {
  const title = get(props, 'title');
  const value = get(props, 'value');
  const isAlignedLeft = get(props, 'alignLeft');

  return (
    <Wrapper>
      {title && (
        <CardItemTitleWrapper
          isAlignedLeft={isAlignedLeft}
        >
          <CardItemTitle>{title}</CardItemTitle>
        </CardItemTitleWrapper>
      )}
      {value && (
        <CardItemValueWrapper
          isAlignedLeft={isAlignedLeft}
        >
          <CardItemValue>{value}</CardItemValue>
        </CardItemValueWrapper>
      )}
    </Wrapper>
  );
}

FlashcardItem.propTypes = {
  title: PropTypes.any,
  value: PropTypes.any,
  alignLeft: PropTypes.bool,
};

export default FlashcardItem;
