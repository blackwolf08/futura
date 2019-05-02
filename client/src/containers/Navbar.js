import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import logo from '../images/undraw_japan_ubgk.png'

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    };
    render() {
        return (
            <nav className="navbar navbar-expand" style={styles.navi}>
                <div className="container-fluid">
                    <div className="navbar-header" style={{display:'flex', alignItems:'center'}}>
                    <img src={logo} style={{height:'50px',width:'50px'}} alt="" />
                    <h2>Futura</h2>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/">Feed</Link>
                            </li>
                            <li>
                                <Link
                                    to={`/users/${
                                        this.props.currentUser.user.id
                                    }/messages/new`}
                                >
                                    New Message
                                </Link>
                            </li>
                            <li>
                                <Link to="/post-image">Post Photo</Link>
                            </li>
                            <li>
                                <Link to="/raise-issue">Raise Issue</Link>
                            </li>
                            <li>
                                <a onClick={this.logout}>Log out</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Log in</Link>
                            </li>
                            
                        </ul>
                    )}
                </div>
            </nav>
        );
    }
}

const styles = {
    navi:{
        width: '100%',
        zIndex: '100',
        position: 'relative',
        top: '0',
        left: '0'
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, { logout })(Navbar);
