import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { createDiffieHellman } from 'crypto';
import { networkInterfaces } from 'os';
import { finished } from 'stream';
import '../css/ireporter.css';


const signUpUrl = `${process.env.BASE_URL}/auth/signup/`;
const localStorage = require('localStorage');


class SignUpForm extends Component {

  state = {}

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

 handleSubmit = (event) => {
    event.preventDefault();
    fetch(signUpUrl, {
      method: 'POST',
      headers: {
        "Content-type":"application/json"},
      body: JSON.stringify(this.state)})
    .then(response => response.json().then(res => ({status_code: response.status, body: res})))
    .then(data => {
      if(data.status_code == 201){
        localStorage.setItem('user_token', data.body.token);
      }
      else{
          alert(data.body.message);
      }
    })
    .catch(error => {
      console.log(error)
    });
 }

  render(){ 
    return(
      <Form className='signupform' onSubmit={this.handleSubmit}>
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
        <Button type='submit'>Sign Up</Button>
    </Form>
    );
  }
};

export default SignUpForm