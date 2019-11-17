import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import Dotdotdot from 'react-dotdotdot';
import { Link } from 'react-router-dom';
import { Pane, Card, Heading, Paragraph } from 'evergreen-ui';
import Badge, { Badges } from '../Badge';
import Button from '../Button';
import { STUDY } from '../../config/routes';

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

const Grow = styled(Pane)`
  flex-grow: 1;
`;

const StudySet = props => {
  return (
    <Wrapper border>

      {/* heading */}
      <HeadingWrapper>

        {/* title */}
        <Title>
          <Dotdotdot clamp={3}>
            {props.title}
          </Dotdotdot>
        </Title>

        {/* description */}
        {!!props.description && (
          <Description color="muted" size={400}>
            <Dotdotdot clamp={2}>
              {props.description}
            </Dotdotdot>
          </Description>
        )}

        {/* badges */}
        <Badges marginTop={8}>
          <Badge color={!props.itemCount ? 'yellow' : 'blue'}>
            {!props.itemCount ? 'No' : props.itemCount} Item{props.itemCount === 1 ? '' : 's'}
          </Badge>
        </Badges>

      </HeadingWrapper>

      <Grow />

      {/* study button */}
      <Button
        is={Link}
        to={`/${STUDY}/${props.topicId}/${props.id}`}
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
  id: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  itemCount: PropTypes.number.isRequired,
};

export default StudySet;
