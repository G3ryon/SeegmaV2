import React, {Component} from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import { Button } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../../components/pratical/input.js';
import { authentification, storeData } from '../../api/api.js';
import { TokenContext } from '../general/context';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view for the login and the authentification
*/


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            password: "",
            login: "",
            token: "",
        }
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    static contextType = TokenContext;

    handlePassword(text) {
        this.setState({ password: text });
    }

    handleLogin(text) {
        this.setState({ login: text });
    }

    //function for checking the sign in
    handleSignin(login, password) {
        if(login.length == 0 || password.length < 8){
        //checking for the user length
        if(login.length == 0){
            this.setState({statusLog:"danger", captionLog: "You need to enter your username"})
        }
        //checking for the password length
        if(password.length < 8){
            this.setState({statusPass:"danger", captionPass: "Password should at least contain 8 symbols"})
        }}
        //checking the login
        else{
        authentification(login, password)
            .then(response => {
                
                if (response["success"] === 0) {
                    this.setState({statuspass:"danger", statusLog:"danger", captionPass: response["explanation"] })

                }
                else {
                    let token = response["data"]["access_tokens"][0];
                    this.setState({ token: token});
    
                    this.context.handleToken(token)
                    storeData({authToken: token, signIn: "drawer"},"@storage_Key")
                    this.props.navigation.navigate("drawer")
                }
                
            });
    }}

    render(){

        return(
        
        <SafeAreaView level='4'>
           <Image testID='logo' source={logo}/>
           <Input testID='loginID' type={"text"} required={true} status={this.state.statusLog} caption={this.state.captionLog} readonly={false} value={this.state.login} onChange={this.handleLogin} placeHolder={"Login"}></Input>
           <Input 
            testID='password'
            type={"password"} 
            required={true} 
            status={this.state.statusPass} 
            caption={this.state.captionPass} 
            readonly={false} 
            value={this.state.password} 
            onChange={this.handlePassword} 
            placeholder={"Password"}/>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
           <Button testID='login_Button' onPress={() => this.handleSignin(this.state.login, this.state.password)}>Login</Button>
           <Button testID='register_Button' onPress={() => this.props.navigation.navigate('signup')}>SignUp</Button>
           <Button testID='forget_Button' onPress={() => this.props.navigation.navigate('reset')}>Forgot your password?</Button>
           </View>
        </SafeAreaView>  )
    }
    
}
export default Login;
