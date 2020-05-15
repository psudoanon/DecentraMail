import React from 'react';
import './App.css';

import { ReactComponent as ComposeIcon } from './compose.svg';
import { ReactComponent as MenuIcon } from './menu.svg';
import { ReactComponent as CloseIcon } from './close.svg';

import Message from './components/message.js';
import Sidebar from './components/sidebar.js';
import Compose from './components/compose.js';
import MessageViewComponent from './components/messageView.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen : false,
      composeOpen : false,
      messages    : []
    };

    this.onCompose    = this.onCompose.bind(this);
    this.onMenuClick  = this.onMenuClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleMessageSelect = this.handleMessageSelect.bind(this);
  }

  componentDidMount() {
    const req = new XMLHttpRequest(),
          that = this;

    req.addEventListener('load', function () {
      const parsed_body = JSON.parse(this.responseText);

      that.setState({ messages : parsed_body });
    });

    req.open('GET', '/data.json');
    req.send()
  }

  onMenuClick(e) {
    e.preventDefault();

    if (!this.state.sidebarOpen) {
      this.setState({ sidebarOpen : true })
    } else {
      this.setState({ sidebarOpen : false }) 
    }
  }

  onCloseClick(e) {
    if (this.state.sidebarOpen) {
      this.setState({sidebarOpen : false})
    }

    if (this.state.composeOpen) {
      this.setState({composeOpen : false})
    }

    if (this.state.messagePreviewOpen) {
      this.setState({
        messagePreviewOpen : false,
        activeMessage : null
      })
    }
  }

  handleMessageSelect(msg) {
    console.log('click')
    console.log(msg)

    this.setState({
      sidebarOpen : false,
      composeOpen : false,
      messagePreviewOpen : true,
      activeMessage : msg
    })
  }

  getMessages() {
    if (this.state.messages.length > 0) {
      return this.state.messages.map((msg, idx) => <Message key={idx} data={msg} handleClick={this.handleMessageSelect} />)
    } else {
      // const msgs = []

      // for (let i = 0; i < 100; i++) {
      //   msgs.push(<Message onClick={ this.handleMessageSelect } key={i} ></Message>)
      // }
      // return msgs;

    }

    return [];
  }

  onCompose() {
    if (!this.state.composeOpen) {
      this.setState({composeOpen : true, sidebarOpen : false, messagePreviewOpen : false})
    }
  }

  render() {
    let sidebar = null;
    let compose = null;
    let message = null;
    let menuBtn = <MenuIcon className="menu-btn" onClick={ this.onMenuClick } />;
    let messages = this.getMessages();
    let displayMessages = true;



    if (this.state.sidebarOpen) {
      sidebar = <Sidebar mounted={true} />
      menuBtn = <CloseIcon className="menu-btn" onClick={ this.onCloseClick } />;
      displayMessages = false;
    }

    if (this.state.composeOpen) {
      displayMessages = false;
      menuBtn = <CloseIcon className="menu-btn" onClick={ this.onCloseClick } />;
      compose = <Compose />
    }

    if (this.state.messagePreviewOpen) {
      displayMessages = false;
      menuBtn = <CloseIcon className="menu-btn" onClick={ this.onCloseClick } />;
      message = <MessageViewComponent message={this.state.activeMessage} />
    }

    return (
      <div className="App">

        <div className="navigation">

          { menuBtn }

          <div className="header">
            DecentraMail
          </div>

          <ComposeIcon onClick={this.onCompose} className="compose-btn" />

        </div>

        { sidebar }

        {
          displayMessages ?
          <div className="message-list"> {messages} </div> :
          <div> </div>
        }

        { compose }

        { message }

      </div>
    );
  }
}
