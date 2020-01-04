import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter, Link } from 'react-router-dom';

import StudySet from './StudySet';
import data from '../../lib/tmpdata';

const story = storiesOf(`Core/StudySet`, module);

const wrap = stuff => (
  <div style={{ width: 320 }}>
    <BrowserRouter>{stuff}</BrowserRouter>
  </div>
);

story.add('basic', () => {
  const set = data.sets.kanji;
  return wrap(<StudySet set={set} />);
});
