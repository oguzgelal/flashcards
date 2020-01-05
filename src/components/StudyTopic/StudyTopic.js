import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Badge, { Badges } from '../Badge';
import SimpleCard from '../SimpleCard';

const StudyTopic = ({ topic, children, ...props } = {}) => {

  const topicId = get(topic, 'id');
  const topicTitle = get(topic, 'title');
  const topicDesc = get(topic, 'description');
  const topicSets = get(topic, 'sets') || [];
  const topicSetsCount = topicSets.length;

  return (
    <SimpleCard
      key={`topic-${topicId}`}
      title={topicTitle}
      titleProps={{ size: 700 }}
      desc={topicDesc}
      headerChildren={(
        <Badges>
          <Badge color={!topicSetsCount ? 'yellow' : 'blue'}>
            {!topicSetsCount ? 'No' : topicSetsCount} Set{topicSetsCount === 1 ? '' : 's'}
          </Badge>
        </Badges>
      )}
    >
      {children}
    </SimpleCard>
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
