import "../assets/css/api";

import React from 'react';
import { connect } from 'react-redux'
import { fetchApis } from '../actions/index';

import ProList from "../components/public/List_Pro";

class Projects extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            proList: []
        }
    }

    componentWillMount () {
        this.props.dispatch(fetchApis({}));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.json !== this.props.json) {
            this.setState({
                proList: nextProps.json.data.project_list
            })
        }
    }

    render() {
        return (
            <div className="pro_box">
                <ProList list={ this.state.proList }></ProList>
            </div>
        )
    }
}

Projects.propTypes = {
    dispatch: React.PropTypes.func,
    json: React.PropTypes.object,
}

function mapStateToProps (state) {
    return {
        isLoading: state.common.isLoading
    }
}

export default connect(mapStateToProps)(Projects);