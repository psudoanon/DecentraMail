import React from 'react';


export default class Compose extends React.Component {

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

    componentDidMount() {
        setTimeout(this.mountStyle, 10);
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
            <div style={this.state.style} className="compose">
                <div className="labeled-input to">
                    <div className="label"> To: </div>
                    <input type="text" placeholder="Arweave Address"></input>
                </div>
                <div className="labeled-input subject">
                    <div className="label"> Subject: </div>
                    <input type="text" placeholder="New Subject"></input>
                </div>
                <div className="action-bar">
                    
                </div>
                <div className="body">
                    <textarea></textarea>
                </div>
            </div>
        )
    }

}