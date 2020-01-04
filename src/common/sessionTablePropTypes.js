import PropTypes from 'prop-types';

export const sessionTablePropTypes = PropTypes.exact({
  id: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired, // set id
  hidden: PropTypes.object, // { <field_key>: true, MM: true, ... }
});

export default PropTypes.objectOf(
  sessionTablePropTypes
);
