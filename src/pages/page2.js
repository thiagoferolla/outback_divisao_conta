import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import AppBar from '../components/appbar';
import FlatButton from 'material-ui/FlatButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import * as firebase from 'firebase';
import { red500 } from 'material-ui/styles/colors';

export default class Page2 extends Component{
    constructor(props){
        super(props)
        this.state = {table: this.props.match.params.tableId, user:[], products:[]}
    }

    componentDidMount(){
        this.getUsers()
        firebase.database().ref(`table/${this.state.table}/pedidos`).on('value', (products)=>{
            for (var i in products.val()){
                this.setState({products: [...this.state.products, products.val()[i]]})
            }
        })
    }

    getUsers = ()=>{
        const self = this
        firebase.database().ref(`table/${this.state.table}/user`).on('value', function(users){
            if (users.val() != null){
            self.setState({user:users.val()})} else {
                self.setState({user:[]})
            }
        })
    }

    mapProducts = (user)=>{
        return this.state.products.map((product)=>{
            for (var i=0; i<product.users.length; i++){
                if (user === product.users[i]){
                    return <ListItem style={{backgroundColor:'white'}}
                            primaryText={product.product} secondaryText={product.preco} disabled={true}
                            rightIcon={<RemoveCircle onClick={()=>this.removeProduct(product)} color={red500}/>}/>
                }
            } return null
        })
    }

    removeProduct = (product)=>{
        var index = this.state.products.indexOf(product)
        console.log(product===this.state.products[index])
        console.log(index)
        var newList = [...this.state.products]
        newList = newList.filter(item =>item !== product)
        this.setState({products:newList})
        firebase.database().ref(`table/${this.state.table}/pedidos`).set(newList)
    }

    render(){
        return (
            <div>
                <List>
                    {this.state.user.map((user)=>{return (
                        <div>
                            <Subheader style={subHeader}>{user.name}</Subheader>
                            {this.mapProducts(user.name)}
                            <FlatButton backgroundColor='white' onClick={()=>window.location=`add/${user.name}`} fullWidth={true} label='Adicionar items' primary={true} style={btnStyle} />
                        </div>
                    )})}
                </List>
                <div style={{height:50}}></div>
                <AppBar table={this.state.table} page={2}/>
            </div>
        )
    }
}

const subHeader = {
    backgroundColor:'#EEEEEE'
}

const btnStyle= {
    height:50
}