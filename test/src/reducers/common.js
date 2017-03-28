// + -------------------------------------
// | reducers - common
// + -------------------------------------
// | 公共 reducer
// + -------------------------------------
// | author: Wangsiyuan @ 2016-12-08
// + -------------------------------------

import { 
	SHOW_LOADING
} from '../actions/index';

export const common = (
	// state init for common
	state = { 
		isLoading: false 
	}, 
	action
	) => {

    switch(action.type) {

        case SHOW_LOADING:
            return Object.assign({}, state, action.payload );

        default:
            return state;

    }
};