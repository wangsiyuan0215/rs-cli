import "../../assets/css/public/loading";

import React from "react";
import LoadingGif from "../../assets/images/loading.gif";

export default class Loading extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div className="loading_wrapper">
				<div className="bg"></div>
				<div className="body">
					<img src={ LoadingGif } alt=""/>
					<div className="bg"></div>
				</div>
			</div>
		)
	}

}

