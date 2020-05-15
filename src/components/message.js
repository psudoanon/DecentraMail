import React from 'react';


export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messageData : this.props.data,
            read : false
        }

        this.handleClick = this.props.handleClick;
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    componentDidMount() {
        let read = window.localStorage.getItem(this.getLocalStorageReadStateKey());
        if (read !== null) {
            this.setState({
                read : read
            });
        }
    }

    handleMessageSelect(e) {
        this.setState({
            read : true
        }, () => {
            console.log('storage set')
            window.localStorage.setItem(this.getLocalStorageReadStateKey(), true);
            this.handleClick(this.state.messageData);

        });
    }

    getLocalStorageReadStateKey() {
        if (this.props.messageData) {
            return `${this.props.messageData.timestamp}${this.props.messageData.from}READ`
        }
       
    }

    makePreviewText(string) {
        if (string.length > 26) {
            return string.substring(0, 26) + '...';
        } else {
            return string;
        }
    }

    getSender() {
        let from = 'Placeholder';

        if (this.state.messageData && this.state.messageData.from) {
            from = this.makePreviewText(this.state.messageData.from);
        }

        return from;
    }

    getSubject() {
        let from = 'Placeholder Subject';

        if (this.state.messageData && this.state.messageData.subject) {
            from = this.makePreviewText(this.state.messageData.subject);
        }

        return from;
    }

    getPreview() {
        let from = 'Placeholder Message Preview';

        if (this.state.messageData && this.state.messageData.body) {
            from = this.makePreviewText(this.state.messageData.body);
        }

        return from;
    }

    getTimestamp() {
        let timestamp = '11:22 AM';

        if (this.state.messageData && this.state.messageData.timestamp) {
            const date = new Date(this.state.messageData.timestamp);

            timestamp = `${date.getHours()}:${date.getMinutes()}`
        }

        return timestamp;
    }

    render() {
        let style = {};

        if (this.state.read) {
            style.fontWeight = ''
        } else {
            style.fontWeight = 'bold'
        }

        return (
            <div style={style} className="message" onClick={this.handleMessageSelect}>
                <div className="message-from">
                    { this.getSender() }
                </div>
                <div className="message-subject">
                    { this.getSubject() }
                </div>
                <div className="message-preview">
                    { this.getPreview() }
                </div>
                <div className="message-timestamp">
                    { this.getTimestamp() }
                </div>
            </div>
        )
    }
}
