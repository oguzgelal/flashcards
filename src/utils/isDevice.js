import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import {
  sizeMobile,
  sizeTablet,
  sizeLaptop,
} from '../config/styles';

export const isMobile = () => window.innerWidth <= sizeMobile;
export const isTablet = () => window.innerWidth > sizeMobile && window.innerWidth <= sizeTablet;
export const isLaptop = () => window.innerWidth > sizeTablet && window.innerWidth <= sizeLaptop;
export const isDesktop = () => window.innerWidth > sizeLaptop;

// usage:
// const mobile = useIsDevice(isMobile);
export const useIsDevice = (checkerFn, ms = 200) => {
  const [conditionHolds, setConditionHolds] = useState(null);
  useLayoutEffect(() => {
    const checkDimensions = debounce(() => setConditionHolds(checkerFn()), ms);
    checkDimensions();
    window.addEventListener('resize', checkDimensions);
    return () => window.removeEventListener('resize', checkDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return conditionHolds;
}
