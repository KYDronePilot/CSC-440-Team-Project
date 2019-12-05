import React, {Component, FC} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import {
    MDBBtn,
    MDBCollapse,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from 'mdbreact';
import {CONCENTRATION_PROGRESS_URL, isGradeTrackingURL, LOGIN_URL, REGISTER_URL} from '../../routes/urls';
import {RouteComponentProps, withRouter} from 'react-router';

function mapStateToProps(state: any) {
    return {auth: state.auth};
}

interface NavBarTextProps {
    className: string;
}

const NavBarText: FC<NavBarTextProps> = ({children, className}) => {
    return <span className={`navbar-text ${className}`}>{children}</span>;
};

interface StateProps {
    auth: any;
}

interface DispatchProps {
    logout: () => void;
}

interface HeaderProps extends RouteComponentProps, DispatchProps, StateProps {
}

interface HeaderState {
    isOpen: boolean;
}

export class Header extends Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
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
            <>
                <NavBarText className={'mr-3 mt-2 text-white'}>
                    {user ? `Welcome ${user.first_name} ${user.last_name}` : ''}
                </NavBarText>
                <MDBNavItem>
                    <MDBBtn onClick={this.props.logout} color={'info'}>
                        Logout
                    </MDBBtn>
                </MDBNavItem>
            </>
        );

        const guestLinks = (
            <>
                <MDBNavItem active={this.props.location.pathname === REGISTER_URL}>
                    <MDBNavLink to={REGISTER_URL}>
                        Register
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem active={this.props.location.pathname === LOGIN_URL}>
                    <MDBNavLink to={LOGIN_URL}>
                        Login
                    </MDBNavLink>
                </MDBNavItem>
            </>
        );

        return (
            <MDBContainer fluid className={'mx-0 px-0'}>
                <MDBNavbar color={'default-color'} dark expand={'md'}>
                    <MDBNavbarBrand>
                        <strong>College Progress Tracker</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleNavbarOpen}/>
                    <MDBCollapse id={'nav-toggler'} isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active={isGradeTrackingURL(this.props.location.pathname)}>
                                <MDBNavLink to={'/'}>Grade Tracker</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active={this.props.location.pathname === CONCENTRATION_PROGRESS_URL}>
                                <MDBNavLink to={CONCENTRATION_PROGRESS_URL}>
                                    Concentration Progress Tracker
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className={'mt-2 ml-2'}>
                                <a
                                    href={'/vGSZCmHdZHEMkdsyvwIWPIqBuRWxOxFJriNkFIqggAePWpYcDQ'}
                                    className={'text-white'}
                                >
                                    Admin
                                </a>
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
)(withRouter<HeaderProps, typeof Header>(Header));
