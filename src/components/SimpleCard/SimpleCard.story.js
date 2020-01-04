import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from "@storybook/addon-knobs";
import { Text } from 'evergreen-ui';
import SimpleCard from './SimpleCard';

const story = storiesOf(`Base/SimpleCard`, module);

const render = ({ hasHeader, hasBody, ...p } = {}) => {

  // title
  const hasTitle = boolean('Has Title', true);
  const title = text('Title', 'This is a title');
  const titleProps = object('Title props', { style: {} })
  // desc
  const hasDesc = boolean('Has Description', true);
  const desc = text('Description', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.');
  const descProps = object('Desc props', { style: {} });

  const heading = {
    title: hasTitle ? title : null,
    titleProps: titleProps,
    desc: hasDesc ? desc : null,
    descProps: descProps,
  }

  const body = {
    children: (
      <Text>
        This is the body
      </Text>
    )
  }

  return (
    <div style={{ width: 520 }}>
      <SimpleCard
        {...(hasHeader ? heading : {})}
        {...(hasBody ? body : {})}
        {...(p || {})}
      />
    </div>
  )
};

story.add('only body', () => render({
  hasBody: true,
}))

story.add('only header', () => render({
  hasHeader: true,
}));

story.add('header and header children', () => render({
  hasHeader: true,
  headerChildren: (
    <Text>This is heading children</Text>
  )
}));

story.add('header and body', () => render({
  hasBody: true,
  hasHeader: true,
}));

story.add('header, header children and body', () => render({
  hasBody: true,
  hasHeader: true,
  headerChildren: (
    <Text>This is heading children</Text>
  )
}));
