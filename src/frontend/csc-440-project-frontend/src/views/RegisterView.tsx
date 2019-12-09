import React, {Component, FormEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../actions/auth';
import {LOGIN_URL} from '../routes/urls';
import check from 'check-types';
import validator from 'validator';
import TextInput from '../components/TextInput';
import {toKeys} from './LoginView';


interface StateProps {
    isAuthenticated: boolean;
}

interface DispatchProps {
    register: (firstName: string, lastName: string, username: string, email: string, password: string) => void;
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

interface RegisterViewProps extends StateProps, DispatchProps {

}

const firstName = 'firstName';
const lastName = 'lastName';
const username = 'username';
const email = 'email';
const password = 'password';
const passwordConfirmation = 'passwordConfirmation';

type Fields = (
    typeof firstName | typeof lastName | typeof username
    | typeof email | typeof password | typeof passwordConfirmation);

interface RegisterViewState {
    [firstName]: string;
    [lastName]: string;
    [username]: string;
    [email]: string;
    [password]: string;
    [passwordConfirmation]: string;
    displayFeedback: boolean;
}

class RegisterView extends Component<RegisterViewProps, RegisterViewState> {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        displayFeedback: false
    };

    fields: { [key in Fields]: { invalidFeedback: (value: string) => string | undefined } };

    constructor(props: RegisterViewProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.onChange = this.onChange.bind(this);
        this.passwordInvalidFeedback = this.passwordInvalidFeedback.bind(this);
        this.passwordConfirmationInvalidFeedback = this.passwordConfirmationInvalidFeedback.bind(this);
        this.fields = {
            firstName: {
                invalidFeedback: RegisterView.firstNameInvalidFeedback
            },
            lastName: {
                invalidFeedback: RegisterView.lastNameInvalidFeedback
            },
            username: {
                invalidFeedback: RegisterView.usernameInvalidFeedback
            },
            email: {
                invalidFeedback: RegisterView.emailInvalidFeedback
            },
            password: {
                invalidFeedback: this.passwordInvalidFeedback
            },
            passwordConfirmation: {
                invalidFeedback: this.passwordConfirmationInvalidFeedback
            }
        };
    }

    private static firstNameInvalidFeedback(value: string) {
        if (check.emptyString(value))
            return 'Please enter your first name';
    }

    private static lastNameInvalidFeedback(value: string) {
        if (check.emptyString(value))
            return 'Please enter your last name';
    }

    private static usernameInvalidFeedback(value: string) {
        if (check.emptyString(value))
            return 'Please enter a username';
        if (!/^[\w.@+-]+$/.test(value))
            return 'The username may contain only letters, numbers, and @/./+/-/_ characters.';
    }

    private static emailInvalidFeedback(value: string) {
        if (check.emptyString(value))
            return 'Please enter your email address';
        if (!validator.isEmail(value))
            return 'Email address is not valid';
    }

    /**
     * Check if all fields are valid.
     * TODO: Should only be one of these
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
        // TODO: Should only be one of this part
        // Display feedback if not already and an invalid field
        if (!this.state.displayFeedback && !this.areFieldsValid()) {
            this.setState({displayFeedback: true});
            return;
        }
        const {firstName, lastName, username, email, password} = this.state;

        // Make registration request
        this.props.register(firstName, lastName, username, email, password);
    }

    onChange(name: Fields, value: string) {
        this.setState(state => ({...state, [name]: value}));
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
                        <TextInput
                            label={'First Name'}
                            value={state.firstName}
                            name={firstName}
                            onChange={this.onChange}
                            displayFeedback={state.displayFeedback}
                            autoComplete={'given-name'}
                            invalidFeedback={RegisterView.firstNameInvalidFeedback}
                        />
                        <TextInput
                            label={'Last Name'}
                            value={state.lastName}
                            name={lastName}
                            onChange={this.onChange}
                            displayFeedback={state.displayFeedback}
                            autoComplete={'family-name'}
                            invalidFeedback={RegisterView.lastNameInvalidFeedback}
                        />
                        <TextInput
                            label={'Username'}
                            value={state.username}
                            name={username}
                            onChange={this.onChange}
                            displayFeedback={state.displayFeedback}
                            autoComplete={'username'}
                            invalidFeedback={RegisterView.usernameInvalidFeedback}
                        />
                        <TextInput
                            label={'Email'}
                            value={state.email}
                            name={email}
                            onChange={this.onChange}
                            displayFeedback={state.displayFeedback}
                            autoComplete={'email'}
                            invalidFeedback={RegisterView.emailInvalidFeedback}
                        />
                        <TextInput
                            label={'Password'}
                            value={state.password}
                            name={password}
                            onChange={this.onChange}
                            displayFeedback={state.displayFeedback}
                            autoComplete={'new-password'}
                            invalidFeedback={this.passwordInvalidFeedback}
                            password
                        />
                        <TextInput
                            label={'Confirm Password'}
                            value={state.passwordConfirmation}
                            name={passwordConfirmation}
                            onChange={this.onChange}
                            displayFeedback={state.displayFeedback}
                            autoComplete={'new-password'}
                            invalidFeedback={this.passwordConfirmationInvalidFeedback}
                            password
                        />
                        <div className={'form-group text-center'}>
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

    private passwordInvalidFeedback(value: string) {
        if (check.emptyString(value))
            return 'Please enter a password';
        if (this.state.passwordConfirmation !== value)
            return 'Passwords do not match';
    }

    private passwordConfirmationInvalidFeedback(value: string) {
        if (check.emptyString(value))
            return 'Please confirm the password entered above';
        if (this.state.password !== value)
            return 'Passwords do not match';
    }
}

export default connect(
    mapStateToProps,
    {register}
)(RegisterView);
