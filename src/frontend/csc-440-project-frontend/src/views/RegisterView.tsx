import React, {Component, FormEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../actions/auth';
import {LOGIN_URL} from '../routes/urls';

export interface NewUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

interface StateProps {
    isAuthenticated: boolean;
}

interface DispatchProps {
    register: (user: NewUser) => void;
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

interface RegisterViewProps extends StateProps, DispatchProps {

}

interface RegisterViewState {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

class RegisterView extends Component<RegisterViewProps, RegisterViewState> {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    constructor(props: RegisterViewProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {firstName, lastName, username, email, password, passwordConfirmation} = this.state;
        if (password !== passwordConfirmation) {
            console.log('Passwords do not match');
        } else {
            const newUser = {
                firstName,
                lastName,
                username,
                email,
                password
            };
            this.props.register(newUser);
        }
    }

    onChange(e: FormEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        switch (e.currentTarget.name) {
            case 'firstName':
                this.setState({firstName: value});
                break;
            case 'lastName':
                this.setState({lastName: value});
                break;
            case 'username':
                this.setState({username: value});
                break;
            case 'email':
                this.setState({email: value});
                break;
            case 'password':
                this.setState({password: value});
                break;
            case 'passwordConfirmation':
                this.setState({passwordConfirmation: value});
                break;
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={'/'}/>;
        }

        const state = this.state;
        return (
            <div className={'col-md-6 m-auto'}>
                <div className={'card card-body mt-5'}>
                    <h2 className={'text-center'}>Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className={'form-group'}>
                            <label>First Name</label>
                            <input
                                type={'text'}
                                className={'form-control'}
                                name={'firstName'}
                                onChange={this.onChange}
                                value={state.firstName}
                                autoComplete={'given-name'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Last Name</label>
                            <input
                                type={'text'}
                                className={'form-control'}
                                name={'lastName'}
                                onChange={this.onChange}
                                value={state.lastName}
                                autoComplete={'family-name'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Username</label>
                            <input
                                type={'text'}
                                className={'form-control'}
                                name={'username'}
                                onChange={this.onChange}
                                value={state.username}
                                autoComplete={'username'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Email</label>
                            <input
                                type={'email'}
                                className={'form-control'}
                                name={'email'}
                                onChange={this.onChange}
                                value={state.email}
                                autoComplete={'email'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Password</label>
                            <input
                                type={'password'}
                                className={'form-control'}
                                name={'password'}
                                onChange={this.onChange}
                                value={state.password}
                                autoComplete={'new-password'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Confirm Password</label>
                            <input
                                type={'password'}
                                className={'form-control'}
                                name={'passwordConfirmation'}
                                onChange={this.onChange}
                                value={state.passwordConfirmation}
                                autoComplete={'new-password'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <button type={'submit'} className={'btn btn-primary'}>
                                Register
                            </button>
                        </div>
                        <small className={'text-muted'}>
                            Already have an account? <Link to={LOGIN_URL}>Login</Link>
                        </small>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {register}
)(RegisterView);
