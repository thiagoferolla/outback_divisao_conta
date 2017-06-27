import React, { Component } from 'react';
import AppBar from '../components/appbar'

export default class Page0 extends Component {

    render(){
        return (
            <AppBar table={this.props.params.match.table} page={0}/>
        )
    }
}