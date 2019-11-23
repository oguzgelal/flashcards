import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { Pane, Icon } from 'evergreen-ui';

const Wrapper = styled(Pane)`
  display: flex;
  align-items: center;
`;

const ItemWrapper = styled(Pane)`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled(Pane)`
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Breadcrumbs = ({ id, items, showLastArrow, ...props } = {}) => (
  <Wrapper {...props}>
    {(items || []).map((item, i) => (
      <ItemWrapper key={`${id ? `${id}_` : ''}crumb-${i}`}>
        {item}
        {((i !== items.length - 1) || showLastArrow) && (
          <IconWrapper>
            <Icon size={12} color="muted" icon="chevron-right" />
          </IconWrapper>
        )}
      </ItemWrapper>
    ))}
  </Wrapper>
);

Breadcrumbs.propTypes = {
  // if more than one breadcrumb component will be
  // used in a page, an id should be given to each
  id: PropTypes.string,
  items: PropTypes.array,
  showLastArrow: PropTypes.bool,
};

export default Breadcrumbs;
