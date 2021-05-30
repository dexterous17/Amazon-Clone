import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateProvider} from './Context/StateProvider'
import {initialState} from './Reducers/Reducer'
import {Reducer} from './Reducers/Reducer'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={Reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
