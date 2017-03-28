import "../../assets/css/public/header";
import React from "react";
import { Link } from "react-router";
import className from "classnames";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMobile: true, 
            openMenu: false
        };
    }

    openMenu () {
        this.setState({
            openMenu: true
        });
    }

    closeMenu () {
        this.setState({
            openMenu: false
        });
    }

    render() {
        return (
            <div className="nav_bar">
                <div className="nav_logo">
                    Jn.api.system { this.props.version }
                </div>
                <div className={ className("nav_bar_mb", { "active" : this.state.openMenu} ) }>
                    <i className="iconfont" onTouchEnd={ this.openMenu.bind(this) }>&#xe600;</i>
                    <ul className="nav_list_mb" >
                        <li>
                            <Link to={`/home`} activeClassName="active">Home</Link>
                        </li>
                        <li>
                            <Link to={`/pro`} activeClassName="active">Projects</Link>
                        </li>
                    </ul>
                <div className="bg" onTouchEnd={ this.closeMenu.bind(this) }></div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    version: React.PropTypes.string.isRequired
};

export default Header;