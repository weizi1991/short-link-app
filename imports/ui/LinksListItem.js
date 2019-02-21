import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class LinksListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false,
        }
    }
    componentDidMount() {
        this.clipboard = new ClipboardJS(this.refs.copy);
        this.clipboard.on('success', ()=> {
            console.log('copied');
            this.setState({
                justCopied: true
            });
            setTimeout(()=> {
                this.setState({
                    justCopied: false
                })
            }, 1000);
        }).on('error', () => {
            alert('unable to copy.Please manually copy the link');
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderStats() {
        const visitMessage = (this.props.visitedCount === 0 || this.props.visitedCount === 1) ? 'visit' : 'visits';
        let visitedMessage = null;
        
        if (typeof this.props.lastVisitedAt === "number") {
            visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return (
            <p className="item_message">{this.props.visitedCount} {visitMessage}  {visitedMessage}</p>
        )
    }
    render() {
        return(
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item_message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? 'Copied' : 'Copy'}</button>
                <button className="button button--pill" ref="hide" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }}>
                    {this.props.visible ? 'Hide': 'Unhide'}
                </button>
            </div>
        )
    }
}

LinksListItem.propTypes = {
    shortUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number,
}