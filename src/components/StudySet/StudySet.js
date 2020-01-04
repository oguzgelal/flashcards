import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import Badge, { Badges } from '../Badge';
import Button from '../Button';
import { STUDY } from '../../config/routes';
import SimpleCard from '../SimpleCard';

const StudySet = props => {

  const setId = get(props, 'set.id');
  const setTopicId = get(props, 'set.topic');
  const setTitle = get(props, 'set.title');
  const setDesc = get(props, 'set.description');
  const setItems = get(props, 'set.data') || [];
  const setItemsCount = setItems.length;

  return (
    <SimpleCard
      title={setTitle}
      desc={setDesc}
      headerChildren={(
        <Badges>
          <Badge color={!setItemsCount ? 'yellow' : 'blue'}>
            {!setItemsCount ? 'No' : setItemsCount} Item{setItemsCount === 1 ? '' : 's'}
          </Badge>
        </Badges>
      )}
    >
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
    </SimpleCard>
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
