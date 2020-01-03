import PropTypes from 'prop-types';

export const sessionFlashcardPropTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired, // set id
  front: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
  hint: PropTypes.string,
});

export default PropTypes.objectOf(
  sessionFlashcardPropTypes
);
