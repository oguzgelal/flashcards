import PropTypes from 'prop-types';

/**
 * This is a study set. A study set has a list of study material data with
 * custom key value pairs, and configurations instructing how the flashcards,
 * tables, questions, notes etc. should be generated based on given data.
 *
 * @typedef {object} Set
 */

export default {


  /**
   * @param {string} id - Unique identifier for the set
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
   * @param {topic} topic - Id of the parent topic
   */
  topic: PropTypes.string.isRequired,


  /**
   * @param {object.<string, string>} keys
   *
   * Key - value pairs. Keys are the  variables used in this
   * configuration, values are the description of what the
   * variable represents.
   *
   * @example
   *
   *    keys: {
   *      'V': 'Vocabulary',
   *      'D': 'Definition',
   *      'H': 'Hint',
   *    }
   */
  keys: PropTypes.objectOf(PropTypes.string),


  /**
   * @param {array.<string>} tags
   *
   * Introduce tags available for this set. the value of the
   * tags should be keys (from the keys section)
   *
   * @example
   *
   *    keys: { 'T_NEW': 'New', 'T_IMP': 'Important', ... },
   *    tags: [ 'T_NEW', 'T_IMP' ]
   */
  tags: PropTypes.arrayOf(PropTypes.string),


  /**
   * @param {array.<object>} data
   *
   * The data array for the material in this set. Each item should
   * be an object with custom key - value pairs, keys being keys
   * defined in the `keys` section. There is no restrictions on
   * how the key / values should be defined, but they should be
   * consistent. Ever item is required to have an id
   *
   * @example
   *
   *    keys: { 'K': 'Kanji', 'M': 'Meaning', 'E': 'Example' },
   *    data: [
   *      { 'id': 1, 'K': '本', 'M': 'Book', 'E': '日本' },
   *      { 'id': 2, 'K': '国', 'M': 'Country', 'E': '中国' },
   *    ]
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),


  /**
   * @param {array.<object>} flashcards
   *
   * Flashcard definitions. Every item in the array is a different
   * configuration. The value of `front`, `back` and `hint` should
   * be keys from the keys of data points, which must be defined in
   * the `keys` section.
   *
   * @example
   *
   *    keys: { 'K': 'Kanji', 'M': 'Meaning', 'E': 'Example' },
   *    data: [
   *      { 'id': 1, 'K': '本', 'M': 'Book', 'E': '日本' },
   *      { 'id': 2, 'K': '国', 'M': 'Country', 'E': '中国' },
   *    ],
   *   flashcards: [
   *     { 'id': 'f1', 'front': 'K', 'back': 'M', 'hint': 'E' },
   *     { 'id': 'f1', 'front': 'M', 'back': 'K' },
   *   ]
   */
  flashcards: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      front: PropTypes.string.isRequired,
      back: PropTypes.string.isRequired,
      hint: PropTypes.string,
    })
  ),
}
