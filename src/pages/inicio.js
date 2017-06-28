import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase';

export default class Page2 extends Component{
    render(){
        return (
            <div className='maindiv'>
                <div style={{marginLeft:'10%', marginRight:'10%', textAlign:'center'}}>
                    <h1>Order</h1>
                    <img alt='' src='https://image.flaticon.com/icons/svg/227/227337.svg' style={img_style}/>
                </div>
                <div style={{marginLeft:'10%', marginRight:'10%', textAlign:'center'}}>
                    <p> Crie uma Mesa </p>
                    <RaisedButton backgroundColor='#2196F3' primary={true} label='Iniciar' onTouchTap={()=>this.check_in()} style={btn_style}/>
                    <p>ou entre em uma.</p>
                </div>
            </div>
        )
    }

    check_in(){
        console.log(true)
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
    height:'80%',
    width:'80%'
}