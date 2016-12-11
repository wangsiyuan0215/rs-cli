import "../../assets/css/public/list";

import React from "react";
import { Link } from "react-router";

export default class ProList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ul className="pro_list">
                { this.props.list.map(function(item) {
                    return (
                        <li key={item.id}>
                            <Link to={`/pro/detail/`+item.id}>
								<div className="avatar">
									<i className="iconfont">&#xe605;</i>
								</div>
								<div className="body">
									<div className="url">
										Pro Name: “ { item.prj_name } ”
									</div>
									<div className="name">
										Url Prefix: { item.url_prefix.replace(/^http:\/\//g, '') }
									</div>
									<div className="time">
										Time: { item.update_time }
									</div>
								</div> 
                            </Link>
                        </li>
                    )
                }) }
            </ul>
		)
	}

}

ProList.propTypes = {
	list: React.PropTypes.array.isRequired
}

