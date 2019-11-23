import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import Grid from '../../components/Grid';
import StudySet from '../../components/StudySet';

import data from '../../lib/tmpdata';

const ScreenStudyTopic = props => {
  const topicSets = get(props, 'topic.sets');
  const topicId = get(props, 'topic.id');

  return (
    <Grid>
      {topicSets.map(topicSetId => (
        <StudySet
          key={`study_set_${topicId}_${topicSetId}`}
          set={get(data, `sets['${topicSetId}']`)}
        />
      ))}
    </Grid>
  )
};

ScreenStudyTopic.propTypes = {
  topic: PropTypes.object,
};

ScreenStudyTopic.defaultProps = {
  topic: {}
}

export default ScreenStudyTopic;
