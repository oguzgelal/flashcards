import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import { Badge, Pane } from 'evergreen-ui';

const defaultMargin = 6;

const BadgesWrapper = styled(Pane)`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${p => -1 * (isNil(p.margin) ? defaultMargin : p.margin)}px;
`;

export const Badges = ({ children, margin, ...props } = {}) => (
  <Pane {...props}>
    <BadgesWrapper margin={margin}>
      {children}
    </BadgesWrapper>
  </Pane>
);

export default styled(Badge)`
  flex-shrink: 0;
  margin: 0;
  margin-top: ${p => isNil(p.margin) ? defaultMargin : p.margin}px;
  margin-right: ${p => isNil(p.margin) ? defaultMargin : p.margin}px;
  &:last-of-type { margin-right: 0; }
`;
