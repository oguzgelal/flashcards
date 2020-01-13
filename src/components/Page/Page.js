import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export const ResponsivePage = styled.div`
  width: 80%;
  min-height: 100%;
  max-width: 820px;
  margin: auto;
  padding: ${p => p.theme.bodyPadding}px;
  padding-left: 0;
  padding-right: 0;
  background-color: inherit;

  ${p => p.center && `
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  @media ${p => p.theme.mobile} {
    width: 100%;
    padding-left: ${p => p.theme.bodyPadding}px;
    padding-right: ${p => p.theme.bodyPadding}px;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${p => p.theme.t.appBg.light};
  width: 100%;
  height: 100%;

  ${p => p.hasHeader && `
    height: calc(100% - ${p.theme.headerHeight}px);
    min-height: calc(100% - ${p.theme.headerHeight}px);
  `}

  ${p => p.center && `
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  ${p => p.scroll && `
    overflow: auto;

    @media ${p => p.theme.mobile} {
      -webkit-overflow-scrolling: touch;
    }

  `}
`;

const Page = ({ children, full, center, responsiveWrapperProps, ...props } = {}) => {

  const renderChildren = full ? children : (
    <ResponsivePage center={center} {...(responsiveWrapperProps || {})}>
      {children}
    </ResponsivePage>
  );

  return (
    <Wrapper center={center} {...props}>
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
