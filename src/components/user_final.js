import React , {Component} from 'react';
import {Card, CardExpandable, CardTitle, CardActions, CardText} from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import firebase from 'firebase';

export default class UserCard extends Component {
    state={slider:10, products:[], price:0}

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
                var price = product[i].preco/product[i].users.length
                this.setState({price: this.state.price + price})
            }
        }
    }

    render(){
        return (
            <Card>
                <CardTitle title={this.props.user.name}/>
                <CardActions>
                    <Subheader style={{marginBottom: 0}}>Gorjeta: {this.state.slider}%</Subheader>
                    <Slider style={{margin:0, padding:0}} step={1} min={0} max={100} value={this.state.slider} onChange={this.handleSlider}/>
                </CardActions>
                <CardTitle title={`Total: ${this.preco_final()}`}/>
                <CardText>
                    Gorjeta: {this.state.slider}
                    Total
                </CardText>
            </Card>
        )
    }
}