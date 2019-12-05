import React, {Component, FormEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {REGISTER_URL, ROOT_URL} from '../routes/urls';
import TextInput from '../components/TextInput';

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export interface TextFieldState {
    value: string;
    valid: boolean;
    invalidFeedback: string;
}

interface StateProps {
    isAuthenticated: boolean;
}

interface DispatchProps {
    login: (username: string, password: string) => any;
}

interface LoginViewProps extends StateProps, DispatchProps {

}

interface LoginViewState {
    username: TextFieldState;
    password: TextFieldState;
    displayFeedback: boolean;
}

class LoginView extends Component<LoginViewProps, LoginViewState> {
    state = {
        username: {
            value: '',
            valid: false,
            invalidFeedback: 'Please enter a username'
        },
        password: {
            value: '',
            valid: false,
            invalidFeedback: 'Please enter a password'
        },
        displayFeedback: false
    };

    constructor(props: LoginViewProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.invalidField = this.invalidField.bind(this);
    }

    /**
     * Check if at least one field is invalid.
     */
    invalidField() {
        const {
            username,
            password
        } = this.state;
        return !username.valid || !password.valid;
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Display feedback if not already and an invalid field
        if (!this.state.displayFeedback && this.invalidField()) {
            this.setState({displayFeedback: true});
        }

        // Try to login the user
        this.props.login(this.state.username.value, this.state.password.value);
    }

    /**
     * Validate a username.
     * @param value - Value to validate
     */
    validateUsername(value: string) {
        if (value.length === 0)
            return 'Please enter a username';
        return '';
    }

    /**
     * Validate a password.
     * @param value - Value to validate
     */
    validatePassword(value: string) {
        if (value.length === 0)
            return 'Please enter a password';
        return '';
    }

    onChange(e: FormEvent<HTMLInputElement>) {
        let invalidFeedback;
        switch (e.currentTarget.name) {
            case 'username':
                invalidFeedback = this.validateUsername(e.currentTarget.value);
                this.setState({
                    username: {
                        value: e.currentTarget.value,
                        valid: invalidFeedback === '',
                        invalidFeedback
                    }
                });
                break;
            case 'password':
                invalidFeedback = this.validatePassword(e.currentTarget.value);
                this.setState({
                    password: {
                        value: e.currentTarget.value,
                        valid: invalidFeedback === '',
                        invalidFeedback
                    }
                });
                break;
            default:
                break;
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={ROOT_URL}/>;
        }

        const state = this.state;
        return (
            <div className={'col-md-6 m-auto'}>
                <div className={'card card-body mt-5'}>
                    <h2 className={'text-center'}>Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className={'form-group'}>
                            <TextInput
                                label={'Username'}
                                displayFeedback={state.displayFeedback}
                                valid={state.username.valid}
                                value={state.username.value}
                                invalidFeedback={state.username.invalidFeedback}
                                name={'username'}
                                onChange={this.onChange}
                                autoComplete={'username'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <TextInput
                                label={'Password'}
                                displayFeedback={state.displayFeedback}
                                valid={state.password.valid}
                                value={state.password.value}
                                invalidFeedback={state.password.invalidFeedback}
                                name={'password'}
                                onChange={this.onChange}
                                autoComplete={'current-password'}
                                password
                            />
                        </div>
                        <div className={'form-group text-center'}>
                            <button type={'submit'} className={'btn btn-primary'}>
                                Login
                            </button>
                        </div>
                        <small className={'text-muted'}>
                            Don't have an account? <Link to={REGISTER_URL}>Register</Link>
                        </small>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    {login}
)(LoginView);
