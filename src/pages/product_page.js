import React, { Component } from 'react';
import Cardapio from '../assets/cardapio';
import PCard from '../components/product_card';
import firebase from 'firebase';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class ProductPage extends Component {
    constructor(props){
        super(props)
        this.state = {category: this.props.match.params.category, products:[], 
                default_user:this.props.match.params.name,
                table:this.props.match.params.tableId, users:[]}
        }

    componentWillMount(){
        this.getProducts()
        this.getUsers()
    }

    getUsers = () => {
        var self = this;
        firebase.database().ref(`table/${this.state.table}/user`).on('value', function(users){
            if (users.val() != null){
                self.setState({users:users.val().map((user)=>{return user.name})})
                var list = [...users.val()]
                for (var i=0; i<list.length;i++){
                    if (list[i].name===self.state.default_user){
                        list.splice(i,1)
                    }
                }
            } else {
                self.setState({user:[]})
            }
        })
    }

    solveUser=()=>{
        return this.state.users.filter((i)=> {return i!== this.state.default_user})
    }

    getProducts = ()=>{
        for (var i in Cardapio){
            if (Cardapio[i].name===this.state.category){
                this.setState({products:Cardapio[i].produtos})
            }
        }
    }

    mapProducts = () =>{
        return this.state.products.map((product)=>{
            return <PCard table={this.state.table} dUser={this.state.default_user} names={this.solveUser()} title={product.name} price={product.price}/>
        })
    }

    render(){
        if ((this.state.shareUser!==[] && this.state.users.length>1) || (this.state.users.length===1)){
            return (
                <div>
                    {this.mapProducts()}
                    <div style={{height:55}}/>
                    <Toolbar className='toolbar' style={{backgroundColor:'rgba(249,168,37,1)'}}>
                        <ToolbarGroup onClick={()=>window.location='./'}><ArrowBack/>Voltar</ToolbarGroup>
                    </Toolbar>
                </div>
            )} return null
    }
}