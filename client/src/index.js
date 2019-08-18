import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import Tooltips from './utils/Tooltips';

const container = document.getElementById('root');

ReactDOM.render(<App />, container);

new Tooltips();

// function to unmount App and render again
const remountApp = () => {
  ReactDOM.unmountComponentAtNode(container);
  ReactDOM.render(<App />, container);
};

export { remountApp };
