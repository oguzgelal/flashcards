import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  Pane,
  majorScale,
} from 'evergreen-ui'

const Page = ({ children, ...props } = {}) => (
  <Pane
    width="100vw"
    height="100vh"
    background="tint2"
    padding={majorScale(2)}
    {...props}
  >
    {children}
  </Pane>
);

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
