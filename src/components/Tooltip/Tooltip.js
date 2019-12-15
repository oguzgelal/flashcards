import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Tooltip } from 'evergreen-ui';

const TooltipStyled = styled(Tooltip).attrs({
  statelessProps: {
    className: 'fc--tooltip'
  }
})`

`;

const TooltipComp = props => (
  <TooltipStyled {...props} />
);

TooltipComp.propTypes = {
};

export default TooltipComp;
