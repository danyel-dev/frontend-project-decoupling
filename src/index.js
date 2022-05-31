import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginComponent from './components/LoginComponent'
import Core from './Core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Core />
  </React.StrictMode>
);
