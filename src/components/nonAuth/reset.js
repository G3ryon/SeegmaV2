import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../pratical/input.js';
import Modal from '../pratical/modal.js';
import { reset } from '../../api/api.js';


/*
props : setError : method to display message need a bool and a string 
RETURN: a view to handle the reset of a password
*/

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "juju_beber@gmail.com",
            isValid: null,
        }
        this.handleMail = this.handleMail.bind(this);
    }

    handleMail(text) {
        this.setState({ mail: text });
    }

    //function for checking the sign in
    handleReset(mail) {
        //checking the login
        reset(mail)
            .then(response => {
                if (response["status"] == "error" || response["status"] == "fail") {
                    this.props.setError(true, response["message"])

                }
                else {
                    this.props.setError(true, "Votre email n'est lié à aucun compte")
                }

            });
    }

    render() {
        const { isValid } = this.state;


        return (
            <View>
                <Image source={logo} />
                <Input
                    type={"text"}
                    required={true}
                    readonly={false}
                    value={this.state.mail}
                    caption={isValid && isValid[0] ? "" : "It's not a valid e-mail"}
                    status={isValid && isValid[0] ? "" : "danger"}
                    onChange={this.handleMail}
                    pattern={[
                        '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', // email regex
                    ]}
                    onValidation={isValid => this.setState({ isValid })}
                    placeHolder={"Mail"} />
                <Button disabled={isValid && isValid[0] ? false : true} onPress={() => this.handleReset(this.state.mail)}>Submit</Button>
                <Button onPress={() => this.props.navigation.navigate('login')} >I remembered my password</Button>

            </View>)
    }
}
export default Reset;
