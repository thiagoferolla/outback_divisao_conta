import React , {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import firebase from 'firebase';
import Snackbar from 'material-ui/Snackbar';

export default class Page4 extends Component {
    state = {NameInput:'', EmailInput:''}

    onEmailChange = (event) =>{
        this.setState({EmailInput: event.target.value})
    }

    onNameChange = (event) =>{
        this.setState({NameInput: event.target.value})
    }

    sendInfo = ()=>{
        var self=this;
        if (this.state.NameInput!=='' || this.state.EmailInput!==''){
            firebase.database().ref('/info').push({name:self.state.NameInput, email:self.state.EmailInput})
            self.setState({NameInput:'', EmailInput:'', open:true})
        }

    }

    render(){
        var pstyle={marginLeft:10, marginRight:10, fontFamily:'Montserrat', color:'rgba(249,168,37,1)', fontSize:18}
        return (
            <div className='maindiv'>
                <div style={{marginLeft:'10%', marginRight:'10%', textAlign:'center'}}>
                    <h1 style={{fontWeight:'bold', fontFamily:'Montserrat', fontSize:72, margin: 0, marginTop:25}}>
                        Obrigado!
                    </h1>
                </div>
            </div>
        )
    }
}