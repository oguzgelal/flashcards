import React from 'react';
import PropTypes from 'prop-types';
import { Pane, majorScale } from 'evergreen-ui'

const Page = ({ children, ...props } = {}) => (
  <Pane
    width="100%"
    height="100%"
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
