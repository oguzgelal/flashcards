import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';

export default styled.span`
  & > div {
    display: flex;
    align-items: center;
    & > * {
      display: inherit;
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 12px;
      &:last-child { margin-right: 0; }
    }
    label {
      flex-shrink: 0;
      ${p => isNil(p.labelWidth) ? '' : `width: ${p.labelWidth}px;`}
      span { margin-left: 4px; }
    }
  }
`;
