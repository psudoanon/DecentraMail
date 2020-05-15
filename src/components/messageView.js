import React from 'react';

export default class MessageViewComponent extends React.Component {

    constructor(props) {
        super(props);

        this.mountStyle = this.mountStyle.bind(this);
        this.unmountStyle = this.unmountStyle.bind(this);

        this.state = {
            style : {
                opacity: 0,
                transition: 'all 2s ease'
            },
            message : this.props.message
        }
    }

    componentDidMount() {
        setTimeout(this.mountStyle, 10);
        console.log(this.state.message)
    }

    componentWillUnmount() {
        setTimeout(this.unmountStyle, 10);
    }

    mountStyle() {
        this.setState({
            style : {
                opacity: 1,
                transition: 'all 2s ease'
            }
        });
    }

    unmountStyle() {
        this.setState({
            style : {
                opacity: 0,
                transition: 'all 2s ease'
            }
        });
    }


    render() {
        return (
            <div style={this.state.style} className="message-view">
                <div className="labeled-display from">
                    <div className="label"> From: </div>
                    <div className="contents" > { this.state.message.from } </div>
                </div>
                <div className="labeled-display subject">
                    <div className="label"> Subject: </div>
                    <div className="contents" > { this.state.message.subject } </div>
                </div>
                <div className="body">
                    { this.state.message.body }
                </div>
            </div>
        )
    }

}