import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import {
    MDBCollapse,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from 'mdbreact';

function mapStateToProps(state) {
    return {auth: state.auth};
}

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.toggleNavbarOpen = this.toggleNavbarOpen.bind(this);
    }

    toggleNavbarOpen() {
        this.setState(state => ({isOpen: !state.isOpen}));
    }


    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
              <strong>{user ? `Welcome ${user.username}` : ''}</strong>
            </span>
                <li className="nav-item">
                    <button
                        onClick={this.props.logout}
                        className="nav-link btn btn-info btn-sm text-light"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <MDBContainer>
                <MDBNavbar color={'default-color'} dark expand={'md'}>
                    <MDBNavbarBrand>
                        <strong>College Progress Tracker</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleNavbarOpen} />
                    <MDBCollapse id={'nav-toggler'} isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <MDBNavLink to={'/'}>Grade Tracker</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to={'/concentration-progress'}>
                                    Concentration Progress Tracker
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            {isAuthenticated ? authLinks : guestLinks}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {logout}
)(Header);