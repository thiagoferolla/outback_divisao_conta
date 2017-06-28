import React, { Component } from 'react';
import AppBar from '../components/appbar';

export default class Page0 extends Component {
    link = `orderapp.site/${this.props.match.params.tableId}/` 

    render(){
        return (
            <div style={{backgroundColor:'rgba(254,225,135,1)', textAlign:'center'}}>
                <h2 style={{fontWeight:900, color:"white", lineHeight:1.1, fontSize:64, textAlign:'left', margin:0}}>CONVIDE SEUS AMIGOS PARA CONTRIBUIR</h2>
                <div style={{width:'100%', textAlign:'center', height:50}}>
                    <p style={{color:'#2196F3', textAlign:'center', margin:'auto', height:50, marginTop:50}}><span style={{backgroundColor:'white', fontSize:17}}>{this.link}</span></p>
                </div>
                <AppBar table={this.props.match.params.tableId} page={0}/>
            </div>
        )
    }
}