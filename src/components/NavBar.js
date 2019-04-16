import React, { Component } from 'react'
import { Input, Menu, Sticky, } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    window.location = `/${name}`
    setTimeout(()=>{this.props.history.push('/interventions')}, 3000);
  }

  render() {
    const { activeItem } = this.state
    const { history } = this.props;

    return (
      <div id="navBar">
        <h1 id="title">iReporter</h1>
        <Menu pointing>
          <Menu.Item name='interventions' active={activeItem === 'interventions'} onClick={this.handleItemClick} />
          <Menu.Item
            name='redflags'
            active={activeItem === 'redflags'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='signin'
            active={activeItem === 'signin'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
