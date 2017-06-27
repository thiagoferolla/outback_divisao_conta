import React, { Component } from 'react';
import AppBar from '../components/appbar';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import Add from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import * as firebase from 'firebase';

export default class Page1 extends Component {
    constructor(props){
        super(props)
        this.state = {table: this.props.match.params.tableId, inputValue:'', users:[]}
        this.onInputChange = this.onInputChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount = ()=>{
        this.getUsers()
    }

    getUsers = ()=>{
        const self = this
        firebase.database().ref(`table/${this.state.table}/user`).on('value', function(users){
            if (users.val() != null){
            self.setState({users:users.val()})} else {
                self.setState({user:[]})
            }
        })
    }

    removeUser = (user)=>{
        var users = this.state.users;
        for (var i=0; i<users.length; i++){
            if (users[i].name===user){
                users.splice(i,1)
                firebase.database().ref(`table/${this.state.table}`).set({user:users})
            }
        }
    }

    addUser = async () =>{
        var newUser = {name:this.state.inputValue, products:[]}
        await this.setState({users:[...this.state.users, newUser]})
        console.log(this.state.users)
        firebase.database().ref(`table/${this.state.table}`).set({user:this.state.users})
        this.setState({inputValue:''})
    }

    onInputChange(event) {
        this.setState({inputValue: event.target.value})
    }

    render(){
        return (
                <div>
                    <div style={{textAlign:'center'}}>
                        <TextField value={this.state.inputValue} floatingLabelText="Adicionar Cliente"
                            onChange={this.onInputChange} />
                        <IconButton>
                            <Add onClick={()=>this.addUser()}/>
                        </IconButton>
                    </div>
                    <div>
                        <List>
                            {this.state.users.map((user)=>{
                                return (
                                    <ListItem key={user.name} rightIcon={<Close onClick={()=>this.removeUser(user.name)}/>} primaryText={user.name} disabled/>
                                )
                            })}
                        </List>
                    </div>
                    
                    <AppBar table={this.state.table} page={1}/>
                </div>
        )
    }
}