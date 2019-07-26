import React from 'react';
import {Button, FormGroup, FormControl} from 'react-bootstrap';

class AuthForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

    updateInput = (event, inputField) => {
        const inputFieldValue = event.target.value;
        this.setState({[inputField]: inputFieldValue});
    }

    updatePassword = (event) => {
        const password = event.target.value;
        this.setState({password});
    }

    signup = (e) => {
        console.log('this.state', this.state);
    }

    signin = (e) => {
        console.log('this.state', this.state);
    }

    render() {
        return (
            <div>
                <h2>Dragon Pop</h2>
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.username}
                        placeholder="username"
                        onChange={e => this.updateInput(e, 'username')}/>
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type='password'
                        value={this.state.password}
                        onChange={(e) => this.updateInput(e, 'password')}
                        placeholder="password"/>
                </FormGroup>
                <div>
                    <Button onClick={this.signin}>Log In</Button>
                    <span>
                        or
                    </span>
                    <Button onClick={this.signup}>Sign Up</Button>
                </div>
            </div>
        );
    }
}

export default AuthForm;