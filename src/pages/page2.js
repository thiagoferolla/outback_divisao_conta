import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import TabBar from '../components/tabbar';
import FlatButton from 'material-ui/FlatButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import firebase from 'firebase';
import { red500 } from 'material-ui/styles/colors';
import { Toolbar } from 'material-ui/Toolbar';
import { Card, CardTitle } from 'material-ui/Card';
import Close from 'material-ui/svg-icons/navigation/close';
import Add from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

export default class Page2 extends Component{
    constructor(props){
        super(props)
        this.state = {table: this.props.match.params.tableId, user:[], products:[], inputValue:''}
    }

    componentDidMount(){
        this.getUsers()
        var self = this
        firebase.database().ref(`table/${this.state.table}/pedidos`).on('value', (products)=>{
            console.log(products.val())
            var productss = []
            console.log(productss)
            for (var i in products.val()){
                productss = [...productss, products.val()[i]]
            }
            console.log(productss)
            self.setState({products:productss})
        })
    }

    getUsers = ()=>{
        const self = this
        firebase.database().ref(`table/${this.state.table}/user`).on('value', function(users){
            if (users.val() != null){
                console.log(users.val())
            self.setState({user:users.val()})} else {
                self.setState({user:[]})
            }
        })
    }

    mapProducts = (user)=>{
        return this.state.products.map((product)=>{
            for (var i=0; i<product.users.length; i++){
                var shareUsers = product.users.filter((f)=>{return f !== product.users[i]})
                if (user === product.users[i]){
                    var preco = (product.preco/product.users.length).toFixed(2)
                    var secondaryText = `${preco} (Dividido com: ${shareUsers})`
                    return <ListItem style={{backgroundColor:'white'}}
                            primaryText={product.product} secondaryText={secondaryText} disabled={true}
                            rightIcon={<RemoveCircle onClick={()=>this.removeProduct(product)} color={red500}/>}/>
                }
            } return null
        })
    }

    removeProduct = (product)=>{
        var newList = [...this.state.products]
        newList = newList.filter(item =>item !== product)
        this.setState({products:newList})
        firebase.database().ref(`table/${this.state.table}/pedidos`).set(newList)
    }

    removeUser = (user)=>{
        var users = this.state.user;
        for (var i=0; i<users.length; i++){
            console.log(users)
            if (users[i].name===user.name){
                users.splice(i,1)
                this.setState({user:users})
                firebase.database().ref(`table/${this.state.table}`).set({user:users})
            }
        }
    }


    addUser = async () =>{
        if (this.state.inputValue !== ''){
            var newUser = {name:this.state.inputValue}
            await this.setState({user:[...this.state.user, newUser]})
            firebase.database().ref(`table/${this.state.table}/user`).set(this.state.user)
            this.setState({inputValue:''})}
    }

    onInputChange=(event)=> {
        this.setState({inputValue: event.target.value})
    }

    keypress=(event)=>{
        if (event.key === 'Enter'){
            this.addUser()
        }
    }

    buttondisabled=()=>{
        if (this.state.inputValue === ''){
            return true
        } else {
            return false
        }
    }


    render(){
        return (
            <div>
                <Toolbar style={{backgroundColor:'rgba(62,39,35,1)'}}>
                    <p style={{width:'100%', textAlign:'left', color:'rgba(249,168,37,1)', fontSize:18}}><span style={{fontWeight:'bold', fontSize:25}}>order</span> | dashboard</p>
                </Toolbar>

                <div style={{textAlign:'center', backgroundColor:'white', paddingBottom:20, marginTop:20, marginLeft:'5%', marginRight:'5%'}}>
                    <TextField style={{width:'90%', color:'white'}}
                        value={this.state.inputValue}
                        floatingLabelText="Nome"
                        onChange={this.onInputChange}
                        onKeyPress={this.keypress}
                        />
                    <FlatButton disabled={this.buttondisabled()} primary={true} label='Adicionar Amigo' icon={<Add/>} onTouchTap={()=>this.addUser()}/>
                </div>

                <div style={{width:'90%', marginLeft:'5%'}}>
                <List>
                    {this.state.user.map((user)=>{return (
                        <Card style={{marginBottom:10}}>
                            <CardTitle style={subHeader}>{user.name}<span style={{position:'fixed', right:'10%'}}><Close onClick={()=>this.removeUser(user)}/></span></CardTitle>
                            {this.mapProducts(user.name)}
                            <FlatButton backgroundColor='white' onClick={()=>window.location=`add/${user.name}`}
                                fullWidth={true} label='Adicionar items' primary={true} style={btnStyle} />
                        
                        </Card>
                    )})}
                </List>
                </div>
                <div style={{height:50}}></div>
                <TabBar table={this.state.table} page={2}/>
            </div>
        )
    }
}

const subHeader = {
    backgroundColor:'#EEEEEE',
    fontWeight:'bold'
}

const btnStyle= {
    height:50
}