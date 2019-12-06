import React, {Component, FormEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {REGISTER_URL, ROOT_URL} from '../routes/urls';
import TextInput from '../components/TextInput';
import check from 'check-types';

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

interface StateProps {
    isAuthenticated: boolean;
}

interface DispatchProps {
    login: (username: string, password: string) => any;
}

interface LoginViewProps extends StateProps, DispatchProps {
}

const username = 'username';
const password = 'password';

type Fields = typeof username | typeof password;

interface LoginViewState {
    [username]: string;
    [password]: string;
    displayFeedback: boolean;
}

export function toKeys<T extends string | number | symbol>(obj: { [key in T]: any }): T[] {
    return Object.keys(obj) as T[];
}

class LoginView extends Component<LoginViewProps, LoginViewState> {
    state = {
        username: '',
        password: '',
        displayFeedback: false
    };

    fields: { [key in Fields]: { invalidFeedback: (value: string) => string | undefined } } = {
        username: {
            invalidFeedback: this.usernameInvalidFeedback
        },
        password: {
            invalidFeedback: this.passwordInvalidFeedback
        }
    };

    constructor(props: LoginViewProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usernameInvalidFeedback = this.usernameInvalidFeedback.bind(this);
        this.passwordInvalidFeedback = this.passwordInvalidFeedback.bind(this);
        this.areFieldsValid = this.areFieldsValid.bind(this);
    }

    /**
     * Check if all fields are valid.
     * @return Whether all fields are valid
     */
    areFieldsValid() {
        // Ensure each field is valid
        for (const field of toKeys(this.fields)) {
            if (!check.undefined(this.fields[field].invalidFeedback(this.state[field])))
                return false;
        }
        return true;
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Display feedback if not already and an invalid field
        if (!this.state.displayFeedback && !this.areFieldsValid()) {
            this.setState({displayFeedback: true});
            return;
        }

        // Try to login the user
        this.props.login(this.state.username, this.state.password);
    }

    /**
     * Invalid feedback for the username field.
     * @param value - Feedback if invalid, else undefined
     */
    usernameInvalidFeedback(value: string) {
        if (value.length === 0)
            return 'Please enter a username';
    }

    /**
     * Invalid feedback for the password field.
     * @param value - Feedback if invalid, else undefined
     */
    passwordInvalidFeedback(value: string) {
        if (value.length === 0)
            return 'Please enter a password';
    }

    onChange(name: Fields, value: string) {
        this.setState(state => ({...state, [name]: value}));
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
                                value={state.username}
                                invalidFeedback={this.usernameInvalidFeedback}
                                name={'username'}
                                onChange={this.onChange}
                                autoComplete={'username'}
                            />
                        </div>
                        <div className={'form-group'}>
                            <TextInput
                                label={'Password'}
                                displayFeedback={state.displayFeedback}
                                value={state.password}
                                invalidFeedback={this.passwordInvalidFeedback}
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
