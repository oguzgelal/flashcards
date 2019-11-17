import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';

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

const StudyTopic = ({ title, description, children, ...props } = {}) => (
  <Wrapper border {...props}>
    <TitleWrapper>

      {/* title */}
      <Title size={700}>{title}</Title>

      {/* description */}
      {!!description && (
        <Description marginTop={4}>
          {description}
        </Description>
      )}

      {/* badge */}
      <Badges marginTop={8}>
        <Badge color={!props.setCount ? 'yellow' : 'blue'}>
          {!props.setCount ? 'No' : props.setCount} Set{props.setCount === 1 ? '' : 's'}
        </Badge>
      </Badges>

      {/* contents */}
      <ContentsWrapper marginTop={22}>
        {children}
      </ContentsWrapper>
    </TitleWrapper>
  </Wrapper>
);

StudyTopic.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.any,
  setCount: PropTypes.number,
};

export default StudyTopic;
