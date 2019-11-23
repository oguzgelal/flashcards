import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { Alert, Text, Heading, Link, Icon } from 'evergreen-ui';
import { Link as LinkRR } from 'react-router-dom';
import Button from '../../components/Button';
import Page from '../../components/Page';
import Breadcrumbs from '../../components/Breadcrumbs';

import { STUDY } from '../../config/routes';

import ScreenStudySet from './ScreenStudySet';
import ScreenStudyTopic from './ScreenStudyTopic';

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
    const isTopicNil = isNil(topicId);
    const isTopicMissing = isNil(topic);
    const hasTopic = !isTopicNil && !isTopicMissing;

    const set = get(data, `sets['${setId}']`);
    const isSetNil = isNil(setId);
    const isSetMissing = isNil(set);
    const hasSet = !isSetNil && !isSetMissing;

    const topicTitle = get(topic, 'title');
    const setTitle = get(set, 'title');

    return (
      <Page frame>

        {/* topic either unset or not found. fail here */}
        {!hasTopic && this.render404('Home', '/')}

        {/* topic found */}
        {hasTopic && (<>

          {/* breadcrumbs */}
          <Breadcrumbs
            marginBottom={8}
            items={[
              <Link is={LinkRR} to="/">Home</Link>,
              <Text>Study</Text>,
              isSetNil ? null : <Link is={LinkRR} to={`/${STUDY}/${topicId}`}>{topicTitle}</Link>,
            ].filter(i => !!i)}
          />

          {/* heading */}
          <Heading size={900} marginBottom={22}>
            {hasSet && setTitle}
            {!hasSet && isSetNil && topicTitle}
          </Heading>

          {/* set present, render set */}
          {hasSet && <ScreenStudySet set={set} />}

          {/* no set provided - render sets of the topic */}
          {!hasSet && isSetNil && <ScreenStudyTopic topic={topic} />}

          {/* set provided but not found - 404 */}
          {!hasSet && !isSetNil && isSetMissing && (
            this.render404(`Back to ${topicTitle}`, `/${STUDY}/${topicId}`)
          )}

        </>)}
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
