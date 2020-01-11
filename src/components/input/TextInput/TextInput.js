import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  SearchInput as SearchInputEvergreen,
  TextInputField as TextInputFieldEvergreen,
  TextInput,
} from 'evergreen-ui';

export const SearchInput = styled(SearchInputEvergreen)`
  ${p => !p.fixedHeight && `
    @media ${p => p.theme.mobile} {
      height: 38px;
    }
  `}
`;

export const TextInputField = styled(TextInputFieldEvergreen)`
  @media ${p => p.theme.mobile} {
    height: 38px;
  }
`;

export default styled(TextInput)`
  @media ${p => p.theme.mobile} {
    height: 38px;
  }
`;
