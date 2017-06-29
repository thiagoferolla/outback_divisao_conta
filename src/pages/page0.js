import React, { Component } from 'react';
import AppBar from '../components/appbar';

export default class Page0 extends Component {
    link = `orderapp.site/${this.props.match.params.tableId}/` 

    render(){
        return (
            <div>
                <div style={{backgroundColor:'rgba(254,225,135,1)', textAlign:'center', width:'100%'}}>
                    <h2 style={{width: '100%', fontFamily:'Dancing Script', fontWeight:900, color:"white", lineHeight:1.1, fontSize:42, textAlign:'center', margin:0}}>Convide seus Amigos para Contribuir</h2>
                    <div style={{width:'100%', textAlign:'center', height:50}}>
                        <p style={{fontWeight:100, color:'#2196F3', textAlign:'center', margin:'auto', height:50, marginTop:50}}><span style={{backgroundColor:'white', width:'90%'}}>{this.link}</span></p>
                    </div>
                </div>
                <div>
                    <AppBar table={this.props.match.params.tableId} page={0}/>
                </div>
            </div>
        )
    }
}