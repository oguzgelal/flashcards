import get from 'lodash/get';
import SessionKind from './SessionKind';
import generateId, { DEL } from '../utils/generateId';
import { encode } from '../utils/b64';

import data from '../lib/tmpdata';

export const SESSION_KIND_FLASHCARD = 'flashcard';

class Flashcards extends SessionKind {

  generateOrigin({ setId, topicId, flashcardId }) {
    return encode({ setId, topicId, flashcardId });
  };
}

export default new Flashcards();
