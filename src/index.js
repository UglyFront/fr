import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reducer from "./redux/reducer"
import thunk from "redux-thunk"

let store = createStore(reducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
     <Provider store={store}>
       <App/>
     </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
