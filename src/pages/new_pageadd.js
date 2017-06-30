import React, { Component } from 'react';
import Cardapio from '../assets/cardapio';
import { List, ListItem } from 'material-ui/List';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Avatar from 'material-ui/Avatar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import TabBar from '../components/tabbar';


export default class Pageadd extends Component{
    constructor(props){
        super(props)
        this.state = {table:this.props.match.params.tableId, default_user: this.props.match.params.name, users: []}
    }

    launchCategory = (category)=>{
        window.location = `${this.state.default_user}/${category}`
    }

    mapCategories = ()=>{
        return Cardapio.map((category)=>{
            return <ListItem style={{color:'white' ,backgroundColor:'rgba(62,39,35,1)', borderStyle:'solid', borderWidth:1, borderColor:'rgba(254,225,135,1)'}} primaryText={category.name}
                    leftAvatar={<Avatar src={category.image}/>}
                    rightIcon={<ArrowForward/>} onTouchTap={()=>this.launchCategory(category.name)}/>
        })
    }

    render(){
        return (
            <div>
                <Toolbar style={{backgroundColor:'rgba(62,39,35,1)'}}>
                    <p style={{width:'100%', textAlign:'left', color:'rgba(249,168,37,1)', fontSize:18}}><span style={{fontWeight:'bold', fontSize:25}}>order</span> | menu</p>
                </Toolbar>
                <List style={{width:'90%', marginLeft:'5%'}}>
                    {this.mapCategories()}
                </List>
                <div style={{height:50}}/>
                <TabBar page='add'/>
            </div>
        )
    }
}