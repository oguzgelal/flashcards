import PropTypes from 'prop-types';

export default {
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
  flashcards: PropTypes.objectOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      front: PropTypes.string.isRequired,
      back: PropTypes.string.isRequired,
      hint: PropTypes.string,
    })
  ),
}
