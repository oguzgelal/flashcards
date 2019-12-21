import PropTypes from 'prop-types';
import flashcardsPropTypes from './flashcardsPropTypes';


export default PropTypes.objectOf({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  topic: PropTypes.string.isRequired,
  flashcards: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
})
