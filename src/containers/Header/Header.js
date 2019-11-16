import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { ResponsivePage } from '../../components/Page';
import {
  Pane,
  Text,
  Heading,
} from 'evergreen-ui';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Pane
        height="52px"
        display="flex"
        alignItems="center"
        borderBottom
      >
        <ResponsivePage>
          <Heading>Header</Heading>
        </ResponsivePage>
      </Pane>
    );
  }
}

Header.propTypes = {
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
)(Header);
