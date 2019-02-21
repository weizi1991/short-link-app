import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showVisible: true
        }
    }
    componentDidMount() {
        this.visibleTracker = Tracker.autorun(() => {
            const showVisible = Session.get('showVisible');
            this.setState({
                showVisible
            })
        })
    }
    componentWillUnmount() {
        this.visibleTracker.stop();
    }
    render () {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                        Session.set('showVisible', !e.target.checked);
                    }}/>
                    show hidden Links
                </label>
            </div>
        )
    }
}