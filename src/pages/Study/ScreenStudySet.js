import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';

import Grid from '../../components/Grid/Grid';
import SimpleCard from '../../components/SimpleCard';

import { FlashcardPreview } from '../../components/StudyComponents/Flashcard';
import { TablePreview } from '../../components/StudyComponents/Tables';

const Wrapper = styled.div`
  background-color: inherit;
`;

class ScreenStudySet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    // const setFlashcards = get(this.props, 'set.flashcards') || {};
    return (
      <Wrapper>
        <Grid autoHeight columns={[2, 2, 1]}>

          {/* flashcard */}
          <SimpleCard title="Flashcards">
            <FlashcardPreview
              frontItem="こんにちは！"
              backItem="Hello!"
              buttons={[ { children: "Start " } ]}
            />
          </SimpleCard>

          {/* study tables */}
          <SimpleCard title="Study Table">
            <TablePreview
              buttons={[ { children: "Start" } ]}
            />
          </SimpleCard>

          {/* reveal table */}
          <SimpleCard title="Reveal Table">
            <TablePreview
              reveal
              buttons={[ { children: "Start" } ]}
            />
          </SimpleCard>
        </Grid>
      </Wrapper>
    );
  }
}

ScreenStudySet.propTypes = {
  set: setPropTypes,
};

ScreenStudySet.defaultProps = {
  set: {},
}

const mapStateToProps = (state, ownProps) => ({
  // loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  // sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenStudySet);
