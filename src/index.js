import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <div className="font-serif">
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </div>,
  document.getElementById('root')
);
