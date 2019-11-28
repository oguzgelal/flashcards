import {
  sizeMobile,
  sizeTablet,
  sizeLaptop,
} from '../config/styles';

export const isMobile = () => window.innerWidth <= sizeMobile;
export const isTablet = () => window.innerWidth > sizeMobile && window.innerWidth <= sizeTablet;
export const isLaptop = () => window.innerWidth > sizeTablet && window.innerWidth <= sizeLaptop;
export const isDesktop = () => window.innerWidth > sizeLaptop;
