import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';


export default class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'',
            isOpen: false,
            error: ''
        }
    } 
    componentDidMount() {
        Modal.setAppElement('#app');
    }
    onSubmit(e) {
        const { url } = this.state;
        e.preventDefault();
        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState ({error: err.reason });
            }
        });
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        })
    }
    handleModalClose() {
        this.setState({
            isOpen: false, 
            url: '', 
            error: ''
        });
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({isOpen: true}) } className="button">+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen}
                    onAfterOpen={()=> this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    contentLabel='Add link'
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add Link</h1>
                    {this.state.error !== "" ? <p>{this.state.error}</p> : null }
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input 
                            type="text" 
                            placeholder="URL" 
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}/>
                        <button className="button ">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                    
                </Modal>
            </div>
        )
    }

}