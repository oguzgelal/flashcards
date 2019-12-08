import PropTypes from 'prop-types';

export default {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  sets: PropTypes.arrayOf(PropTypes.string),
}
