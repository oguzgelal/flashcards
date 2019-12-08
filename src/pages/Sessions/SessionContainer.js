import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import ScreenTakeover from '../../components/ScreenTakeover';
import Page from '../../components/Page';

import { Text } from 'evergreen-ui';

class SessionContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <ScreenTakeover>
        <Page>
          <Text>Hello world</Text>
        </Page>
      </ScreenTakeover>
    );
  }
}

SessionContainer.propTypes = {
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
)(SessionContainer);
