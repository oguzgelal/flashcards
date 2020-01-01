import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import ScreenTakeover from '../../components/ScreenTakeover';
import Page from '../../components/Page';

const SessionLayout = props => (
  <ScreenTakeover>
    <Page
      center
      fullHeight
      hasHeader={false}
      responsiveWrapperProps={{
        style: {
          paddingTop: 12,
          paddingBottom: 12,
          display: 'flex',
          flexFlow: 'column',
        }
      }}
    >
      {props.children}
    </Page>
  </ScreenTakeover>
);

SessionLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default SessionLayout;
