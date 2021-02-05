import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import database from "@react-native-firebase/database";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import { StyleSheet, ScrollView, StatusBar } from "react-native";


const RegisterScreen = ({ navigation }) => {
    const [double, setDouble] = useState(false);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('')
    const signUp = () => {
        if (!email.trim() || !firstname.trim() || !lastName.trim() || !age.trim() || !city.trim() || !number.trim() || !password.trim()) {
            Toast.show({
                text: "All feild are required",
                type: "danger",
            })
            return;
        }
        /**
         *  Auth
         */
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                let personal_info = {
                    email,
                    age,
                    city,
                    password,
                    displayName: `${firstname} ${lastName}`,
                    phoneNumber: number,
                    uid: user.uid
                }

                /**
                 * database
                 */

                database().ref('/').child('Personal information/' + user.uid).set(personal_info).then(() => {
                    setDouble(true);
                    navigation.replace('RegisterScreen_2')
                })

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!')
                }

                else if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                else if (error.code === 'auth/weak-password') {

                    alert('Password should be at least 6 characters');
                }
                alert(error)
            });
    }

    return (
        <>
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <StatusBar barStyle='light-content' backgroundColor='red' />
                <Icon name="user" style={{ marginTop: 15, fontSize: 50, textAlign: "center" }} color='red' />
                <Text style={styles.text}>personal information</Text>
                <ScrollView>
                    <Content >
                        <Form style={styles.Content}>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }} >
                                <Label style={styles.lable}>Email</Label>
                                <Input value={email} keyboardType='email-address' style={styles.Input} onChangeText={(text) => setEmail(text)} />
                            </Item>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable}>First Name</Label>
                                <Input value={firstname} keyboardType="default" style={styles.Input} onChangeText={(text) => setFirstname(text)} />
                            </Item>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable}>Last Name</Label>
                                <Input value={lastName} keyboardType="default" style={styles.Input} onChangeText={(text) => setLastName(text)} />
                            </Item>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable}>Age</Label>

                                <Input value={age} keyboardType="decimal-pad" style={styles.Input} onChangeText={(text) => setAge(text)} />
                            </Item>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable}>City</Label>
                                <Input value={city} keyboardType="default" style={styles.Input} onChangeText={(text) => setCity(text)} />
                            </Item>
                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable}>Phone Number</Label>
                                <Input value={number} keyboardType="number-pad" style={styles.Input} onChangeText={(text) => setNumber(text)} />
                            </Item>

                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable} >Password</Label>
                                <Input value={password} secureTextEntry={true} style={styles.Input} onChangeText={(text) => setPassword(text)} />
                            </Item>
                            <Button disabled={double} style={styles.Button} block danger onPress={signUp} >
                                <Text style={styles.Button_text}>continue</Text>
                            </Button>
                        </Form>
                    </Content>
                </ScrollView>
            </Container>
        </>
    )
}


export default RegisterScreen;

const styles = StyleSheet.create({
    header: {
        paddingLeft: 30,
        paddingTop: 30
    },
    text: {
        alignSelf: "center",
        color: 'red',
        fontSize: 24,
        fontWeight: 'bold',

    },
    Content: {

        display: 'flex',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 0,
        marginTop: 20,
        // height: 500
        elevation: 10
    },
    Image: {
        width: 150,
        height: 150,
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
        paddingLeft: 20,
        paddingRight: 20


    },
    Button: {
        margin: 30,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'red',
        elevation: 10,
    },
    Button_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    lable: {
        color: 'black',
        fontSize: 18,
        marginLeft: 10
    },
    register: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20,
    }
})
