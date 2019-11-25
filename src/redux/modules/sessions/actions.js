import * as types from './types';

export const sessionStart = ({
  kind, // flashcard, reveal_table etc.
  origin, // describes what resource the session was initiated from
}) => ({
  type: types.SESSION_START,
  id: `session_${Math.round(Math.random() * 1000000)}`,
  kind,
  origin,
  startedAt: Date.now(),
  updatedAt: Date.now(),
});

export const sessionUpdate = (id, data) => ({
  type: types.SESSION_UPDATE,
  id,
  data,
  updatedAt: Date.now(),
});

export const sessionStop = id => ({
  type: types.SESSION_STOP,
  id,
});
