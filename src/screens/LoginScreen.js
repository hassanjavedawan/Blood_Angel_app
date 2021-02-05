import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast, } from 'native-base';
import { View, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, StatusBar } from "react-native";
var logo = require('../images/logo.png')
var bg = require('../images/bg.jpg')


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [double, setDouble] = useState(false);

    const login = () => {
        if (!email.trim() || !password.trim()) {
            Toast.show({
                text: "'Please enter email and password'",
                buttonText: "Okay",
                type: "danger",
            })
            return;
        }
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setDouble(true);
                Toast.show({
                    text: "Login Successful",
                    buttonText: "Okay",
                    type: "success"
                }),
                    navigation.replace('BloodAngle')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                alert(error)
            });
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='red' />
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <ScrollView>
                    <Content >
                        <Form style={styles.Content}>
                            <Image style={styles.Image} source={logo} />
                            <View >

                                <Text style={styles.text}>Blood Donor Login</Text>
                            </View>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }} >

                                <Label style={styles.lable}><Icon name="envelope-open" style={{ fontSize: 20 }} color='red' />Email</Label>
                                <Input name='email-address' keyboardType='email-address' style={styles.Input} value={email} onChangeText={(text) => setEmail(text)} />
                            </Item>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }} >
                                <Label style={styles.lable} ><Icon name="lock" style={{ fontSize: 20 }} color='red' />Password</Label>
                                <Input secureTextEntry={true} style={styles.Input} value={password} onChangeText={(text) => setPassword(text)} />
                            </Item>
                            <Button disabled={double} style={styles.Button} block danger onPress={login}>
                                <Text style={styles.Button_text}>Login </Text>
                            </Button>
                        </Form>
                <Text style={styles.describtion}>BLOOD ANGEL</Text>
                        
                    </Content>
                </ScrollView>
            </Container>
        </>

    )
}
const styles = StyleSheet.create({

    text: {
        alignSelf: "center",
        color: 'red',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15,
    },
    Content: {

        display: 'flex',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 0,
        marginTop: 20,
        elevation: 10
    },
    Button_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    Image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
    Input: {
        borderBottomWidth: 1,
        borderColor: 'red',
        borderLeftWidth: 1,
        borderBottomLeftRadius: 20,
        borderLeftColor: 'red',
        borderRightWidth: 1,
        borderRightColor: 'red',
        borderBottomRightRadius: 20,
        height: 40,
        marginTop: 10,
        paddingRight: 20,
        paddingLeft: 20

    },
    Button: {
        margin: 40,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'red',
        elevation: 10,
    },
    lable: {
        color: 'black',
        fontSize: 18,
        marginLeft: 10
    },
    describtion: {
        textAlign: 'center',
        marginTop: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 33,
        width: '90%',
        borderRadius: 30,
        alignSelf: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 1 },
        textShadowRadius: 10,

    },

})
