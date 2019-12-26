import PropTypes from 'prop-types';


export default PropTypes.objectOf({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  topic: PropTypes.string.isRequired,
  flashcards: PropTypes.object, // { <id>: true, ... }
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
})
