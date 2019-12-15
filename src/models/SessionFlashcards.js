import get from 'lodash/get';
import Session from './Session';

export const SESSION_KIND_FLASHCARD = 'flashcard';

class SessionFlashcards extends Session {

  generateOrigin({ id, set, topic }) {
    const origin = { type: SESSION_KIND_FLASHCARD, id, set, topic };
    return this.validateOrigin(origin);
  };

}

export default new SessionFlashcards();
