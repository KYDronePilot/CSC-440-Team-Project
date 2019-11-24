import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router';
import {LOGIN_URL} from './urls';

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <h2>Loading...</h2>;
            } else if (!auth.isAuthenticated) {
                return <Redirect to={LOGIN_URL}/>;
            } else {
                return <Component {...props}/>;
            }
        }}
    />
);

export default connect(
    mapStateToProps
)(PrivateRoute);
