import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { Text } from 'evergreen-ui';
import Page from '../../components/Page';

class Study extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Page frame>
        <Text>Hello world</Text>
      </Page>
    );
  }
}

Study.propTypes = {
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
)(Study);
