import get from 'lodash/get';
import SessionKind from './SessionKind';

export const SESSION_KIND_FLASHCARD = 'flashcard';

class Flashcards extends SessionKind {

  generateOrigin({ id, set, topic }) {
    return { type: SESSION_KIND_FLASHCARD, id, set, topic };
  };
}

export default new Flashcards();
