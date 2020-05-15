import React from 'react';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.mountStyle = this.mountStyle.bind(this);
        this.unmountStyle = this.unmountStyle.bind(this);

        this.state = {
            style : {
                opacity: 0,
                transition: 'all 2s ease'
            }
        }
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

    componentDidMount() {
        setTimeout(this.mountStyle, 10);
    }

    componentWillUnmount() {
        setTimeout(this.unmountStyle, 10);
    }

    render() {
        return (
            <div style={this.state.style} className="sidebar">
                <div className="sidebar-option"> Inbox </div>
                <div className="sidebar-option"> Unread </div>
                <div className="sidebar-option"> Starred </div>
                <div className="sidebar-option"> Sent </div>
            </div>
        )
    }

}