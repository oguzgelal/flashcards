import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Pane, Card, Heading } from 'evergreen-ui';

const gap = 16;

export const StudySetGrid = styled(Pane)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${-1 * gap}px;
`;

const Wrapper = styled(Card)`
  flex-shrink: 0;
  padding: 22px;
  height: 180px;
  margin-top: ${gap}px;
  background-color: white;

  /* normal - 3 columns */
  @media ${p => p.theme.laptop} {
    width: calc(33% - ${(gap * 2) / 3}px);
  }

  /* small-ish screens - 2 columns */
  @media ${p => p.theme.tablet} {
    width: calc(50% - ${gap / 2}px);
  }

  /* small screens - 1 column */
  @media ${p => p.theme.mobile} {
    width: 100%;
  }
`;

const TitleWrapper = styled(Pane)`
  display: flex;
  align-items: center;
`;

const StudySet = props => (
  <Wrapper border>
    <TitleWrapper>
      <Heading>
        {props.title}
      </Heading>
    </TitleWrapper>
  </Wrapper>
);

StudySet.propTypes = {
  title: PropTypes.string,
};

export default StudySet;
