import React from 'react';

import Message from './message.js';

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible : this.props.visible,
            messages : this.props.messages
        }
    }

    render() {
        return (
            <div className="message-list">
                { this.state.messages }
            </div>
        )
    }

}