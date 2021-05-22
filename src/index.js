import React from 'react';
import ReactDOM from 'react-dom';
import { PostsProvider } from './Context/PostsContext';

import App from './App';

ReactDOM.render(
  <PostsProvider>
    <App />
  </PostsProvider>,
  document.getElementById('root')
);
