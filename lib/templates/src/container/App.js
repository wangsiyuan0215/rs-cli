import React from 'react';
import { connect } from 'react-redux';
import StaticContainer from 'react-static-container'
import ReactCssTransitionGroup from "react-addons-css-transition-group"

// 引入全局配置文件
import Config from "../../config/_config";

// 引入actions
import { showLoading } from '../actions/index';

// 引入组件
import Header from "../components/public/header";
import Loading from "../components/public/Loading";

// 引入样式表
import "../assets/css/common";

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            previousPathname: null
        }

        // props.dispatch(showLoading())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({ previousPathname: this.props.location.pathname })
        }
    }

    componentDidUpdate() {
        if (this.state.previousPathname) {
            this.setState({ previousPathname: null })
        }
    }

    render() {
        return (
            <section className="container">
                <Header version={ Config.version } ></Header>
                <ReactCssTransitionGroup
                    component="div"
                    className="transition_wrapper"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionName="fade" >

                    <StaticContainer
                        key={this.state.previousPathname || this.props.location.pathname}
                        shouldUpdate={!this.state.previousPathname} >
                        { this.props.children }
                    </StaticContainer>

                </ReactCssTransitionGroup>
                { this.props.isLoading ? (<Loading></Loading>) : ''  }
            </section>
        )
    }
}

App.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    location: React.PropTypes.object,
    children: React.PropTypes.object
}

function mapStateToProps(state) {
    return {
        isLoading: state.common.isLoading
    }
}

export default connect(mapStateToProps)(App)