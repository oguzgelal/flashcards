import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Tag, Card, H3, Intent } from "@blueprintjs/core";

const StudyTopic = ({ topic, children, ...props } = {}) => {

  const topicId = get(topic, 'id');
  const topicTitle = get(topic, 'title');
  const topicDesc = get(topic, 'description');
  const topicSets = get(topic, 'sets') || [];
  const topicSetsCount = topicSets.length;

  return (
    <Card key={`topic-${topicId}`}>
      <H3>{topicTitle}</H3>
      <p>{topicDesc}</p>
      <p>
        <Tag intent={Intent.PRIMARY}>
          {!topicSetsCount ? 'No' : topicSetsCount} Set{topicSetsCount === 1 ? '' : 's'}
        </Tag>
      </p>
      <p style={{ marginTop: 22 }}>
        {children}
      </p>
    </Card>
  );
};

StudyTopic.propTypes = {
  children: PropTypes.any,
  topic: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default StudyTopic;
