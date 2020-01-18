import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import {
  isMobile,
  isTablet,
  isLaptop,
  isDesktop,
  useIsDevice,
} from '../../utils/isDevice';

const Device = props => {
  const mobile = useIsDevice(isMobile);
  const tablet = useIsDevice(isTablet);
  const laptop = useIsDevice(isLaptop);
  const desktop = useIsDevice(isDesktop);

  if (typeof props.children === 'function') {
    return props.children({
      mobile,
      tablet,
      laptop,
      desktop
    })
  }
};

Device.propTypes = {
  children: PropTypes.any,
};

export default Device;
