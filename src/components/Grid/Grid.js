import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${p => p.gap}px;
  grid-auto-rows: ${p => p.autoHeight ? 'auto' : `${p.itemHeight}px`};
  grid-template-columns: repeat(${p => p.colsDesktop}, minmax(0, 1fr));
  @media ${p => p.theme.tablet} {
    grid-template-columns: repeat(${p => p.colsTablet}, minmax(0, 1fr));
  }
  @media ${p => p.theme.mobile} {
    grid-template-columns: repeat(${p => p.colsMobile}, minmax(0, 1fr));
  }
`;

const Grid = props => {
  const columns = props.columns || [];
  return (
    <Wrapper
      style={props.style}
      gap={props.gap}
      itemHeight={props.itemHeight}
      autoHeight={props.autoHeight}
      colsDesktop={columns[0]}
      colsTablet={columns[1]}
      colsMobile={columns[2]}
    >
      {props.children}
    </Wrapper>
  )
};

Grid.propTypes = {
  style: PropTypes.object,
  gap: PropTypes.number,
  columns: PropTypes.array, // [<desktop>, <tablet>, <mobile>]
  itemHeight: PropTypes.number,
  autoHeight: PropTypes.bool,
};

Grid.defaultProps = {
  gap: 16,
  itemHeight: 210,
  columns: [3, 2, 1],
}

export default Grid;
