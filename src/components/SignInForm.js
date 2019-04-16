import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react';
import '../css/ireporter.css';
import { toast } from 'react-toastify';


const signInUrl = `${process.env.BASE_URL}/auth/login/`;
const localStorage = require('localStorage');

class SignInForm extends Component {

  state = {}

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    }
    );
    console.log(this.state);
  }

 handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { state } = this;
    fetch(signInUrl, {
      method: 'POST',
      headers: {
        "Content-type":"application/json"},
      body: JSON.stringify(state)})
    .then(response => response.json().then(res => ({status_code: response.status, body: res})))
    .then(data => {
      if(data.status_code == 200){
        localStorage.setItem('user_token', data.body.token);
        toast.success("Logged In", {
          position: toast.POSITION.TOP_CENTER,
          autoClose:3000,
          hideProgressBar:true,
          pauseOnHover:true,
          className: 'toastSuccess'
        })
        setTimeout(()=>{this.props.history.push('/interventions')}, 3000);
      }
      else{
          console.log(data.body.message);
          toast.success(data.body.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose:3000,
            hideProgressBar:true,
            pauseOnHover:true,
            className: 'toastError'
          })
      }
    })
    .catch(error => {
      console.log(error)
    });
 }

 displayMessage = () => {
    messageBox.class = visible_false;
 }

  render(){
    return(
      <div class="formDivClass">
        <div class="boxshadow" >
          <lable class="formLable">Sign in</lable>
          <div>
            <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email</label>
              <input name='username' placeholder='email' onChange={this.handleChange} required/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input name='password' placeholder='password' type='password' onChange={this.handleChange} required/>
            </Form.Field>
            <Button type='submit'>Sign In</Button>
          </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default SignInForm;