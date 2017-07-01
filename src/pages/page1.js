import React, { Component } from 'react';
import { Toolbar } from 'material-ui/Toolbar';
import AppBar from '../components/appbar'

export default class Page1 extends Component {

    render(){
        return (
            <div>
                <Toolbar style={{backgroundColor:'rgba(62,39,35,1)'}}>
                    <p style={{width:'100%', textAlign:'left', color:'rgba(249,168,37,1)', fontSize:18}}><span style={{fontWeight:'bold', fontSize:25}}>order</span> | instruções</p>
                </Toolbar>
                <div style={{width:'90%', marginLeft:'5%', marginRight:'5%'}}>
                    <p style={{color:'rgba(249,168,37,1)', fontSize:18, textAlign:"justify"}}>Conforme você for pedindo, registre no order quais pratos e com quem foram divididos para saber quanto cada um vai pagar no final</p>
                </div>
                <AppBar page={1}/>
            </div>
        )
    }
} 