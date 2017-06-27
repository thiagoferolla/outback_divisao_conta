import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
//import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import firebase from 'firebase';

export default class PCard extends React.Component {
    state = {values:[], user:[]}
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

    getUser = ()=>{
        const self = this
        firebase.database().ref(`table/${this.state.table}/user`).on('value', function(users){
            if (users.val() != null){
            self.setState({user:users.val()})} else {
                self.setState({user:[]})
            }
        })
    }

    addItem = () => {
        var pessoas = [...this.state.values, this.default_user]
        var preco = parseFloat(this.props.price/(pessoas.length)).toFixed(2)
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
            </div>
        )
    }
}

const TitleStyle = {
    fontWeight:100,
    fontSize:20
}