import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import database from "@react-native-firebase/database";
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import { StyleSheet, ScrollView, Linking, TouchableOpacity, StatusBar } from "react-native";
var logo = require('../images/logo.png')
 
const RegisterScreen_2 = ({ navigation }) => {
    const [double, setDouble] = useState(false);
    const [bloodGroup, setbloodGroup] = useState('');
    const [medical, setMedical] = useState('');

    const [Other, setOther] = useState('')
    const [BMI, setBMI] = useState('')

    const register = () => {
        let medical_info = {
            bloodGroup,
            medical,
            Other,
            BMI
        }
        if (!bloodGroup.trim() || !medical.trim()) {
            Toast.show({
                text: "Blood Group and BMI required",
                type: "danger"
            })
            return;
        }

        auth().onAuthStateChanged(function (user) {
            if (user) {
                database().ref('/').child(`Personal information/${user.uid}/medical_info`).set(medical_info).then(() => {
                    navigation.replace('BloodAngle')
                    Toast.show({
                        text: "Sign up  Successful",
                        type: "success"
                    })
                })
                setDouble(true);

            } else {
                // No user is signed in.
            }
        });

    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='red' />
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <Icon name="medkit" style={{ marginTop: 15, fontSize: 50, textAlign: "center" }} color='red' />
                <Text style={styles.text}>Medical information</Text>
                <ScrollView>
                    <Content >
                        <Form style={styles.Content}>
                            <Item style={{ borderBottomWidth: 0 }} stackedLabel>
                                <Label style={styles.lable}>Blood Group</Label>
                                <Picker
                                    selectedValue={bloodGroup}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => setbloodGroup(itemValue)} >
                                    <Picker.Item label="Select Blood group" value="select...." />
                                    <Picker.Item label="O+" value="O+" />
                                    <Picker.Item label="O-" value="O-" />
                                    <Picker.Item label="A+" value="A+" />
                                    <Picker.Item label="A-" value="A-" />
                                    <Picker.Item label="B+" value="B+" />
                                    <Picker.Item label="B-" value="B-" />
                                    <Picker.Item label="AB+" value="AB+" />
                                    <Picker.Item label="AB-" value="AB-" />
                                </Picker>
                            </Item>
                            <Item style={{ borderBottomWidth: 0 }} stackedLabel>
                                <Label style={styles.lable}>Past Medical Record</Label>
                                <Picker
                                    selectedValue={medical}
                                    style={styles.picker1}
                                    onValueChange={(itemValue, itemIndex) => setMedical(itemValue)} >
                                    <Picker.Item label="Select ......" value="select...." />
                                    <Picker.Item label="Cancer" value="Cancer" />
                                    <Picker.Item label="Cardiac disease" value="Cardiac disease" />
                                    <Picker.Item label="Sever lung disease" value="Sever lung disease" />
                                    <Picker.Item label="Hepatitis B and C" value="Hepatitis B and C" />
                                    <Picker.Item label="HIV infection, AIDS or Sexually Transmitted Diseases (STD)" value="HIV infection, AIDS or Sexually Transmitted Diseases (STD)" />
                                    <Picker.Item label="High risk occupation (e.g. prostitution)" value="High risk occupation (e.g. prostitution)" />
                                    <Picker.Item label="Unexplained weight loss of more than 5 kg over 6 months)" value="Unexplained weight loss of more than 5 kg over 6 months)" />
                                    <Picker.Item label="Chronic alcoholism" value="Chronic alcoholism" />
                                    <Picker.Item label="Acute fever" value="Acute fever" />
                                    <Picker.Item label="None" value="None" />
                                </Picker>
                            </Item>

                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable} >BMI  (Body Mass Index)</Label>
                                <Input value={BMI} keyboardType='default' style={styles.Input} onChangeText={(text) => setBMI(text)} />
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.nhs.uk/live-well/healthy-weight/bmi-calculator/')}><Text style={{ color: 'blue' }}>Check your BMI</Text></TouchableOpacity>
                            </Item>


                            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                                <Label style={styles.lable} >Other</Label>
                                <Input value={Other} keyboardType='default' style={styles.Input} onChangeText={(text) => setOther(text)} />
                            </Item>
                            <Button disabled={double} style={styles.Button} block danger onPress={register}>
                                <Text style={styles.Button_text}>Register Now</Text>
                            </Button>
                        </Form>
                    </Content>
                </ScrollView>
            </Container>
        </>

    )
}

export default RegisterScreen_2;

const styles = StyleSheet.create({
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
        elevation: 10
    },
    Image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    },
    picker: {
        height: 40,
        width: '80%',
        color: '#424242',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 30


    },
    picker1: {
        height: 40,
        width: '80%',
        color: '#424242',
        fontSize: 40,
        fontWeight: '900',
        alignSelf: 'center',
        marginBottom: 30

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
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 13,
        justifyContent: "space-between"
    },
    checkbox: {
        alignSelf: "center",
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
        color: 'red',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    register: {
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 20,
    }
})
