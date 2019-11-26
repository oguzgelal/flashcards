import generateId from './generateId';
import { SESSION_FLASHCARD } from '../config/sessionKinds';

export const generateOrigin = ({ setId, topicId, flashcardId }) => (
  generateId({ uniq: [topicId, setId, SESSION_FLASHCARD, flashcardId] })
);
