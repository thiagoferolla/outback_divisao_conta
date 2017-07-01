import React, { Component } from 'react';
import AppBar from '../components/appbar';
import CopyToClipboard from 'react-copy-to-clipboard';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
//import axios from 'axios';

export default class Page0 extends Component {
    link = `https://orderapp.site/${this.props.match.params.tableId}/1`
    state={open:false} 
    apiKey = 'AIzaSyCUL5ZzMz5nMoZ9bIBQmN-nlowYwq90ENU'

    handleClose=()=>{this.setState({open:false})}

    render(){
        var actions =[<FlatButton onTouchTap={()=>this.handleClose()} secondary={true} label='Fechar'/>, <CopyToClipboard text={this.link}><FlatButton primary={true} label='Copiar Link'/></CopyToClipboard>]

        return (
            <div>
                <div style={{textAlign:'center', width:'90%', marginLeft:'5%', marginRight:'5%', marginTop:'5%'}}>
                    <h2 style={{width: '100%', fontFamily:'Open Sans', fontWeight:900, color:"rgba(249,168,37,1)",
                        lineHeight:1.1, fontSize:32, textAlign:'center', margin:0}}>
                        Chame seus amigos pra a mesa e divida a conta do seu jeito que você quiser
                    </h2>
                    
                    <div style={{width:'100%', marginTop:'20%', height:'12%'}}>
                        <FlatButton onTouchTap={()=>this.setState({open:true})} style={{height:'15%', width:'90%', color:'rgba(249,168,37,1)', borderRadius:1, borderWidth:1, borderColor:'rgba(249,168,37,1)', borderStyle:'solid', textAlign:'left'}} label='Compartilhe pelo WhatsApp' icon={<img style={{width:'15%', marginLeft:0}} alt='' src='https://image.flaticon.com/icons/svg/124/124034.svg'/>}/>
                    </div>

                </div>

                <Dialog actions={actions} modal={false} title='Link da Mesa' open={this.state.open} onRequestClose={this.handleClose} style={{width:'100%', height:'50%'}}>
                    Compartilhe o link abaixo para que seus amigos possam entrar na mesa<br/>
                    <span href={this.link}>{this.link}</span>
                </Dialog>

                <div>
                    <AppBar table={this.props.match.params.tableId} page={0}/>
                </div>
            </div>
        )
    }
}