import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
//import AppBar from '../components/appbar';
import Cardapio from '../assets/cardapio';
import PCard from '../components/product_card';
import { Card, CardHeader } from 'material-ui/Card';
import firebase from 'firebase';

export default class Page2 extends Component{
    constructor(props){
        super(props)
        this.state = {table: this.props.match.params.tableId, default_user:this.props.match.params.name, user:[]}
    }
    

    mapProducts = (products) =>{
        products.map(product=>{return <ListItem key={product.name} primaryText={product.name} secondaryText={product.price}/>})
    }

    componentDidMount=()=>{
        this.getUser()
    }

    getUser=()=>{
        var self = this
        firebase.database().ref(`table/${this.state.table}/user`).on('value', function(users){
            if (users.val() != null){
            self.setState({user:users.val()})
            console.log(self.state.user[0])
            } else {
                self.setState({user:[]})
            }
        })
    }

    shareUsers = () => {
        var users = this.state.user;
        for (var i=0; i<users.length; i++){
            if (users[i].name===this.state.default_user){
                users.splice(i,1)
            }
        }
        var list = []
        for (var f=0; f<users.length; f++){
            list = [...list, users[f].name];
        }
        return list
    }

    render(){
        return (
            <div>
                {Cardapio.map(category => {return (
                    <Card>
                        <CardHeader style={subHeader} title={category.name} actAsExpander={true} showExpandableButton={true}/>
                        <div expandable={true}>
                        {category.produtos.map(product => {return <PCard table={this.state.table} dUser={this.state.default_user} names={this.shareUsers()} title={product.name} price={product.price}/>})}
                        </div>
                    </Card>
                )})}
            </div>
        )
    }
}

const subHeader = {
    backgroundColor:'#EEEEEE'
}