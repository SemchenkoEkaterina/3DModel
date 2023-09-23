import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import KonusStore from './store/KonusStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);

root.render(
  <Context.Provider value = {{
    konus: new KonusStore()
  }}>
    <App />
  </Context.Provider>
);
