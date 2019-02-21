import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
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

        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: `Unable to log in, ${err.reason}`});
            } else {
                this.setState({error: ''});
            }
        })
    }
    render () {
      return (
          <div className="boxed-view">
            <div className="boxed-view__box">
                  <h1>Short Link</h1>

                  {this.state.error ? <p>{this.state.error}</p> : undefined}
                  <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                      <input type="email" ref="email" name="email" placeholder="Email" />
                      <input type="password" ref="password" name="password" placeholder="Password" />
                      <button className="button">Log In</button>
                  </form>

                  <Link to='/signup'>Don't have an account?</Link>
            </div>
          </div>
      )
    }
}
