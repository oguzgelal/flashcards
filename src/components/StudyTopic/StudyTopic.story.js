import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Grid from '../Grid';
import StudyTopic from './StudyTopic';
import StudySet from '../StudySet';
import data from '../../lib/tmpdata';

const story = storiesOf(`Core/StudyTopic`, module);

const wrap = stuff => (
  <BrowserRouter>{stuff}</BrowserRouter>
);

story.add('basic', () => {
  const topic = data.topics.japanese;
  return wrap(<StudyTopic topic={topic} />);
});

story.add('with sets', () => {
  const topic = data.topics.japanese;
  const set1 = data.sets.kanji;
  const set2 = data.sets.radicals;
  const set3 = data.sets.vocab;

  return wrap(
    <StudyTopic topic={topic}>
      <Grid columns={3}>
        <StudySet set={set1} />
        <StudySet set={set2} />
        <StudySet set={set3} />
      </Grid>
    </StudyTopic>
  );
});
