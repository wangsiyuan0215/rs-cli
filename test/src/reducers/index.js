// + -------------------------------------
// | reducer - index
// + -------------------------------------
// | reducers 合并
// + -------------------------------------
// | author: Wangsiyuan @ 2016-12-08
// + -------------------------------------

import { combineReducers } from 'redux';

import { common } from './common';

const rootReducers = combineReducers({
	common,
});

export default rootReducers;