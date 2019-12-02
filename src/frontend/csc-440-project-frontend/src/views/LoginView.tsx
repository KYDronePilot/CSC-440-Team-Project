import React, {Component, FormEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {REGISTER_URL, ROOT_URL} from '../routes/urls';

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

interface StateProps {
    isAuthenticated: boolean;
}

interface DispatchProps {
    login: (username: string, password: string) => void;
}

interface LoginViewProps extends StateProps, DispatchProps {

}

interface LoginViewState {
    username: string;
    password: string;
}

class LoginView extends Component<LoginViewProps, LoginViewState> {
    state = {
        username: '',
        password: ''
    };

    constructor(props: LoginViewProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onChange(e: FormEvent<HTMLInputElement>) {
        switch (e.currentTarget.name) {
            case 'username':
                this.setState({username: e.currentTarget.value});
                break;
            case 'password':
                this.setState({password: e.currentTarget.value});
                break;
            default:
                break;
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to={ROOT_URL}/>;
        }

        const {username, password} = this.state;
        return (
            <div className={'col-md-6 m-auto'}>
                <div className={'card card-body mt-5'}>
                    <h2 className={'text-center'}>Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className={'form-group'}>
                            <label>Username</label>
                            <input
                                type={'text'}
                                className={'form-control'}
                                name={'username'}
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className={'form-group'}>
                            <label>Password</label>
                            <input
                                type={'password'}
                                className={'form-control'}
                                name={'password'}
                                onChange={this.onChange}
                                value={password}
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

export default connect(
    mapStateToProps,
    {login}
)(LoginView);
