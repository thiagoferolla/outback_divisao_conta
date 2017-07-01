import React, { Component } from 'react';
import firebase from 'firebase';
import Final from '../components/user_final';
import TabBar from '../components/tabbar';
import { Toolbar } from 'material-ui/Toolbar';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

export default class Page3 extends Component {
    state = {
        firstSlider: 0.1,
        users: [],
        table: this.props.match.params.tableId,
        products:[]
    }

    componentWillMount = ()=>{
        this.getUsers()
        this.getProducts()
    }

    getProducts = ()=>{
        var self = this
        firebase.database().ref(`table/${self.state.table}/pedidos`).on('value', (products)=>{
            self.setState({products:[]})
            for (var i in products.val()){
                self.setState({products: [...self.state.products, products.val()[i]]})
            }
        })
    }

    getUsers = ()=>{
        const self = this
        firebase.database().ref(`table/${self.props.match.params.tableId}/user`).on('value', function(users){
            if (users.val() != null){
            self.setState({users:users.val()})} else {
                self.setState({user:[]})
            }
        })
    }

    finalCard = () =>{
        var precofinal = 0;
        if (this.state.users.length !== 1 && this.state.products.length !== 0){
            return (
                <Card style={{backgroundColor:'rgba(249,168,37,1)', marginLeft:10, marginRight:10, marginBottom:10, marginTop:5}}>
                    <CardTitle title='Total'/>
                    <List>
                        {this.state.products.map((product)=>{
                            precofinal = +precofinal + +product.preco
                            return <ListItem primaryText={product.product} secondaryText={precofinal}/>
                        })}
                    </List>
                    <CardTitle style={{textAlign:'center'}} title={'Total: '+ parseFloat(precofinal).toFixed(2)} subtitle='(Serviço não incluido)'/>
                </Card>
            )
        }
    }

    render(){
        return (
            <div>
                <Toolbar style={{backgroundColor:'rgba(62,39,35,1)'}}>
                    <p style={{width:'100%', textAlign:'left', color:'rgba(249,168,37,1)', fontSize:18}}><span style={{fontWeight:'bold', fontSize:25}}>order</span> | conta</p>
                </Toolbar>
                {this.state.users.map(user=><Final user={user} table={this.props.match.params.tableId}/>)}
                
                {this.finalCard()}
                <FlatButton onTouchTap={()=>window.location='./4'} style={{color:'white', width:'100%', marginLeft:'10', marginRight:'10'}} label='Fechar Mesa' backgroundColor='#D32F2F'/>
                <div style={{height:50}}/>
                <TabBar/>
            </div>
        )
    }
}