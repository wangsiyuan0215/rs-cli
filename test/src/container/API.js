import "../assets/css/api";

import React from 'react';
import {connect} from 'react-redux'
import { loadingActionCreator, requestApi } from '../actions/index';

import List from "../components/public/List";

class API extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            homeData: {}
        }
    }

    componentWillMount() {
        this.props.dispatch(loadingActionCreator(true));
        this.props.dispatch(requestApi("123"));
    }

    render() {
        let newList = typeof this.state.homeData.newList === "undefined" ? [] : this.state.homeData.newList;
        return (
            <div>
                <List content={ newList }></List>
            </div>
        )
    }
}

API.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
}

function mapStateToProps (state) {
    return {
        isLoading: state.common.isLoading
    }
}

export default connect(mapStateToProps)(API);