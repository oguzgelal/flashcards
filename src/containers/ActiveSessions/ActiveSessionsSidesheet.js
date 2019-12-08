import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { Heading } from 'evergreen-ui';
import SideSheet from '../../components/SideSheet';

class ActiveSessionsSidesheet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <SideSheet
        isOpen={this.props.isOpen}
        close={this.props.close}
        title="Active Sessions"
        // desc="Lorem ipsum dolor sit amet"
      >
        <Heading>Yo!</Heading>
      </SideSheet>
    );
  }
}

ActiveSessionsSidesheet.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
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
)(ActiveSessionsSidesheet);
