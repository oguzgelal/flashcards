import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import Page from '../../components/Page';
import StudySet from '../../components/StudySet';
import StudyTopic from '../../components/StudyTopic';
import Grid from '../../components/Grid';

import data from '../../lib/tmpdata';

const StudyTopicStyled = styled(StudyTopic)`
  &:first-of-type {
    margin-top: 0;
  }
`;

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const topics = get(data, 'topics') || {};
    const sets = get(data, 'sets') || {};

    return (
      <Page frame>
        {Object.values(topics).map((topic, i) => {
          const topicId = get(topic, 'id');
          const topicSets = get(topic, 'sets') || [];

          return (
            <StudyTopicStyled
              key={`study_topic_${topicId}`}
              topic={topic}
              marginTop={22}
            >
              <Grid>
                {topicSets.map(topicSetId => (
                  <StudySet
                    key={`study_set_${topicId}_${topicSetId}`}
                    set={get(data, `sets['${topicSetId}']`)}
                  />
                ))}
              </Grid>
            </StudyTopicStyled>
          )
        })}
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
