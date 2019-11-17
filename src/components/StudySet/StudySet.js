import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
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

  const setId = get(props, 'set.id');
  const setTopicId = get(props, 'set.topic');
  const setTitle = get(props, 'set.title');
  const setDesc = get(props, 'set.description');
  const setItems = get(props, 'set.data') || [];
  const setItemsCount = setItems.length;

  return (
    <Wrapper border>

      {/* heading */}
      <HeadingWrapper>

        {/* title */}
        <Title>
          <Dotdotdot clamp={3}>
            {setTitle}
          </Dotdotdot>
        </Title>

        {/* description */}
        {!!setDesc && (
          <Description color="muted" size={400}>
            <Dotdotdot clamp={2}>
              {setDesc}
            </Dotdotdot>
          </Description>
        )}

        {/* badges */}
        <Badges marginTop={8}>
          <Badge color={!setItemsCount ? 'yellow' : 'blue'}>
            {!setItemsCount ? 'No' : setItemsCount} Item{setItemsCount === 1 ? '' : 's'}
          </Badge>
        </Badges>

      </HeadingWrapper>

      <Grow />

      {/* study button */}
      <Button
        is={Link}
        to={`/${STUDY}/${setTopicId}/${setId}`}
        intent="primary"
        display="flex"
        alignItems="center"
        justifyContent="center"
        appearance="primary"
        disabled={setItemsCount === 0}
      >
        Study
      </Button>
    </Wrapper>
  )
};

StudySet.propTypes = {
  set: PropTypes.shape({
    id: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  })
};

export default StudySet;
