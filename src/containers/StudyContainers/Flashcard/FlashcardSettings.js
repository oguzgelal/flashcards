import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { SelectField, TextInputField, SelectMenu } from 'evergreen-ui';
import Button from '../../../components/Button';

import tmpdata from '../../../lib/tmpdata';

const Wrapper = styled.form`
  > div {
    margin-bottom: 12px !important;
  }
`;

class FlashcardSettings extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      settings: {},
    };

    this.set = this.set.bind(this);
  }

  // set defaults
  componentDidMount() {
    // load initial settings into local state
    this.set({ ...(get(this.props, 'initialSettings') || {}) }, () => {

      const sets = get(tmpdata, 'sets');
      const currentSetId = get(this.state, 'settings.setId');
      const selectedSet = get(sets, currentSetId);

      // set default title
      this.set({
        title: (
          get(this.props, 'initialSettings.title') ||
          `${get(selectedSet, 'title') || 'Flashcard'} session`
        )
      })
    })
  }

  set(vals = {}, callback) {
    this.setState({
      settings: {
        ...(get(this.state, 'settings') || {}),
        ...vals
      }
    }, callback)
  }

  render() {

    const sets = get(tmpdata, 'sets');
    const currentSetId = get(this.state, 'settings.setId');
    const selectedSet = get(sets, currentSetId);
    const hasSet = !!selectedSet;

    return (
      <Wrapper
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit({
            settings: this.state.settings,
          })
        }}
      >

        {/* set */}
        <SelectField
          required
          label="Select a set"
          disabled={hasSet}
          value={currentSetId}
          onChange={e => this.set({ setId: e.target.value })}
        >
          {Object.values(sets).map(s => (
            <option value={s.id}>{s.title}</option>
          ))}
        </SelectField>

        {/* session name */}
        <TextInputField
          required
          label="Session Name"
          value={get(this.state, 'settings.title')}
          onChange={e => this.set({ title: e.target.value })}
        />
      </Wrapper>
    );
  }
}

export const flashcardSettingsPropTypes = {
  title: PropTypes.string,
  setId: PropTypes.string,
  front: PropTypes.string,
  back: PropTypes.string,
};

FlashcardSettings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialSettings: flashcardSettingsPropTypes,
};

const mapStateToProps = (state, ownProps) => ({
  // authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardSettings);
