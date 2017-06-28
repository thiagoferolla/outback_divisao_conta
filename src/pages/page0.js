import React, { Component } from 'react';
import AppBar from '../components/appbar';
import axios from 'axios';

export default class Page0 extends Component {
    link = `order-81eaa.firebaseapp.com/${this.props.match.params.tableId}/` 

    shortURL = (url)=>{
        axios.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCdHe-l33SEkYbnN8aAd3Bna9bPCfH8_zs', {"longUrl":url}).then((response)=>console.log(response.data))
    }

    componentDidMount = ()=>{
        this.shortURL(this.link)
    }

    render(){
        return (
            <div style={{backgroundColor:'rgba(254,225,135,1)', textAlign:'center'}}>
                <h2 style={{fontWeight:900, color:"white", lineHeight:1.1, fontSize:64, marginTop:40, textAlign:'left'}}>CONVIDE SEUS AMIGOS PARA CONTRIBUIR</h2>
                <div style={{width:'100%', textAlign:'center'}}>
                    <p style={{backgroundColor:'white', color:'#2196F3', width:300, textAlign:'center', margin:'auto'}}>link_para_mesa.com</p>
                </div>
                <AppBar table={this.props.match.params.tableId} page={0}/>
            </div>
        )
    }
}