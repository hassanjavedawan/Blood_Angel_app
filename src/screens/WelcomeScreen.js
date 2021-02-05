import React, { useEffect } from 'react'
import { Button, Container, Content, Text } from "native-base";
import { StyleSheet, View, StatusBar, Image, BackHandler, Alert, ScrollView } from 'react-native'
var bg1 = require('../images/bg2.jpg')
var logo = require('../images/logo.png')

const WelcomeScreen = ({ navigation }) => {
    const backAction = () => {
        Alert.alert("Blood Angel exit", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor='whitesmoke' />
            <Container style={{ backgroundColor: 'whitesmoke' }}>
                <ScrollView >
                    <Content>

                        <View>
                            <Image style={styles.Image} source={logo} />
                            <Button style={styles.Button} block danger onPress={() => navigation.navigate('LoginScreen')} >
                                <Text style={styles.Button_text}>Login </Text>
                            </Button>
                            <View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                                    <View>
                                        <Text style={{ width: 50, textAlign: 'center', backgroundColor: 'red', borderRadius: 50, color: 'white' }}>OR</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                                </View>
                            </View>
                            <Button style={styles.Button} block danger onPress={() => navigation.navigate('RegisterScreen')} >
                                <Text style={styles.Button_text}>Regiter now</Text>
                            </Button>
                        </View>
                        <Text style={styles.describtion}>BLOOD ANGEL</Text>
                        <Text style={styles.bio}>Developer Hassan Javed has created the Blood Angel application</Text>
                        <Text style={styles.version}>V 0.0.1</Text>
                    </Content>
                </ScrollView>
            </Container>
        </>
    )
}
const styles = StyleSheet.create({
    Image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 50
    },
    describtion: {
        textAlign: 'center',
        marginTop: 3,
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
    Button: {
        margin: 50,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'red',
        elevation: 10,
        fontWeight: 'bold',
    },
    Button_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    bio: {
        textAlign: 'center',
        color: 'red',
        width: '70%',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    version: {
        textAlign: 'center',
        color: '#424242',
        width: '70%',
        alignSelf: 'center',
        fontWeight: 'bold'
    }

})
export default WelcomeScreen
