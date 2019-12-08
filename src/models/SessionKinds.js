import flashcards, { SESSION_KIND_FLASHCARD } from './Flashcards';

class SessionKinds {

  // return instance of relevant session kind class
  getInstance(sessionKind) {
    if (sessionKind === SESSION_KIND_FLASHCARD) return flashcards;
  }
}

export default new SessionKinds();
