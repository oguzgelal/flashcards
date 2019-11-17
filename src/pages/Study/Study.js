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
import { STUDY } from '../../config/routes';

import data from '../../lib/tmpdata';

class Study extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    this.render404 = this.render404.bind(this);
  }

  render404() {
    return (
      <Alert
        intent="warning"
        title="What you're looking for isn't here 😓"
      >
        <Button
          to="/"
          is={LinkRR}
          appearance="primary"
          marginTop={8}
        >
          Go Back
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

    const set = get(data, `sets['${setId}']`);
    const setNil = isNil(setId);
    const setMissing = isNil(set);
    const hasSet = !setNil && !setMissing;

    const allSet = !isNil(topic) && !isNil(set);

    const topicTitle = get(topic, 'title');
    const setTitle = get(set, 'title');

    return (
      <Page frame>

        {/* topic either unset or not found. fail here */}
        {!hasTopic && this.render404()}

        {/* topic found */}
        {hasTopic && (
          <>
            {/* breadcrumb */}
            <Breadcrumbs
              items={[
                <Link is={LinkRR} to="/">Home</Link>,
                <Link is={LinkRR} to={`/${STUDY}/${topicId}`}>{topicTitle}</Link>,
              ]}
            />

            {/* set found, render set page */}
            {hasSet && (
              <>
                <Heading size={900} marginTop={4}>
                  {setTitle}
                </Heading>
              </>
            )}

            {/* no set provided - render sets of the topic */}
            {!hasSet && setNil && "Sets"}

            {/* set provided but not found - 404 */}
            {!hasSet && !setNil && setMissing && this.render404()}

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
