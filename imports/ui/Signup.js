import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        
        if(password.length < 9) {
            return this.setState({error: 'Password must set longer than 8 letters'});
        }
        Accounts.createUser( {email, password}, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        })
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Signup here</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form noValidate onSubmit={this.onSubmit.bind(this)} className="boxed-view__form ">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/"> Already have account? Login</Link>
                </div>
            </div>
        );
    }
}