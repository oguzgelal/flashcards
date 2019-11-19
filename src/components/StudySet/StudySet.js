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

const Wrapper = styled(Card)`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  padding: 22px;
  background-color: ${p => p.theme.colors.background.tint1};
  display: flex;
  flex-flow: column;
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
          <Dotdotdot clamp={1}>
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
