import "../../assets/css/public/title";

import React from "react";

export default class Title extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h3 className="title" key={this.props.title}>{ this.props.title }</h3>
		)
	}

}

Title.propTypes = {
	title: React.PropTypes.string.isRequired
}

