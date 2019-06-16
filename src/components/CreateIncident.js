import React, { Component } from "react";
import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import "../css/ireporter.css";
import { toast } from 'react-toastify';

const interventionsUrl = `${process.env.BASE_URL}/interventions/`;
const redflagsUrl = `${process.env.BASE_URL}/redflags/`;
const localStorage = require("localStorage");
let token = localStorage.getItem("user_token");
let incidentUrl = ''; 

const incidentOptions = [
  { key: "r", text: "Redflag", value: "redflag", name: "redflag" },
  { key: "i", text: "Intervention", value: "intervention", name: "intervention" }
];

let incident_type = '';

class CreateIncident extends Component {
  state = {};

  handleChange = (event, value) => {
    if(event.target.name === undefined){
      console.log(value);
      incident_type = value;
      this.setState({
        'incident_type': value
      });
    }
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    const { state } = this;

    if(incident_type === 'redflag'){
      incidentUrl = redflagsUrl;
    } else{
      incidentUrl = interventionsUrl;
    }

    let config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };
    
    fetch(incidentUrl, config)
    .then(response => response.json().then(res => ({status_code: response.status, body: res})))
    .then(data => {
      if(data.status_code == 201){
        localStorage.setItem('user_token', data.body.token);
        toast.success("Incident Posted", {
          position: toast.POSITION.TOP_CENTER,
          autoClose:3000,
          hideProgressBar:true,
          pauseOnHover:true,
          className: 'toastSuccess'
        })
        setTimeout(()=>{this.props.history.push(`/${incident_type}s`)}, 3000);
      }
      else{
          console.log(data.body.detail);
          toast.success(data.body.detail, {
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

  };

  displayMessage = () => {
    messageBox.class = visible_false;
  };

  render() {
    return (
      <div>
        <div class="createBoxshadow">
          <lable class="formLable">Create Incident</lable>
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-first-name"
                  control={Input}
                  label="Title"
                  required
                  onChange={this.handleChange}
                  placeholder="title..."
                  name="title"
                />
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  required
                  label="Location"
                  placeholder="location..."
                  onChange={this.handleChange}
                  name="location"
                />
                <Form.Field
                  control={Select}
                  required
                  id="incident_type"
                  options={incidentOptions}
                  label={{
                    children: "Incident type",
                    htmlFor: "form-select-control-gender"
                  }}
                  placeholder="type..."
                  search
                  onChange={(e, { value }) => this.handleChange(e, value)}
                  searchInput={{ id: "form-select-control-gender" }}
                />
              </Form.Group>
              <Form.Field
                required
                id="form-textarea-control-opinion"
                control={TextArea}
                onChange={this.handleChange}
                name="comment"
                label="Comment"
                placeholder="comment..."
              />
              <Form.Field
                required
                id="form-button-control-public"
                control={Button}
                type='submit'
                content="Submit"
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateIncident;
