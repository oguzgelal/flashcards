import PropTypes from 'prop-types';

export const sessionTablePropTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired, // set id
  // TODO ...
});

export default PropTypes.objectOf(
  sessionTablePropTypes
);
