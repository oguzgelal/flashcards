import PropTypes from 'prop-types';

export default PropTypes.objectOf({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.string),
})
