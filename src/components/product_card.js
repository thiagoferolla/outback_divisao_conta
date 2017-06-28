import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
//import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import firebase from 'firebase';
import Snackbar from 'material-ui/Snackbar';

export default class PCard extends React.Component {
    state = {values:[], open:false}
    names = this.props.names
    default_user = this.props.dUser
    table = this.props.table

    handleChange = (event, index, values) => {
        console.log(values)
        this.setState({values})
    }

    menuItems(values){
        return this.names.map((name)=>(
            <MenuItem key={name} insetChildren={true} checked={values && values.indexOf(name) > -1}
            value={name} primaryText={name}/>
        ))
        
    }

    addItem = () => {
        var pessoas = [...this.state.values, this.default_user]
        var preco = parseFloat(this.props.price/(pessoas.length)).toFixed(2)
        this.setState({open:true})
        firebase.database().ref(`table/${this.table}/pedidos`).push({product:this.props.title, users:pessoas, preco:preco})
        
    }
    
    render(){
        const values = this.state.values
        return (
            <div>
                <Card style={{margin:'10px'}}>
                    <CardTitle style={TitleStyle} title={this.props.title} subtitle={parseFloat(this.props.price).toFixed(2)}/>
                    <CardActions>
                            <SelectField style={{width:'100%'}} multiple={true} floatingLabelText="Dividir com" value={values} onChange={this.handleChange}>
                                {this.menuItems(values)}
                            </SelectField>
                            <FlatButton label='Adicionar' onClick={()=>this.addItem()}/>
                    </CardActions>
                </Card>
                <Snackbar
                    open={this.state.open}
                    message='Produto Adicionado'
                    autoHideDuration={1000}
                    onRequestClose={()=>this.setState({open:false})}/>
            </div>
        )
    }
}

const TitleStyle = {
    fontWeight:100,
    fontSize:20
}