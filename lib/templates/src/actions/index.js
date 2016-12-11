// + -------------------------------------
// | actions
// + -------------------------------------
// | 
// + -------------------------------------
// | author: Wangsiyuan @ 2016-12-08
// + -------------------------------------
// 约定：
// 		action 只返回状态的变化之后的值
// 			若要修改格式，请添加中间件，并且以 [actionName]Middleware 命名
// 		
// 		action 的数据格式为：
// 			[action] {
// 				type: [ACTION_TYPE],
// 				payload: {
// 					...
// 						objects:
// 						isLoading: false,
// 						list: [array] 
// 					...
// 				}
// 			}
// 
// 

export const SHOW_LOADING = "LOADING";
export const REQUEST_API = "REQUEST_API";
export const QUERY_API_SUCEESS = "QUERY_API_SUCCESS";

/**
 * show loading UI action
 * 
 * @return  isLoading: true
 */
export const showLoading = () => ({
	type: SHOW_LOADING, 
	payload: {
		isLoading: true
	}
});

/**
 * fetch Apis actions
 * 
 * @param  data  
 * @return dispatch ->  fetchApisMiddleware
 */
export const fetchApis = data => dispatch => {
	return dispatch(fetchApisMiddleware(data));
};

/**
 * fetched Apis Data for response
 * 
 * @param  data
 * @return for reducer [QUERY_API_SUCEESS]
 */
const responseApis = (data) => ({
	type: QUERY_API_SUCEESS,
	payload: data
});

/**
 * fetch apis middleware
 *
 * @param data
 * @return dispatch -> reponseApis
 * 
 */
const fetchApisMiddleware = data => dispatch => {
	dispatch(showLoading());
	return fetch(_.urlHeader + "/projects/getProList", {
		method: "post",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: data
	})
	.then(response => response.json())
	.then(json => dispatch(responseApis({ data, json, isLoading: false })));
};





