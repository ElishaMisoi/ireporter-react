import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react';
import '../css/ireporter.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const signInUrl = `${process.env.BASE_URL}/auth/login/`;
const localStorage = require('localStorage');

class SignInForm extends Component {

  state = {
    isLoading: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }
    );
  }

  handleSubmit = (event) => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();
    const { history } = this.props;
    const { state } = this;
    fetch(signInUrl, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json().then(res => ({ status_code: response.status, body: res })))
      .then(data => {
        if (data.status_code == 200) {
          localStorage.setItem('user_token', data.body.token);
          toast.success("Logged In", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            className: 'toastSuccess'
          });
          window.location.pathname = '/interventions';
        }
        else {
          this.setState({
            isLoading: false,
          });
          console.log(data);
          var error = '';
          if (data.body.email) {
            error = data.body.email[0];
          }
          else if (data.body.username) {
            error = data.body.username[0];
          }
          else if (data.body.mobile_number) {
            error = data.body.mobile_number[0];
          }
          else if (data.body.password) {
            error = data.body.password[0];
          }
          else {
            error = 'Something went wrong, please try again.';
          }

          toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            className: 'toastError'
          });
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  displayMessage = () => {
    messageBox.class = visible_false;
  }

  render() {
    return (
      <div className="formDivClass">
        <div className="boxshadow" >
          <lable className="formLable">Sign in</lable>
          <div>
            <Form loading={this.state.isLoading} onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <input name='username' placeholder='email' onChange={this.handleChange} required />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input name='password' placeholder='password' type='password' onChange={this.handleChange} required />
              </Form.Field>
              <Button type='submit' block>Sign In</Button>
            </Form>
          </div>
          <div className="login">
            <p>No account?</p>
            <Link className="login-text" to="/signup">
              Signup here.
              </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default SignInForm;
