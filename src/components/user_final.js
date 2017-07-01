import React , {Component} from 'react';
import {Card, CardHeader, CardTitle, CardActions } from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import firebase from 'firebase';
import {ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

export default class UserCard extends Component {
    state={slider:10, products:[], price:0.00}

    componentWillMount = ()=>{
        this.getProducts()
    }

    handleSlider=(event, value)=>{
        this.setState({slider:value})
    }

    preco_final = ()=>{
        return (this.state.price*(1.00+this.state.slider/100)).toFixed(2)
    }

    getProducts = ()=>{
        var self = this;
        firebase.database().ref(`table/${this.props.table}/pedidos`).on('value', function(value){
            if (value.val()!==null){
                self.setState({products:value.val()})
                self.getPrice()
            }
        })
    }

    getPrice = ()=>{
        var product = this.state.products;
        for (var i in product){
            if (product[i].users.indexOf(this.props.user.name) !== -1){
                if (product[i].users.length === 1){
                    var price = (product[i].preco/1).toFixed(2)
                } else {
                    var price = (product[i].preco/product[i].users.length).toFixed(2)
                }
                console.log(price)
                console.log(this.state.price)
                this.setState({price: this.state.price + +price})
            }
        }
    }

    gorjeta=()=>{
        return (this.state.price*this.state.slider/100).toFixed(2)
    }

    mapProducts = ()=>{
        var list = []
        for (var i in this.state.products){
            if (this.state.products[i].users.indexOf(this.props.user.name) !== -1){
                list = [...list, this.state.products[i]]
            }
        }
        return list.map((product)=>{
            var price = product.preco
            return <ListItem primaryText={product.product} secondaryText={price}/>
        })
    }

    render(){
        return (
            <Card style={{marginLeft:10, marginRight:10, marginBottom:10, marginTop:5}}>
                <CardHeader title={this.props.user.name} actAsExpander={true} showExpandableButton={true}/>
                <div expandable={true}>
                    {this.mapProducts()}
                </div>
                <CardActions>
                    <p style={{fontWeight:100}}>Serviço: {this.state.slider}%</p>
                    <Slider style={{height: 10,margin:0, padding:0}} step={1} min={0} max={30} value={this.state.slider} onChange={this.handleSlider}/>
                </CardActions>
                <div style={{paddingLeft:50, paddingRight:50}}>
                    <p>Preço: {this.state.price}</p>
                    <p>Serviço: {this.gorjeta()}</p><hr/>
                </div>
                <CardTitle style={{textAlign:'center'}} title={`Total: ${this.preco_final()}`}/>
            </Card>
        )
    }
}