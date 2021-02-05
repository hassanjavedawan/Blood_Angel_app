import React, { useState, useEffect } from 'react'
import database from "@react-native-firebase/database";
import auth from '@react-native-firebase/auth';
import { connect, } from "react-redux";
import { StyleSheet, View } from 'react-native'
import { Body, Container, Content, Text, Thumbnail, Card, CardItem, Right, Left, Button, Toast } from "native-base";
var userIcon = require('../images/userIcon.png')


const Profile = ({ navigation }) => {
    const [double, setDouble] = useState(false);
    const [myData, setMyData] = useState([])

    const signOut = () => {
        auth()
            .signOut()
            .then(() => Toast.show({
                text: "Sign Out!",
                buttonText: "Okay",
                type: 'danger'
            }),
                setDouble(true),
                navigation.replace('LoginScreen')
            )
    }
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        var arr = []
        auth().onAuthStateChanged((e) => {
            if (e) {
                database().ref('/').child(`Personal information/${e.uid}/`).once('value').then((data) => {
                    arr.push(data.val())
                    var js = JSON.stringify(arr)
                    var st = JSON.parse(js)
                    setMyData(st)
                })
            }
        })
        return () => setDidMount(false);
    }, [])

    if(!didMount) {
        return null;
      }
    console.log('mydata====>', myData )
    return (

        <Container>
            <Content padder style={{ backgroundColor: 'whitesmoke' }}>
                {myData.map((v) => {
                    return (<View key={v.uid} >
                        <View style={styles.userDetail} >
                            <Thumbnail source={userIcon} style={styles.Thumbnail} />
                            <Text style={styles.userName}>{v.displayName} </Text>
                            <Text style={styles.age}>{v.age} year age</Text>
                            <Text style={styles.organ}>Organ donor</Text>
                        </View>
                        <Card transparent>
                            <CardItem style={styles.userDetail}>
                                <Left>

                                    <Body>
                                        <Text style={styles.Cardtext}>BMI</Text>
                                        <Text >{v.medical_info.BMI}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Body>
                                        <Text style={styles.Cardtext}>Blood Group</Text>
                                        <Text >{v.medical_info.bloodGroup}</Text>
                                    </Body>

                                </Right>
                            </CardItem>
                        </Card>

                        <Card transparent>
                            <CardItem style={styles.userDetail}>
                                <Left>

                                    <Body>
                                        <Text style={styles.Cardtext}>Contact No</Text>
                                        <Text >{v.phoneNumber}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Body>
                                        <Text style={styles.Cardtext} >City</Text>
                                        <Text >{v.city}</Text>
                                    </Body>

                                </Right>
                            </CardItem>
                        </Card>
                        <Card transparent>
                            <CardItem style={styles.userDetail}>
                                <Left>
                                    <Text style={styles.Cardtext}>Email</Text>
                                    <Text>{v.email}</Text>
                                </Left>
                            </CardItem>
                        </Card>

                        <Card transparent>
                            <CardItem style={styles.userDetail}>
                                <Left>
                                    <Text style={styles.Cardtext}>Medical </Text>
                                    <Text>{v.medical_info.medical}</Text>
                                </Left>
                            </CardItem>
                        </Card>
                    </View>
                    )
                })
                }
                <Button disabled={double} style={styles.Button} block danger onPress={signOut}>
                    <Text style={styles.Button_text}>Sign Out </Text>
                </Button>
            </Content>
        </Container>

    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})


export default connect(mapStateToProps, null)(Profile)
const styles = StyleSheet.create({
    userDetail: {
        backgroundColor: 'white',
        width: "100%",
        borderRadius: 30,
        borderLeftWidth: 6,
        borderLeftColor: 'green',
        borderRightWidth: 6,
        borderRightColor: 'green',
        borderTopWidth: 3,
        borderTopColor: 'red',
        elevation: 2
    },
    Thumbnail: {
        alignSelf: 'center',
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginTop: 20
    },
    userName: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        color: '#424242'
    },
 
    age: {
        textAlign: 'center',
        color: '#757575',
        fontSize: 20,
    },
    organ: {
        textAlign: 'center',
        fontSize: 20,
        color: '#757575',
        fontWeight: 'bold',
        marginBottom: 10
    },
    Cardtext: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 19
    },
    medical: {
        width: '85%',
        alignSelf: 'center',
        marginTop: 20,
        height: 150
    },
    Button: {
        width: '70%',
        alignSelf: "center",
        backgroundColor: 'red',
        elevation: 4,
        margin: 35
    },
    Button_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
})
