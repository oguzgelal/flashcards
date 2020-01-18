import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Pane, Card } from 'evergreen-ui';
import { transparentize } from 'polished';
import { range } from '../../../utils/random';
import { ButtonGroup, buttonsPropType } from '../../Button';
const Wrapper = styled(Pane)`
  display: flex;
  flex-flow: column;
`;

const BodyWrapper = styled(Card)`
  flex-grow: 1;
  background-color: ${p => p.theme.t.tablesCellBg()};
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
    background-color: ${transparentize(0.8, p.theme.bp.red5)};
  `}
  ${p => p.c === 'green' && `
    background-color: ${transparentize(0.8, p.theme.bp.green5)};
    opacity: 0.5;
  `}
  ${p => p.c === 'blue' && `
    opacity: 0.2;
    background: repeating-linear-gradient(
      -45deg,
      ${transparentize(0.7, p.theme.bp.blue5)},
      ${transparentize(0.7, p.theme.bp.blue5)} 10px,
      ${transparentize(0.9, p.theme.bp.blue5)} 10px,
      ${transparentize(0.9, p.theme.bp.blue5)} 20px
    );
  `}

`;
const Row = styled(Pane)`
  height: 26px;
  display: flex;

  ${p => !p.header && `
    background-color: ${p.theme.t.tablesCellBg()};
    * {
      color: ${p.theme.palette.neutral.dark};
      font-weight: 100;
      font-size: 8px;
    }
  `}
  ${p => p.header && `
    height: 38px;
    background-color: ${p.theme.t.tablesHeaderCellBg()};
    border-color: ${p.theme.t.tablesHeaderCellBg()};
    * {
      color: ${p.theme.t.tablesHeaderCellColor()};
      border-color: ${p.theme.t.tablesHeaderCellBg()};
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
  opacity: 0.8;
  flex-shrink: 1;

  ${p => p.header && `
    width: 130px;
    height: 10px;
    opacity: 0.2;
  `}
`;

const TablePreview = props => {

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
          </Col>
          <Col
            style={{ width: 40, flexShrink: 0 }}
            height="100%"
            borderRight
            c={colors[1]}
          >
            {contents[2] && <Filler w={[60, 90]} />}
          </Col>
          <Col
            style={{ width: 40, flexShrink: 0 }}
            height="100%"
            c={colors[2]}
          >
            {contents[3] && <Filler w={[60, 90]} />}
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
