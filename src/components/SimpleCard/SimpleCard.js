import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import Dotdotdot from 'react-dotdotdot';
import { Pane, Card, Heading, Paragraph } from 'evergreen-ui';

const verticalGap = 8;

const Wrapper = styled(Card)`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  padding: 22px;
  display: flex;
  flex-flow: column;
  background-color: white;
`;

const HeadingWrapper = styled(Pane)`
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const Title = styled(Heading)``;
const Description = styled(Paragraph)`
  margin-top: ${verticalGap}px;
  line-height: 16px;
`;

const Grow = styled(Pane)`
  flex-grow: 1;
  min-height: ${verticalGap * 2}px;
`;

const CardBody = styled(Pane)``;

const SimpleCard = (props = {}) => {

  const hasHeading = (
    !isNil(props.title) ||
    !isNil(props.desc) ||
    !isNil(props.headerChildren)
  );

  const hasBody = (
    !isNil(props.children)
  )

  return (
    <Wrapper
      border
      className={props.className}
      style={props.style}
      {...(props.wrapperProps || {})}
    >

      {/* heading */}
      {hasHeading && (
        <>
          <HeadingWrapper {...(props.headerProps || {})}>

            {/* title */}
            {!isNil(props.title) && (
              <Title {...(props.titleProps || {})}>
                <Dotdotdot clamp={isNil(props.titleClamp) ? 1 : props.titleClamp}>
                  {props.title}
                </Dotdotdot>
              </Title>
            )}


            {/* description */}
            {!isNil(props.desc) && (
              <Description color="muted" size={400} {...(props.descProps || {})}>
                <Dotdotdot clamp={isNil(props.descClamp) ? 3 : props.descClamp}>
                  {props.desc}
                </Dotdotdot>
              </Description>
            )}

            {/* other heading contents */}
            {!isNil(props.headerChildren) && (
              <>
                <div style={{ height: verticalGap }} />
                {props.headerChildren}
              </>
            )}

          </HeadingWrapper>

          {/* if body and heading coexist, render the gap */}
          {hasBody && <Grow />}

        </>
      )}

      {/* card body - footer */}
      {hasBody && (
        <CardBody>
          {!isNil(props.children) && props.children}
        </CardBody>
      )}

    </Wrapper>
  )
};

SimpleCard.propTypes = {

  // heading
  headerChildren: PropTypes.any,
  headerProps: PropTypes.object,

  // title
  title: PropTypes.any,
  titleProps: PropTypes.object,
  titleClamp: PropTypes.number,

  // desc
  desc: PropTypes.any,
  descProps: PropTypes.object,
  descClamp: PropTypes.number,

  // body
  children: PropTypes.any,

  // applies to outer wrapper
  wrapperProps: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default SimpleCard;
