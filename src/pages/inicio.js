import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';

export default class Page2 extends Component{
    render(){
        return (
            <div className='maindiv' >
                <div style={{marginLeft:'10%', marginRight:'10%', textAlign:'center'}}>
                    <h1 style={{fontWeight:'bold', fontFamily:'Dancing Script', fontSize:72, margin: 0, marginTop:25}}>Order</h1>
                    <img alt='' src='https://image.flaticon.com/icons/svg/227/227337.svg' style={img_style}/>
                </div>
                <div style={{marginLeft:'10%', marginRight:'10%', textAlign:'center', marginBottom:10}}>
                    <p style={{color:'white', fontFamily:'Dancing Script', fontSize:30}}> Crie uma Mesa e convide seus amigos para calcular sua conta sem esforço </p>
                    <RaisedButton backgroundColor='#2196F3' primary={true} label='Iniciar' onTouchTap={()=>this.check_in()} style={btn_style}/>
                </div>
            </div>
        )
    }

    check_in(){
        firebase.auth().signInAnonymously().then((user)=>{
            const url = ("/"+user.uid+'/0')
            firebase.database().ref('table/'+user.uid).set({
                id:user.uid
            }).then(()=>{
            return (window.location = url)})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

const btn_style = {
    width: '80%',
    height:'60'
}

const img_style = {
    marginTop:0,
    height:180,
    width:180
}