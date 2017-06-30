import React, { Component } from 'react';
import AppBar from '../components/appbar';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Page0 extends Component {
    link = `https://orderapp.site/${this.props.match.params.tableId}/1` 

    render(){
        return (
            <div>
                <div style={{textAlign:'center', width:'90%', marginLeft:'5%', marginRight:'5%', marginTop:'5%'}}>
                    <h2 style={{width: '100%', fontFamily:'Open Sans', fontWeight:900, color:"rgba(254,225,135,1)", lineHeight:1.1, fontSize:32, textAlign:'center', margin:0}}>Chame seus e amigos pra sua mesa e divida a conta do seu jeito que você quiser</h2>
                    <div style={{width:'100%', marginTop:'20%'}}>
                        <img alt='' src='https://image.flaticon.com/icons/svg/124/124034.svg' style={{width:'12%'}}/>
                        <p style={{color:'rgba(254,225,135,1)'}}>Compartilhe pelo whatsapp</p>
                    </div>
                </div>
                <CopyToClipboard text={this.link}><button>Copiar Link</button></CopyToClipboard>
                <div>
                    <AppBar table={this.props.match.params.tableId} page={0}/>
                </div>
            </div>
        )
    }
}