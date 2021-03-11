import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../pratical/input.js';
import Modal from '../pratical/modal.js';
import { reset } from '../../api/api.js';


/*

RETURN: a view to handle the reset of a password
*/

class Reset extends Component{
    constructor(props){
        super(props);
        this.state = {
            mail: "juju_beber@gmail.com",
            isValid: null,
            visible: false,
            msg: "",
        }
        this.handleMail = this.handleMail.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
    }

    handleMail(text) {
        this.setState({ mail: text });
    }

    handleVisibility(value) {
        this.setState({ visible: value });
    }


    //function for checking the sign in
    handleReset(mail) {
        //checking the login
        
        reset(mail)
            .then(response => {
                
                if (response["success"] === 1) {
                    this.setState({visible:true, msg:'Un mail a été envoyé'})
                    
                }
                else {
                    this.setState({visible:true, msg:"Votre email n'est lié à aucun compte"})
                }
                
            });
    }
    
    render(){
        const { isValid } = this.state;
        

        return(
        <View>
           <Image source={logo}/>
           <Input 
           type={"text"} 
           required={true} 
           readonly={false} 
           value={this.state.mail} 
           caption={isValid && isValid[0] ? "" : "It's not a valid e-mail" }
           status={isValid && isValid[0] ? "" : "danger" }
           onChange={this.handleMail} 
           pattern={[
            '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', // email regex
          ]}
           onValidation={isValid => this.setState({ isValid })}
           placeHolder={"Mail"}/>
           <Button disabled={isValid && isValid[0] ? false : true} onPress={() => this.handleReset(this.state.mail)}>Submit</Button>
           <Button onPress={() => this.props.navigation.navigate('login')} >I remembered my password</Button>
           
      <Modal visible={this.state.visible} onVisibility={this.handleVisibility} infos={<Text>{this.state.msg}</Text>} exitText={"dissmis"} admitBackdrop={true} admitButton={true}/>

        </View>)
    }
}
export default Reset;
