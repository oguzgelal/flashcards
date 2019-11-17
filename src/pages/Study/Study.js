import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { Alert, Text, Heading, Link } from 'evergreen-ui';
import { Link as LinkRR } from 'react-router-dom';
import Button from '../../components/Button';
import Page from '../../components/Page';
import Breadcrumbs from '../../components/Breadcrumbs';
import StudySet, { StudySetGrid } from '../../components/StudySet';
import { STUDY } from '../../config/routes';

import data from '../../lib/tmpdata';

class Study extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    this.render404 = this.render404.bind(this);
  }

  render404(cta, ctaLink) {
    return (
      <Alert
        intent="warning"
        title="What you're looking for isn't here 😓"
      >
        <Button
          to={ctaLink}
          is={LinkRR}
          appearance="primary"
          marginTop={8}
        >
          {cta}
        </Button>
      </Alert>
    )
  }

  render() {
    const topicId = get(this.props, 'match.params.topicId');
    const setId = get(this.props, 'match.params.setId');

    const topic = get(data, `topics['${topicId}']`);
    const topicNil = isNil(topicId);
    const topicMissing = isNil(topic);
    const hasTopic = !topicNil && !topicMissing;

    const topicSets = get(topic, 'sets');

    const set = get(data, `sets['${setId}']`);
    const setNil = isNil(setId);
    const setMissing = isNil(set);
    const hasSet = !setNil && !setMissing;

    const topicTitle = get(topic, 'title');
    const setTitle = get(set, 'title');

    return (
      <Page frame>

        {/* topic either unset or not found. fail here */}
        {!hasTopic && this.render404('Home', '/')}

        {/* topic found */}
        {hasTopic && (
          <>
            {/* breadcrumb */}
            <Breadcrumbs
              marginBottom={8}
              items={[
                <Link is={LinkRR} to="/">Home</Link>,
                setNil ? null : <Link is={LinkRR} to={`/${STUDY}/${topicId}`}>{topicTitle}</Link>,
              ].filter(i => !!i)}
            />

            <Heading size={900} marginBottom={22}>
              {hasSet && setTitle}
              {!hasSet && setNil && topicTitle}
            </Heading>

            {/* no set provided - render sets of the topic */}
            {!hasSet && setNil && (
              <StudySetGrid>
                {topicSets.map(topicSetId => {
                  const setData = get(data, `sets['${topicSetId}']`);
                  return (
                    <StudySet
                      key={`study_set_${topicId}_${topicSetId}`}
                      set={setData}
                    />
                  )
                })}
              </StudySetGrid>
            )}

            {/* set provided but not found - 404 */}
            {!hasSet && !setNil && setMissing && (
              this.render404(`Back to ${topicTitle}`, `/${STUDY}/${topicId}`)
            )}

          </>
        )}

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
