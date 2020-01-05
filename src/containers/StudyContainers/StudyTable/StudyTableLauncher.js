import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import SimpleCard from '../../../components/SimpleCard';
import TablePreview from '../../../components/StudyComponents/Tables/TablePreview';

class StudyTableLauncher extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <SimpleCard title="Study Table">
        <TablePreview
          buttons={[ { children: "Start" } ]}
        />
      </SimpleCard>
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
