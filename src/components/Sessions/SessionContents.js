import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Pane } from 'evergreen-ui';

const Wrapper = styled(Pane)`
  width: 100%;
  flex-grow: 1;
`;

const SessionContents = props => (
  <Wrapper>
    {props.children}
  </Wrapper>
);

SessionContents.propTypes = {
  children: PropTypes.any,
};

export default SessionContents;
