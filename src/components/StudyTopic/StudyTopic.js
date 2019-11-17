import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';

import { Heading, Paragraph, Pane, Card } from 'evergreen-ui';

const Wrapper = styled(Card)`
  padding: 22px;
  padding-bottom: 32px;
  width: 100%;
  height: auto;
  background-color: white;
`;

const TitleWrapper = styled(Pane)``;
const Title = styled(Heading)``;
const Description = styled(Paragraph)`
  margin-top: 4px;
`;

const ContentsWrapper = styled(Pane)`
  margin-top: 22px;
`;

const StudyTopic = ({ title, description, children, ...props } = {}) => (
  <Wrapper border {...props}>
    <TitleWrapper>
      <Title size={700}>{title}</Title>
      {!isNil(description) && (
        <Description>{description}</Description>
      )}
      <ContentsWrapper>
        {children}
      </ContentsWrapper>
    </TitleWrapper>
  </Wrapper>
);

StudyTopic.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.any,
};

export default StudyTopic;
