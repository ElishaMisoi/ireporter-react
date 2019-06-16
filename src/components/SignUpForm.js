import React, { Component } from 'react'
import { Button, Form, Loader, Message } from 'semantic-ui-react';
import { createDiffieHellman } from 'crypto';
import { networkInterfaces } from 'os';
import { finished } from 'stream';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/ireporter.css';


const signUpUrl = `${process.env.BASE_URL}/auth/signup/`;
const localStorage = require('localStorage');


class SignUpForm extends Component {

  state = {
    isLoading: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();
    fetch(signUpUrl, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json().then(res => ({ status_code: response.status, body: res })))
      .then(data => {
        if (data.status_code == 201) {
          localStorage.setItem('user_token', data.body.token);
          toast.success(`An activation email has been sent to ${data.body.email}. Activate your account to sign up.`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: true,
            className: 'toastSuccess'
          })
          setTimeout(() => { this.props.history.push('/') }, 4000);
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
        console.log(error);
        this.setState({
          isLoading: false,
        });
        toast.error('Something went wrong, please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
          className: 'toastError'
        });
      });
  }

  render() {
    return (
      <div className="signUpformDivClass">
        <div className="signupBoxshadow" >
          <lable className="formLable">Sign Up</lable>
          <div>
            <Form loading={this.state.isLoading} className='signupform' onSubmit={this.handleSubmit}>
              <Form.Group widths={2}>
                <Form.Input name='first_name' label='First name' placeholder='first name' onChange={this.handleChange} required />
                <Form.Input name='last_name' label='Last name' placeholder='last name' onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input name='other_name' label='Other names' placeholder='other names' onChange={this.handleChange} required />
                <Form.Input name='username' label='Username' placeholder='username' onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input name='email' label='Email' placeholder='email' onChange={this.handleChange} required />
                <Form.Input name='mobile_number' label='Phone' placeholder='phone' onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input name='password' label='Password' placeholder='password' type='password' onChange={this.handleChange} required />
              </Form.Group>
              <Button type='submit' block>Sign Up</Button>
            </Form>
          </div>
          <div className="login">
            <p>Already have an account?</p>
            <Link className="login-text" to="/">
              Login here.
              </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default SignUpForm
