import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Pane } from 'evergreen-ui';

const Wrapper = styled(Pane)`
  display: grid;
  grid-gap: ${p => p.gap}px;
  grid-auto-rows: ${p => p.itemHeight}px;
  grid-template-columns: repeat(${p => p.colsDesktop}, 1fr);
  @media ${p => p.theme.tablet} {
    grid-template-columns: repeat(${p => p.colsTablet}, 1fr);
  }
  @media ${p => p.theme.mobile} {
    grid-template-columns: repeat(${p => p.colsMobile}, 1fr);
  }
`;

const Grid = props => {
  const columns = props.columns || [];
  return (
    <Wrapper
      gap={props.gap}
      itemHeight={props.itemHeight}
      colsDesktop={columns[0]}
      colsTablet={columns[1]}
      colsMobile={columns[2]}
    >
      {props.children}
    </Wrapper>
  )
};

Grid.propTypes = {
  gap: PropTypes.number,
  columns: PropTypes.array, // [<desktop>, <tablet>, <mobile>]
  itemHeight: PropTypes.number,
};

Grid.defaultProps = {
  gap: 16,
  itemHeight: 200,
  columns: [3, 2, 1],
}

export default Grid;
