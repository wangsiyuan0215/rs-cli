// + -------------------------------------
// | 入口文件
// + -------------------------------------
// | 
// + -------------------------------------
// | author: Wangsiyuan @ 2016-12-08
// + -------------------------------------

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index";
import CustomRouter from './router';

const store = createStore(
    rootReducers,
    applyMiddleware(thunk)
);

const container = document.getElementById("wrapper");

ReactDOM.render(
	<Provider store={store}>
		<CustomRouter></CustomRouter>
	</Provider>, 
    container
);