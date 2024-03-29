import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components/macro';
import get from "lodash/get";

import { Dialog, Classes, Card, H5, Button } from "@blueprintjs/core";

import FlashcardPreview from "../../../components/StudyComponents/Flashcard/FlashcardPreview";
import FlashcardSettings, { flashcardSettingsPropTypes } from "./FlashcardSettings";
import { SESSION_TYPE_FLASHCARD } from "../../../models/SessionFlashcards";

import * as types from "../../../redux/modules/sessions/types";
import * as sessionActions from "../../../redux/modules/sessions/actions";

const DialogStyled = styled(Dialog)`
  background-color: ${p => p.theme.t.appBg()};
`;

class FlashcardLauncher extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      settings: {}
    };

    this.start = this.start.bind(this);
  }

  componentDidMount() {
    this.setState({
      settings: this.props.settings || {}
    });
  }

  start(callback) {
    this.props.sessionActions.sessionStart({
      type: SESSION_TYPE_FLASHCARD,
      settings: this.state.settings, // TODO: apply settings here
      callback: () => {
        if (typeof callback === "function") {
          callback();
        }
      }
    });
  }

  render() {
    const startingSession = get(
      this.props,
      `loading['${types.SESSION_START}_${SESSION_TYPE_FLASHCARD}']`
    );

    return (
      <>
        {/* settings dialog */}
        <DialogStyled
          title="Flashcard Session"
          isOpen={this.state.showSettings}
          onClose={() => this.setState({ showSettings: false })}
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              this.start(() => {
                this.setState({ showSettings: false });
              });
            }}
          >
            <div className={Classes.DIALOG_BODY}>
              <FlashcardSettings
                {...(this.state.settings || {})}
                onChange={(vals = {}, callback) => {
                  this.setState({
                    settings: {
                      ...(this.state.settings || {}),
                      ...vals
                    }
                  }, callback);
                }}
              />
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button type="submit" disabled={startingSession}>
                  {startingSession && "Starting..."}
                  {!startingSession && "Start"}
                </Button>
              </div>
            </div>
          </form>
        </DialogStyled>

        {/* composer */}
        <Card
          interactive
          style={{ opacity: startingSession ? 0.6 : 1 }}
          onClick={() => {
            if (startingSession) return;
            this.setState({
              showSettings: true
            });
          }}
        >
          <H5>Flashcards</H5>
          <FlashcardPreview />
        </Card>
      </>
    );
  }
}

FlashcardLauncher.propTypes = {
  loading: PropTypes.bool,
  sessionActions: PropTypes.object,
  settings: flashcardSettingsPropTypes
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  sessionActions: bindActionCreators(sessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardLauncher);
