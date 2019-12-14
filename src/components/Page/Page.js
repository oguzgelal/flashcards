import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui'
import styled from 'styled-components/macro';

export const ResponsivePage = styled(Pane)`
  width: 80%;
  max-width: 820px;
  margin: auto;
  padding: ${p => p.theme.bodyPadding}px;
  padding-left: 0;
  padding-right: 0;
  background-color: inherit;

  @media ${p => p.theme.mobile} {
    width: 100%;
    padding-left: ${p => p.theme.bodyPadding}px;
    padding-right: ${p => p.theme.bodyPadding}px;
  }
`;

const Wrapper = styled(Pane)`
  height: 100%;
  ${p => p.hasHeader && `
    height: calc(100% - ${p.theme.headerHeight}px);
  `}

  ${p => p.scroll && `
    overflow: auto;
  `}
`;

const Page = ({ children, full, center, ...props } = {}) => {

  const centerProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const renderChildren = full ? children : (
    <ResponsivePage>
      {children}
    </ResponsivePage>
  );

  return (
    <Wrapper
      width="100%"
      height="100%"
      background="tint2"
      borderLeft
      borderRight
      {...(center ? centerProps : {})}
      {...props}
    >
      {renderChildren}
    </Wrapper>
  )
};

Page.propTypes = {
  children: PropTypes.any,

  // do not render things in the center frame
  full: PropTypes.bool,

  // align items right in the center
  center: PropTypes.bool,

  // reduce the height of the header
  hasHeader: PropTypes.bool,

  // should scroll
  scroll: PropTypes.bool,
};

Page.defaultProps = {
  full: false,
  center: false,
  hasHeader: true,
  scroll: true,
}

export default Page;
