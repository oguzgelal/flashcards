import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { STUDY } from '../../config/routes';
import navigate from './../../utils/navigate';
import { Tag, Card, H5, Intent, Button } from "@blueprintjs/core";

const CardBody = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const StudySet = props => {

  const setId = get(props, 'set.id');
  const setTopicId = get(props, 'set.topic');
  const setTitle = get(props, 'set.title');
  const setDesc = get(props, 'set.description');
  const setItems = get(props, 'set.data') || [];
  const setItemsCount = setItems.length;

  return (
    <Card
      interactive
      onClick={() => {
        navigate(`/${STUDY}/${setTopicId}/${setId}`)
      }}
    >
      <H5>{setTitle}</H5>
      <p>{setDesc}</p>
      <p>
        <Tag intent={Intent.PRIMARY}>
          {!setItemsCount ? 'No' : setItemsCount} Item{setItemsCount === 1 ? '' : 's'}
        </Tag>
      </p>
    </Card>
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
