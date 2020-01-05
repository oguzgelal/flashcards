import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Icon, Pane, Card, Text, Heading } from 'evergreen-ui';
import { range } from '../../../utils/random';
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
    background-color: ${p.theme.palette.red.light};
    opacity: 0.8;
  `}
  ${p => p.c === 'green' && `
    background-color: ${p.theme.palette.green.light};
    opacity: 0.8;
  `}
  ${p => p.c === 'blue' && `
    background-color: ${p.theme.palette.blue.light};
    opacity: 0.6;
  `}

`;
const Row = styled(Pane)`
  height: 26px;
  display: flex;

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

const Filler = styled(Pane)`
  border-radius: 2px;
  height: 8px;
  width: ${p => range(p.w[0], p.w[1])}%;
  background-color: ${p => p.theme.scales.neutral.N5};
  flex-shrink: 1;

  ${p => p.header && `
    width: 130px;
    height: 10px;
    opacity: 0.2;
  `}
`;

const TablePreview = props => {

  const hidden = (
    <Pane width="100%" style={{ display: 'flex', justifyContent: 'center' }}>
      <Icon icon="eye-off" color="muted" size="10px" />
    </Pane>
  );

  const fakeCols = ({ header, contents = [], colors = [] } = {}) => (
    <>
      <Col style={{ flexGrow: 1, flexShrink: 1 }} borderRight>
        {contents[0] && <Filler header={header} w={[40, 80]} />}
      </Col>
      {!header && (
        <>
          <Col
            style={{ width: 80, flexShrink: 0 }}
            height="100%"
            borderRight
            c={colors[0]}
          >
            {contents[1] && <Filler w={[60, 90]} />}
            {!contents[1] && hidden}
          </Col>
          <Col
            style={{ width: 40, flexShrink: 0 }}
            height="100%"
            borderRight
            c={colors[1]}
          >
            {contents[2] && <Filler w={[60, 90]} />}
            {!contents[2] && hidden}
          </Col>
          <Col
            style={{ width: 40, flexShrink: 0 }}
            height="100%"
            c={colors[2]}
          >
            {contents[3] && <Filler w={[60, 90]} />}
            {!contents[3] && hidden}
          </Col>
        </>
      )}
    </>
  )
  return (
    <Wrapper>
      <BodyWrapper>
        <Row header border>
          {fakeCols({ header: true, contents: [true, false, false, false] })}
        </Row>
        <Row border borderTop={false}>
          {fakeCols({
            contents: [true, true, true, true],
            colors: props.reveal ? ['red', 'green', 'red'] : []
          })}
        </Row>
        <Row border borderTop={false}>
          {fakeCols({
            contents: [true, true, true, true],
            colors: props.reveal ? ['green', 'green', 'green'] : []
          })}
        </Row>
        <Row border borderTop={false}>
          {fakeCols({
            contents: [true, true, !props.reveal, !props.reveal],
            colors: props.reveal ? ['green', 'blue', 'blue'] : []
          })}
        </Row>
        <Row border borderTop={false}>
          {fakeCols({
            contents: [true, !props.reveal, !props.reveal, !props.reveal],
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
