import get from 'lodash/get';
import Session from './Session';

export const SESSION_TYPE_FLASHCARD = 'flashcard';

class SessionFlashcards extends Session {

  generateOrigin({ id, set } = {}) {
    const origin = { type: SESSION_TYPE_FLASHCARD, id, set };
    return this.validateOrigin(origin);
  };

}

export default new SessionFlashcards();
