import PropTypes from 'prop-types';

export const flashcardPropTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
  front: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
  hint: PropTypes.string,
});

export default PropTypes.objectOf(
  flashcardPropTypes
);
