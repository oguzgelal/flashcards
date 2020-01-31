import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { Card, H5 } from "@blueprintjs/core";

import TablePreview from '../../../components/StudyComponents/Tables/TablePreview';

class StudyTableLauncher extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Card interactive>
        <H5>Study Table</H5>
        <TablePreview
          buttons={[ { children: "Start" } ]}
        />
      </Card>
    );
  }
}

StudyTableLauncher.propTypes = {
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
)(StudyTableLauncher);
