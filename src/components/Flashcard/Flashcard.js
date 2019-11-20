import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { Pane, Card, Text, Heading } from 'evergreen-ui';
import Button from '../Button';


const Wrapper = styled(Card).attrs({ elevation: 2 })`
  width: 100%;
  display: flex;
  flex-flow: column;
`;

const FrontWrapper = styled(Card)`
  background-color: ${p => p.theme.palette[p.color].dark};
  * { color: ${p => p.theme.palette.neutral.lightest}; }
  ${p => p.revealed && `
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  `}
`;

const BackWrapper = styled(Card)`
  background-color: ${p => p.theme.palette.neutral.lightest};
  * { color: ${p => p.theme.palette[p.color].dark}; }
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: 0;
`;

const RevealButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const Flashcard = props => {

  const frontItem = get(props, 'frontItem');
  const backItem = get(props, 'backItem');
  const extraItems = get(props, 'extraItems') || [];

  return (
    <Wrapper>

      {/* front face */}
      <FrontWrapper
        color={props.color}
        revealed={props.revealed}
      >
        {frontItem}
      </FrontWrapper>

      {/* back face */}
      {props.revealed && (
        <BackWrapper
          color={props.color}
        >
          {backItem}
        </BackWrapper>
      )}

      {/* reveal buttons */}
      {!props.revealed && (
        <RevealButton>
          Reveal
        </RevealButton>
      )}
    </Wrapper>
  )
};

Flashcard.propTypes = {
  color: PropTypes.string,
  revealed: PropTypes.bool,
  frontItem: PropTypes.any,
  backItem: PropTypes.any,
  extraItems: PropTypes.arrayOf(PropTypes.any)
};

Flashcard.defaultProps = {
  color: 'neutral'
}

export default Flashcard;
