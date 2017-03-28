import "../assets/css/home";

import React from 'react';
import { connect } from 'react-redux';

// components
import Title from "../components/public/Title";
import List from "../components/public/List";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            homeData: {}
        }
    }

    componentWillMount () {
    }

    render() {
        let newList = typeof this.state.homeData.newList === "undefined" ? [] : this.state.homeData.newList;
        return (
            <div className="home_box" key="home_box">
                <ul className="list" key="list">
                    <li className="apis" key="apis">
                        <i className="iconfont" key="api_icon">&#xe603;</i>
                        <p key="api_num">Api：{ ~~this.state.homeData.api }</p>
                    </li>
                    <li className="pro" key="pro">
                        <i className="iconfont" key="pro_icon">&#xe605;</i>
                        <p key="pro_num">Project：{ ~~this.state.homeData.project }</p>
                    </li>
                    <li className="user" key="user">
                        <i className="iconfont" key="user_icon">&#xe604;</i>
                        <p key="user_num">User：{ ~~this.state.homeData.user }</p>
                    </li>
                </ul>
                <Title title={"Newest Apis ("+ newList.length +")"}></Title>
                <List content={ newList }></List>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.common.isLoading
    }
}

export default connect(mapStateToProps)(Home);