import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import firebase from 'firebase';
import Final from '../components/user_final';

export default class Page3 extends React.Component {
    state = {
        firstSlider: 0.1,
        users: []
    }

    componentWillMount = ()=>{
        this.getUsers()
    }

    getUsers = ()=>{
        const self = this
        console.log(this.props.match.params.tableId)
        firebase.database().ref(`table/${self.props.match.params.tableId}/user`).on('value', function(users){
            if (users.val() != null){
            self.setState({users:users.val()})} else {
                self.setState({user:[]})
            }
        })
    }

    render(){
        return (
            <div>
                {this.state.users.map(user=><Final user={user} table={this.props.match.params.tableId}/>)}
            </div>
        )
    }
}