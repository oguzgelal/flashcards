import api from '../redux/api';

// keys
export const U_KEY = 'users';
export const S_KEY = 'sessions';

// ids
export const U_ID = 'u';
export const S_ID = 's';

const ref = r => api.database.ref(r);

// refs
export const getSessionRef = (uid, sid) => ref(`${S_KEY}/${uid}/${sid}`);
export const getSessionsRef = uid => ref(`${S_KEY}/${uid}`);
export const getUserSessionRef = (uid, sid) => ref(`${U_KEY}/${uid}/${S_KEY}/${sid}`);
export const getUserSessionsRef = uid => ref(`${U_KEY}/${uid}/${S_KEY}`);
