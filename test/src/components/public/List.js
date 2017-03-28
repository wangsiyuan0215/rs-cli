import "../../assets/css/public/list";

import React from "react";
import { Link } from "react-router";

export default class List extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ul className="api_list" key="api_list">
				{this.props.content.map( (item) => 
					<li key={item.id}>
						<Link>
							<div className="avatar">
								<i className="iconfont">&#xe607;</i>
							</div>
							<div className="body">
								<div className="url">
									Api: {item.url.replace(/http:\/\/[a-zA-Z\.]*/g, "...")}
								</div>
								<div className="name">
									User: {item.user_name}
								</div>
								<div className="time">
									Time: {item.create_time.replace(/\ \d*\:\d*:\d*/g, "")}
								</div>
							</div>
						</Link>
					</li> 
				)}
			</ul>
		)
	}

}

List.propTypes = {
	content: React.PropTypes.array.isRequired
}

