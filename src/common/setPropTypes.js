import PropTypes from 'prop-types';
import flashcardsPropTypes from './flashcardsPropTypes';


export default PropTypes.objectOf({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  topic: PropTypes.string.isRequired,
  keys: PropTypes.objectOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  flashcards: flashcardsPropTypes,
})
