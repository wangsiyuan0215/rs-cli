// + -------------------------------------
// | router
// + -------------------------------------
// | 路由配置文件
// + -------------------------------------
// | author: Wangsiyuan @ 2016-12-08
// + -------------------------------------

import React from "react";
import { Router, hashHistory, browserHistory } from "react-router";

import _ from "./utils/_";

import App from "./container/App";
import Home from "./container/Home";
import Pro from "./container/Projects";

const history = _.isDebug ? browserHistory : hashHistory;

const router = {
    path: '/', 
    component: App, 
    indexRoute: { component: Home }, 
    childRoutes: [
        { path: _.routerPath.home, component: Home }, 
        { path: _.routerPath.pro, component: Pro }
    ]
};

export default class CustomRouter extends React.Component {
	render() {
		return <Router history={ history } routes={ router } />;
	}
}