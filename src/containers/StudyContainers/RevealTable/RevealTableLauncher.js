import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { Card, H5 } from "@blueprintjs/core";
import TablePreview from '../../../components/StudyComponents/Tables/TablePreview';

class RevealTableLauncher extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Card interactive>
        <H5>Reveal Table</H5>
        <TablePreview
          reveal
          buttons={[ { children: "Start" } ]}
        />
      </Card>
    );
  }
}

RevealTableLauncher.propTypes = {
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
)(RevealTableLauncher);
