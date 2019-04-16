import React, { Component } from "react";
import {
  Card,
  Header,
  Button,
  Image,
  Modal
} from "semantic-ui-react";
import "../css/ireporter.css";
import noImage from "../css/images/noimage.png";

const localStorage = require("localStorage");
let token = localStorage.getItem("user_token");
const interventionsUrl = `${process.env.BASE_URL}/interventions/`;
var selectedIncident = {};


class Interventions extends Component {
  state = {
    items: [],
    open: false
  };

  handleClick = (e, _id) => {
    e.preventDefault();
    this.state.items.forEach(incident => {
      if (incident.id === _id) {
        selectedIncident = incident;
        this.setState({ open: !this.state.open });  
      }
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  componentDidMount = () => {
    this.getAllredflags();
  };

  getAllredflags = () => {
    let config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    fetch(interventionsUrl, config)
      .then(response =>
        response
          .json()
          .then(res => ({ status_code: response.status, body: res }))
      )
      .then(data => {
        data.body.data.forEach(incident => {
          if (incident.Image === undefined || incident.Image == 0) {
            incident.image = noImage;
          } else {
            incident.image = incident.Image[0];
          }
        });
        this.setState({ items: data.body.data });
        console.log(this.state.items);
      })
      .catch(err => {
        console.warn(`Fetch Error: ${err}`);
      });
  };

  render() {
    const { open } = this.state;
    return (
      <div class="body listView">
        <Modal open={open}>
          <Modal.Header>Intervention</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={selectedIncident.image} />
            <Modal.Description>
              <Header>{selectedIncident.title}</Header>
              <p />
              <p>{selectedIncident.comment}</p>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <Card.Group centered>
          {this.state.items.map(card => (
            <Card
              key={card.id}
              className="cardItem"
              name={card.id}
              onClick={e => {
                this.handleClick(e, card.id);
              }}
            >
              <Image src={card.image} />
              <Card.Content>
                <Card.Header />
                <Card.Meta>
                  <span className="date">{card.createdBy}</span>
                </Card.Meta>
                <Card.Description>{card.comment}</Card.Description>
              </Card.Content>
            </Card>
          ))}
          ;
        </Card.Group>
      </div>
    );
  }
}

export default Interventions;
