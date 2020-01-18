import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { isMobile, useIsDevice } from '../../utils/isDevice';

const Mobile = props => {
  const mobile = useIsDevice(isMobile);

  if (mobile) return props.not ? null : props.children;
  return props.not ? props.children : null;
};

Mobile.propTypes = {
  // render children only on mobile
  children: PropTypes.any,
  // negate render behaviour
  not: PropTypes.object,
};

Mobile.defaultProps = {
  not: false,
}

export default Mobile;
