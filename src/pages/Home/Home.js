import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from '../../components/Page';

import StudySet, { StudySetGrid } from '../../components/StudySet';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Page frame>
        <StudySetGrid>
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
          <StudySet title="Lorem" />
          <StudySet title="Ipsum" />
          <StudySet title="Dolor sit" />
          <StudySet title="Amet" />
        </StudySetGrid>
      </Page>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  // auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  // authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
