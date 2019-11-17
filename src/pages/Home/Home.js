import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import Page from '../../components/Page';
import StudySet, { StudySetGrid } from '../../components/StudySet';
import StudyTopic from '../../components/StudyTopic';

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

    const topics = get(data, 'topics') || [];
    const sets = get(data, 'sets') || {};

    return (
      <Page frame>
        {topics.map((topic, i) => {
          const topicId = get(topic, 'id');
          const topicTitle = get(topic, 'title');
          const topicDesc = get(topic, 'description');
          const topicSets = get(topic, 'sets') || [];

          return (
            <StudyTopicStyled
              key={`study_topic_${topicId}`}
              title={topicTitle}
              description={topicDesc}
              marginTop={22}
            >
              <StudySetGrid>
                {topicSets.map(topicSetId => {
                  const setData = get(sets, topicSetId);
                  const setId = get(setData, 'id');
                  const setTitle = get(setData, 'title');
                  const setDesc = get(setData, 'description');
                  const setItems = get(setData, 'data') || [];

                  return (
                    <StudySet
                      key={`study_set_${topicId}_${setId}`}
                      title={setTitle}
                      description={setDesc}
                      itemCount={setItems.length}
                    />
                  )
                })}
              </StudySetGrid>
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
