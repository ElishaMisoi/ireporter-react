import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react';
import '../css/ireporter.css';


const signInUrl = `${process.env.BASE_URL}/auth/login/`;
const localStorage = require('localStorage');


// displayMessage = () => {
//   render
//     {
//       return (
//         <div class="messageBox">
//         {isVisible ? this.renderElement : null? };
//         <Message warning>
//             <Message.Header>You must register before you can do that!</Message.Header>
//             <p name="message">Visit our registration page, then try again.</p>
//         </Message>
//       </div>
//       );
//     };
//   };

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
        setTimeout(()=>{this.props.history.push('/interventions')}, 3000);
        console.log('SUCCESS');
      }
      else{
          console.log(data.body.message);
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