import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { SelectField } from 'evergreen-ui';
import { Select } from "@blueprintjs/select";
import { Button, Menu, HTMLSelect, FormGroup } from "@blueprintjs/core";
import { TextInputField} from '../../../components/input/TextInput';
import FormFieldHorizontal from '../../../components/input/FormFieldHorizontal';

import tmpdata from '../../../lib/tmpdata';

const Wrapper = styled.div`
  > div,
  > span > div {
    margin-bottom: 14px !important;
  }
`;

class FlashcardSettings extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    this.getSelectedSet = this.getSelectedSet.bind(this);
    this.getSelectedTopic = this.getSelectedTopic.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  // set defaults
  componentDidMount() {
    this.updateTitle();
  }

  updateTitle() {
    // get selected items
    const selectedSet = this.getSelectedSet();
    const selectedTopic = this.getSelectedTopic();
    // construct title
    let title = 'Flashcards';
    if (get(selectedSet, 'title')) title = `${get(selectedSet, 'title')} ${title}`;
    if (get(selectedTopic, 'title')) title = `${get(selectedTopic, 'title')}: ${title}`;
    // set default title
    this.props.onChange({ title })
  }

  getSelectedSet() {
    const sets = get(tmpdata, 'sets');
    const currentSetId = get(this.props, 'settings.setId');
    return get(sets, currentSetId);
  }

  getSelectedTopic() {
    const topics = get(tmpdata, 'topics');
    const currentTopicId = get(this.props, 'settings.topicId');
    return get(topics, currentTopicId);
  }

  render() {
    const sets = get(tmpdata, 'sets');
    const topics = get(tmpdata, 'topics');
    const currentSetId = get(this.props, 'settings.setId');
    const currentTopicId = get(this.props, 'settings.topicId');
    const selectedSet = get(sets, currentSetId);
    const selectedTopic = get(topics, currentTopicId);
    const hasTopic = !!selectedTopic;
    const hasSet = !!selectedSet;

    return (
      <Wrapper>

        {/* topic */}
        <FormGroup inline label="Topic">
          <Select
            resetOnSelect
            resetOnClose
            filterable={false}
            items={Object.values(topics)}
            onItemSelect={(item, event) => {}}
            itemRenderer={(item, { handleClick, modifiers }) => {
              return (
                <Menu.Item
                  multiline
                  key={get(item, 'id')}
                  icon="application"
                  text={get(item, 'title')}
                  onClick={() => {}}
                />
              )
            }}
          >
            <Button fill>
              {get(topics, `${currentTopicId}.title`)}
            </Button>
          </Select>
        </FormGroup>

        {/*
          <FormFieldHorizontal labelWidth={50}>
            <SelectField
              required
              label="Topic"
              disabled={hasTopic}
              value={currentTopicId}
              onChange={e => this.props.onChange({ topicId: e.target.value }, this.updateTitle)}
            >
              <option value={null}>Select...</option>
              {Object.values(topics).map(t => (
                <option
                  value={t.id}
                  selected={t.id === currentTopicId}
                >
                  {t.title}
                </option>
              ))}
            </SelectField>
          </FormFieldHorizontal>
        */}

        {/* set */}
        <FormFieldHorizontal labelWidth={50}>
          <SelectField
            required
            label="Set"
            disabled={!hasTopic || hasSet}
            value={currentSetId}
            onChange={e => this.props.onChange({ setId: e.target.value }, this.updateTitle)}
          >
            <option value={null}>Select...</option>
            {Object.values(sets).map(s => (
              <option
                value={s.id}
                selected={s.id === currentSetId}
              >
                {s.title}
              </option>
            ))}
          </SelectField>
        </FormFieldHorizontal>

        {/* session name */}
        <FormFieldHorizontal labelWidth={50}>
          <TextInputField
            required
            disabled={!hasTopic || !hasSet}
            label="Title"
            value={get(this.props, 'settings.title')}
            onChange={e => this.props.onChange({ title: e.target.value })}
          />
        </FormFieldHorizontal>

      </Wrapper>
    );
  }
}

export const flashcardSettingsPropTypes = {
  title: PropTypes.string,
  topicId: PropTypes.string,
  setId: PropTypes.string,
  front: PropTypes.string,
  back: PropTypes.string,
};

FlashcardSettings.propTypes = {
  settings: flashcardSettingsPropTypes,
  onChange: PropTypes.func.isRequired,
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
