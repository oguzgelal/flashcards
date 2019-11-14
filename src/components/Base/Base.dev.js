import React from 'react';
import App from '../../App';
import DevTools from '../DevTools';

const Base = props => (
  <>
    <DevTools />
    <App {...props} />
  </>
);

Base.propTypes = {
};

export default Base;
