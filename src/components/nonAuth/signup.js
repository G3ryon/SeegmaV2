import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../pratical/input.js';
import { signup } from '../../api/api.js';
import Modal from '../pratical/modal.js';
/*
       
RETURN: a view for signing up
*/

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            mail: "juju_beber@gmail.com",
            password: "AZERTYUIOP1",
            passwordbis: "AZERTYUIOP1",
            username: "z",
            isValidMail: null,
            isValidPass: [false,false,false],


        }
        this.handleMail = this.handleMail.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordbis = this.handlePasswordbis.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.samePass = this.samePass.bind(this);
    }

    handleMail(text) {
        this.setState({ mail: text });
    }

    handleUsername(text) {
        this.setState({ username: text });
    }

    handlePassword(text) {
        this.setState({ password: text });
    }

    handlePasswordbis(text) {
        this.setState({ passwordbis: text });
    }

    handleVisibility(value) {
        this.setState({ visible: false });
        console.log(value)
    }

    handleSignup(mail,username,password) {
        //checking the login
        
        signup(mail,username,password)
            .then(response => {
                
                if (response["success"] === 1) {
                    this.setState({visible:true, msg:'You have been succesfully sign up'})
                    
                }
                else {
                    this.setState({visible:true, msg:"Your username is already taken"})
                }
                
            });
    }

    samePass(){
            if(this.state.password === this.state.passwordbis){
                return true
            }
            return false
        }
    

    render(){
        const { isValidMail, isValidPass, isValidUser } = this.state;
        
        //function to display the correct caption in function of the condition of validation
        function captionEditPass(condition, captionSent){
            var caption = ""
            for(var elem in condition){
                if(condition &&  !condition[elem]){
                    caption = caption.concat(captionSent[elem], " / ");
                }
            }
            return caption
        }


        return(
        <View>
           <Image source={logo}/>
           <Text>Register a new account</Text>
           <Input 
            type={"text"} 
            required={true} 
            status={this.state.statusMail} 
            caption={this.state.captionMail} 
            readonly={false} 
            caption={isValidMail && isValidMail ? "" : "It's not a valid e-mail" }
            status={isValidMail && isValidMail ? "success" : "danger" }
            pattern={
                '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$' // email regex
              }
            value={this.state.mail} 
            onChange={this.handleMail} 
            onValidation={isValidMail => this.setState({ isValidMail })}
            placeholder={"Email"}/>

            <Input 
            type={"text"} 
            required={true} 
            status={this.state.statusUser} 
            caption={this.state.captionUser} 
            readonly={false} 
            caption={isValidUser && isValidUser ? "" : "An username is required" }
            status={isValidUser && isValidUser ? "success" : "danger" }
            pattern={
                '^.{1,}$'// required
              }
            onValidation={isValidUser => this.setState({ isValidUser })}
            value={this.state.username} 
            onChange={this.handleUsername} 
            placeholder={"Username"}/>

            <Input 
            type={"password"} 
            required={true} 
            status={this.state.statusPass} 
            caption={this.state.captionPass} 
            readonly={false} 
            pattern={[
                '^.{8,}$', // min 8 chars
                '(?=.*\\d)', // number required
                '(?=.*[A-Z])', // uppercase letter
              ]}
            caption={captionEditPass(isValidPass,["Need 8 characters","A number is required","An uppercase is required"])}
            status={isValidPass.every(Boolean)? "success" : "danger" }
            onValidation={isValidPass => this.setState({ isValidPass })}
            value={this.state.password} 
            onChange={this.handlePassword} 
            placeholder={"Password"}/>

            <Input 
            type={"password"} 
            required={true} 
            status={this.state.statusPassbis} 
            caption={this.state.captionPassbis} 
            readonly={false} 
            caption={this.samePass()? "" : "The passwords are not the same" }
            status={this.samePass()? "success" : "danger" }
            value={this.state.passwordbis} 
            onChange={this.handlePasswordbis} 
            placeholder={"Reapeat password"}/>

            <Modal visible={this.state.visible} onVisibility={this.handleVisibility} infos={<Text>{this.state.msg}</Text>} exitText={"dissmis"} admitBackdrop={true} admitButton={true}/>

           <Button disabled={(isValidUser && isValidUser)&&(isValidPass.every(Boolean))&&(isValidMail && isValidMail)&&this.samePass() ? false : true} onPress={() => this.handleSignup(this.state.mail,this.state.username, this.state.password)}>Submit</Button>
           <Button onPress={() => this.props.navigation.navigate('login')}>I already have an account</Button>
        </View>)
    }
    
}
export default Signup;
