import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { Button, Breadcrumbs, H1, Callout, Intent } from "@blueprintjs/core";

import Page from '../../components/Page';
import navigate from './../../utils/navigate';

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
      <Callout intent={Intent.WARNING}>
        <p>What you're looking for isn't here <span role="img" aria-label="sad emoji">😓</span></p>
        <Button
          marginTop={8}
          intent={Intent.WARNING}
          onClick={() => navigate(ctaLink)}
        >
          {cta}
        </Button>
      </Callout>
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
            items={[
              { onClick: () => navigate('/'), text: 'Home' },
              isSetNil ? null : { onClick: () => navigate(`/${STUDY}/${topicId}`), text: topicTitle },
            ].filter(i => !!i)}
          />

          {/* heading */}
          <H1 style={{ marginBottom: 22 }}>
            {hasSet && setTitle}
            {!hasSet && isSetNil && topicTitle}
          </H1>

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
