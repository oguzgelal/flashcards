import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { Heading, Table } from 'evergreen-ui';
import SideSheet from '../../components/SideSheet';

class ActiveSessionsSidesheet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const sessions = Object.values(this.props.sessions || {}) || [];
    const sessionsSorted = sessions
      .sort((a, b) => get(a, 'updatedAt') - get(b, 'updatedAt'))

    return (
      <SideSheet
        isOpen={this.props.isOpen}
        close={this.props.close}
        title="Active Sessions"
      >
        <Table.Body>
          {sessionsSorted.map(session => {
            const id = get(session, 'id');
            const title = get(session, 'title');
            return (
              <Table.Row key={id} isSelectable onSelect={() => alert('hello')}>
                <Table.TextCell>{title}</Table.TextCell>
              </Table.Row>
            )
          })}

        </Table.Body>
      </SideSheet>
    );
  }
}

ActiveSessionsSidesheet.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
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
)(ActiveSessionsSidesheet);
