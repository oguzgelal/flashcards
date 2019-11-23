import PropTypes from 'prop-types';

/**
 * This is a topic. Topics should be used to groups sets.
 *
 * @typedef {object} Topic
 */

export default {

  /**
   * @param {string} id - Unique identifier for the topic
   */
  id: PropTypes.string.isRequired,


  /**
   * @param {string} title - Title of this set
   */
  title: PropTypes.string.isRequired,


  /**
   * @param {string=} description - Brief description of this set
   */
  description: PropTypes.string,


  /**
   * @param {array.<string>} sets - Id's of sets that belongs to this topic.
   */
  sets: PropTypes.arrayOf(PropTypes.string),

}
