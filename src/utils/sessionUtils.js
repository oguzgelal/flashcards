import api from '../redux/api';
import { USERS_KEY, SESSION_KEY } from '../config/dbKeys';

export const getSessionRefs = (userId, sessionId) => ({
  session: api.database.ref(`${SESSION_KEY[0]}/${userId}/${sessionId}`),
  userSession: api.database.ref(`${USERS_KEY[0]}/${userId}/${SESSION_KEY[0]}/${sessionId}`),
})
