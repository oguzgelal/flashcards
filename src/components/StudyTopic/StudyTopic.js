import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import get from 'lodash/get';

import { Heading, Paragraph, Pane, Card } from 'evergreen-ui';
import Badge, { Badges } from '../Badge';

const Wrapper = styled(Card)`
  padding: 22px;
  width: 100%;
  height: auto;
  background-color: white;
`;

const TitleWrapper = styled(Pane)``;
const Title = styled(Heading)``;
const Description = styled(Paragraph)``;
const ContentsWrapper = styled(Pane)``;

const StudyTopic = ({ topic, children, ...props } = {}) => {

  const topicId = get(topic, 'id');
  const topicTitle = get(topic, 'title');
  const topicDesc = get(topic, 'description');
  const topicSets = get(topic, 'sets') || [];
  const topicSetsCount = topicSets.length;

  return (
    <Wrapper border {...props}>
      <TitleWrapper>

        {/* title */}
        <Title size={700}>{topicTitle}</Title>

        {/* description */}
        {!!topicDesc && (
          <Description marginTop={4}>
            {topicDesc}
          </Description>
        )}

        {/* badge */}
        <Badges marginTop={8}>
          <Badge color={!topicSetsCount ? 'yellow' : 'blue'}>
            {!topicSetsCount ? 'No' : topicSetsCount} Set{topicSetsCount === 1 ? '' : 's'}
          </Badge>
        </Badges>

        {/* contents */}
        <ContentsWrapper marginTop={22}>
          {children}
        </ContentsWrapper>
      </TitleWrapper>
    </Wrapper>
  )
};

StudyTopic.propTypes = {
  children: PropTypes.any,
  topic: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default StudyTopic;
