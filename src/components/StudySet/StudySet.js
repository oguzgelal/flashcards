import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import Dotdotdot from 'react-dotdotdot';

import { Pane, Card, Heading, Paragraph, Badge } from 'evergreen-ui';
import Button from '../Button';

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
  height: 200px;
  margin-top: ${gap}px;
  background-color: ${p => p.theme.colors.background.tint1};
  display: flex;
  flex-flow: column;

  /* normal - 3 columns */
  width: calc(33% - ${(gap * 2) / 3}px);

  /* small-ish screens - 2 columns */
  @media ${p => p.theme.tablet} {
    width: calc(50% - ${gap / 2}px);
  }

  /* small screens - 1 column */
  @media ${p => p.theme.mobile} {
    width: 100%;
  }
`;

const HeadingWrapper = styled(Pane)`
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const Title = styled(Heading)``;
const Description = styled(Paragraph)`
  margin-top: 8px;
  line-height: 16px;
`;

const Badges = styled(Pane)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const BadgeStyled = styled(Badge)`
  flex-shrink: 0;
  margin: 0;
  margin-top: 6px;
  margin-right: 6px;
  &:last-of-type { margin-right: 0; }
`;

const Grow = styled(Pane)`
  flex-grow: 1;
`;

const StudySet = props => {
  return (
    <Wrapper border>
      <HeadingWrapper>
        <Title>
          <Dotdotdot clamp={3}>
            {props.title}
          </Dotdotdot>
        </Title>
        <Badges>
          <BadgeStyled color="blue">
            {!props.itemCount ? 'No' : props.itemCount} Item{props.itemCount === 1 ? '' : 's'}
          </BadgeStyled>
        </Badges>
        {!isNil(props.description) && (
          <Description color="muted" size={400}>
            <Dotdotdot clamp={2}>
              {props.description}
            </Dotdotdot>
          </Description>
        )}
      </HeadingWrapper>
      <Grow />
      <Button
        intent="primary"
        display="flex"
        alignItems="center"
        justifyContent="center"
        appearance="primary"
        disabled={props.itemCount === 0}
      >
        Study
      </Button>
    </Wrapper>
  )
};

StudySet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  itemCount: PropTypes.number.isRequired,
};

export default StudySet;
