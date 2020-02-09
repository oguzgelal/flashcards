import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { Select } from "@blueprintjs/select";
import {
  Button,
  Menu,
  HTMLSelect,
  FormGroup,
  InputGroup,
  Intent,
  Icon
} from "@blueprintjs/core";

import tmpdata from '../../../lib/tmpdata';

const Wrapper = styled.div``;

// TODO: move out ---
const LabelWrapper = styled.label`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const LabelText = styled.div`
  color: ${p => p.theme.colors.intent[p.intent]};
`;
const LabelIcon = styled.div`
  margin-right: 3px;
  color: ${p => p.theme.colors.intent[p.intent]};
`;
const Label = props => (
  <LabelWrapper>
    {/* success icon */}
    {props.intent === Intent.SUCCESS && (
      <LabelIcon className="animated bounceIn" intent={props.intent}>
        <Icon icon="small-tick" />
      </LabelIcon>
    )}
    {/* label text */}
    <LabelText intent={props.intent}>
      {props.children}
    </LabelText>
  </LabelWrapper>
);
// TODO: move out ---

// TODO: move out ---
const FormGroupStyled = styled(FormGroup)`
  .bp3-form-content {
    flex-grow: 1;
    .bp3-popover-wrapper {
      width: 100%;
      .bp3-popover-target {
        width: 100%;
        .bp3-button-text {
          flex-grow: 1;
        }
      }
    }
  }
`;
// TODO: move out ---

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

  getSelectedSet() {
    const sets = get(tmpdata, 'sets');
    return get(sets, this.props.setId);
  }

  getSelectedTopic() {
    const topics = get(tmpdata, 'topics');
    return get(topics, this.props.topicId);
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
    this.props.onChange({ title });
  }

  render() {

    const sets = get(tmpdata, 'sets');
    const topics = get(tmpdata, 'topics');
    
    const selectedSet = this.getSelectedSet();
    const selectedTopic = this.getSelectedTopic();

    const hasTopic = !!selectedTopic;
    const hasSet = !!selectedSet;

    const topicSelectDisabled = hasTopic;
    const setSelectDisabled = !hasTopic || hasSet;

    return (
      <Wrapper>

        {/* topic */}
        <FormGroupStyled
          inline
          label={<Label intent={hasTopic ? Intent.SUCCESS : null}>Topic</Label>}
        >
          <Select
            resetOnSelect
            resetOnClose
            filterable={false}
            disabled={topicSelectDisabled}
            items={Object.values(topics)}
            onItemSelect={i => this.props.onChange({ topicId: i.id }, this.updateTitle)}
            itemRenderer={(item, { handleClick, modifiers }) => {
              return (
                <Menu.Item
                  multiline
                  key={get(item, 'id')}
                  icon="application"
                  text={get(item, 'title')}
                  active={modifiers.active}
                  onClick={handleClick}
                />
              )
            }}
          >
            <Button
              fill
              rightIcon="caret-down"
              disabled={topicSelectDisabled}
            >
              {get(topics, `${this.props.topicId}.title`, 'Select')}
            </Button>
          </Select>
        </FormGroupStyled>


        {/* set */}
        <FormGroupStyled
          inline
          label={<Label intent={hasSet ? Intent.SUCCESS : null}>Set</Label>}
        >
          <Select
            resetOnSelect
            resetOnClose
            filterable={false}
            disabled={setSelectDisabled}
            items={Object.values(sets)}
            onItemSelect={i => this.props.onChange({ setId: i.id }, this.updateTitle)}
            itemRenderer={(item, { handleClick, modifiers }) => {
              return (
                <Menu.Item
                  multiline
                  key={get(item, 'id')}
                  icon="application"
                  text={get(item, 'title')}
                  active={modifiers.active}
                  onClick={handleClick}
                />
              )
            }}
          >
            <Button
              fill
              rightIcon="caret-down"
              disabled={setSelectDisabled}
            >
              {get(sets, `${this.props.setId}.title`, 'Select')}
            </Button>
          </Select>
        </FormGroupStyled>
        
        {/* session name */}
        <FormGroupStyled
          inline
          label={<Label intent={!!this.props.title ? Intent.SUCCESS : null}>Title</Label>}
        >
          <InputGroup
            required
            value={this.props.title}
            onChange={e => this.props.onChange({ title: e.target.value })}
            disabled={!hasTopic || !hasSet}
          />
        </FormGroupStyled>

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
  ...flashcardSettingsPropTypes,
  onChange: PropTypes.func.isRequired,
};

FlashcardSettings.defaultProps = {
  onChange: () => {},
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
