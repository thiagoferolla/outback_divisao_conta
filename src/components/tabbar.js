import React, { Component } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Link from 'material-ui/svg-icons/social/share';
import ViewList from 'material-ui/svg-icons/action/view-list';

export default class TabBar extends Component{

    handleNavigation = (page)=>{
        if (this.props.page==='add'){
            console.log(true)
            return window.location=`./../${page}`
        } else {
            return window.location=`./${page}`
        }
    }

    render(){
        return (
            <div className='toolbar'>   
                <Toolbar style={{backgroundColor:'rgba(249,168,37,1)'}}>
                    <ToolbarGroup onClick={()=>{this.handleNavigation(11)}}><Link/>Link</ToolbarGroup>
                    <ToolbarGroup onClick={()=>{this.handleNavigation(2)}}><Dashboard/>Dashboard</ToolbarGroup>
                    <ToolbarGroup onClick={()=>{this.handleNavigation(3)}}><ViewList/>Conta</ToolbarGroup>
                </Toolbar>
            </div>
        )
    }
}