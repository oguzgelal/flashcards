import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Icon, Pane, Card, Text, Heading } from 'evergreen-ui';
import { ButtonGroup, buttonsPropType } from '../../Button';
const Wrapper = styled(Pane)`
  display: flex;
  flex-flow: column;
`;

const BodyWrapper = styled(Card)`
  flex-grow: 1;
  background-color: ${p => p.theme.tablesCellBg};
  min-height: 90px;
  overflow: hidden;
  transform: scale(0.98);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const Col = styled(Pane)`
  display: flex;
  align-items: center;
  padding: 0 12px;

  ${p => p.c === 'red' && `
    background-color: ${p.theme.palette.red.lightest};
  `}
  ${p => p.c === 'green' && `
    background-color: ${p.theme.palette.green.lightest};
  `}
  ${p => p.c === 'blue' && `
    background-color: ${p.theme.palette.blue.lightest};
  `}

`;
const Row = styled(Pane)`
  height: 26px;
  display: flex;
  align-items: center;

  ${p => !p.header && `
    background-color: ${p.theme.tablesCellBg};
    * {
      color: ${p.theme.palette.neutral.dark};
      font-weight: 100;
      font-size: 8px;
      filter: blur(0.2px) opacity(0.8);
    }
  `}
  ${p => p.header && `
    height: 38px;
    background-color: ${p.theme.tablesHeaderCellBg};
    border-color: ${p.theme.tablesHeaderCellBg};
    * {
      color: ${p.theme.tablesHeaderCellColor};
      border-color: ${p.theme.tablesHeaderCellBg};
    }
  `}
`;

const FooterWrapper = styled(Pane)`
  margin-top: -2px;
`;

const TablePreview = props => {
  const fakeCols = ({ header, contents = [], colors = [] } = {}) => (
    <>
      <Col flex={1} borderRight><Text size="400">{contents[0]}</Text></Col>
      {!header && (
        <>
          <Col height="100%" width={120} borderRight c={colors[0]}><Text>{contents[1]}</Text></Col>
          <Col height="100%" width={60} borderRight c={colors[1]}><Text>{contents[2]}</Text></Col>
          <Col height="100%" width={60} c={colors[2]}><Text>{contents[3]}</Text></Col>
        </>
      )}
    </>
  )
  return (
    <Wrapper>
      <BodyWrapper border>
        <Row header borderBottom>
          {fakeCols({ header: true, contents: ['Kanji 漢字'] })}
        </Row>
        <Row borderBottom>
          {fakeCols({
            contents: ['花', 'Flower', 'か, け', 'はな'],
            colors: props.reveal ? ['red', 'green', 'red'] : []
          })}
        </Row>
        <Row borderBottom>
          {fakeCols({
            contents: ['麦', 'Wheat', 'ばく', 'むぎ'],
            colors: props.reveal ? ['green', 'green', 'green'] : []
          })}
        </Row>
        <Row borderBottom>
          {fakeCols({
            contents: ['世', 'World', props.reveal ? '...' : 'せい', props.reveal ? '...' : 'よ'],
            colors: props.reveal ? ['green', 'blue', 'blue'] : []
          })}
        </Row>
        <Row>
          {fakeCols({
            contents: ['雨', props.reveal ? '...' : 'Rain', props.reveal ? '...' : 'う', props.reveal ? '...' : 'あめ'],
            colors: props.reveal ? ['blue', 'blue', 'blue'] : []
          })}
        </Row>
      </BodyWrapper>
      <FooterWrapper>
        <ButtonGroup
          buttons={props.buttons}
          buttonStyles={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </FooterWrapper>
    </Wrapper>
  )
};

TablePreview.propTypes = {
  buttons: buttonsPropType,
  reveal: PropTypes.bool,
};

export default TablePreview;
