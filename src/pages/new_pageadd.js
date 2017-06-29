import React, { Component } from 'react';
import Cardapio from '../assets/cardapio';
import { List, ListItem } from 'material-ui/List';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Avatar from 'material-ui/Avatar';


export default class Pageadd extends Component{
    constructor(props){
        super(props)
        this.state = {table:this.props.match.params.tableId, default_user: this.props.match.params.name, users: []}
    }

    launchCategory = (category)=>{
        window.location = `${category}`
    }

    mapCategories = ()=>{
        return Cardapio.map((category)=>{
            return <ListItem style={{backgroundColor:'white'}} primaryText={category.name}
                    leftAvatar={<Avatar src={category.image}/>}
                    rightIcon={<ArrowForward/>} onTouchTap={()=>this.launchCategory(category.name)}/>
        })
    }

    render(){
        return (
            <List>
                {this.mapCategories()}
            </List>
        )
    }
}