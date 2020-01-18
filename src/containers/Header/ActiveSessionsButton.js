import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import { Button, Menu, Toaster } from '@blueprintjs/core';
import { Select } from "@blueprintjs/select";

import SessionLauncherSidesheet from './SessionLauncherSidesheet';

const ButtonStyled = styled(Button)`
  ${p => p.sessionCount && `
      &:after {
        content: '${p.sessionCount}';
        position: absolute;
        top: -6px;
        right: -6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        padding-left: 6px;
        padding-right: 6px;
        font-size: 9px;
        color: white;
        background-color: ${p.theme.bp.ptIntentDanger};
      }
  `}
`;

class ActiveSessionsButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sessionsOpen: false,
    };
  }

  render() {

    const sessions = get(this.props, 'sessions') || {};
    const sessionCount = Object.keys(sessions).length;

    // TODO: make connected dropdown containers using Select for:
    // 1. Active sessions
    // 2. Topics
    // 3. Sets
    // 4. Flashcards
    // 5. ...Other components of the like
    //
    // TODO2: Use #1 here v
    return (
      <>
        <Select
          resetOnSelect
          resetOnClose
          filterable={false}
          items={Object.values(sessions).concat({ newSessionButton: true })}
          onItemSelect={(session, event) => {
            if (session.newSessionButton) this.setState({ sessionsOpen: true });
            else {
              Toaster.create().show({
                icon: 'application',
                message: get(session, 'settings.title') || 'Untitled session'
              })
            }
          }}
          itemRenderer={(session, { handleClick, modifiers }) => {
            if (session.newSessionButton) {
              return (
                <>
                  <Menu.Divider />
                  <Menu.Item
                    icon="add"
                    text="New Session"
                    active={modifiers.active}
                    onClick={handleClick}
                  />
                </>
              )
            }
            return (
              <Menu.Item
                multiline
                key={get(session, 'id')}
                icon="application"
                text={get(session, 'settings.title') || 'Untitled session'}
                active={modifiers.active}
                onClick={handleClick}
              />
            )
          }}
          /*
          itemListRenderer={({ items = [], itemsParentRef, query, renderItem }) => {
            // filter
            const itemsFiltered = items
              .filter(session => {
                if (!query) return true;
                const sessionTitle = get(session, 'settings.title') || '';
                const sessionTitleNormalized = sessionTitle.toLowerCase();
                const queryNormalized = query.toLowerCase();
                return sessionTitleNormalized.indexOf(queryNormalized) > 0;
              });
            // render
            const renderedItems = itemsFiltered
              .map(renderItem)
              .filter(item => item != null);
            return (
              <Menu ulRef={itemsParentRef} style={{ maxWidth: 320 }}>
                  <Menu.Divider title={sessionCount === 0 ? "No Active Sessions" : "Sessions"} />
                  {itemsFiltered.length > 0 && renderedItems}
                  {itemsFiltered.length === 0 && (
                    <Menu.Item
                      disabled={true}
                      text="Nothing here."
                    />
                  )}

              </Menu>
            )
          }}
          */
        >
          <ButtonStyled
            icon="application"
            sessionCount={sessionCount}
            style={Object.assign({}, this.props.style, {
              position: 'relative'
            })}
          />
        </Select>

        <SessionLauncherSidesheet
          isOpen={this.state.sessionsOpen}
          close={() => this.setState({ sessionsOpen: false })}
        />
      </>
    );
  }
}

ActiveSessionsButton.propTypes = {
  style: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  sessions: state.sessions,
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveSessionsButton);
