import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Image, StatusBar, Share, } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';


var bloodMatch = require('../images/bloodMatch.jpg');
var bloodType = require('../images/bloodType.png');
var icon = require('../images/icon.png');
var shareIcon = require('../images/ShareIcon.png');

import { getPersonalInfo } from "../store/action";



const HomeScreen = (props) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "Invite your friend and save life"
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        setDidMount(true);
        props.getPersonalInfo();
        return () => setDidMount(false);
    }, [])
    if (!didMount) {
        return null;
    }
    const user = auth().currentUser;

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='red' />
            <Container>
                <Content style={{ backgroundColor: 'whitesmoke' }}>
                    <Card style={styles.Card} >
                        <CardItem>
                            <Left>
                                <Thumbnail source={icon} />
                                <Body>
                                    <Text style={{ fontWeight: "bold" }}>{user.email} </Text>
                                    <Text note>Donor</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Left>
                                <Icon style={styles.Icon} name='heart' />
                                <Body>
                                    <Text style={{ fontSize: 15 }}>Lives Saved</Text>
                                </Body>
                            </Left>
                            <Body>

                            </Body>
                            <Right >
                                <Body style={{ flexDirection: 'row', }}>
                                    <Icon style={{ fontSize: 25, color: 'red', paddingRight: 10 }} name='share-alt' />
                                    <Text style={{ fontSize: 15 }}>Share</Text>
                                </Body>
                            </Right>

                        </CardItem>
                    </Card>


                    <Card style={styles.Card}>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}>Blood groups</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#424242' }}>There are 4 main blood groups (types of blood) – A, B, AB and O. Your blood group is determined by the genes you inherit from your parents.</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image source={bloodType} style={{ height: 180, width: '100%', resizeMode: 'contain' }} />
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Blood Types:</Text>
                                <Text style={{ paddingTop: 5, textAlign: 'justify', color: '#424242' }}>Although all blood is made of the same basic elements, not all blood is alike. Infact, there are
                                eight different common blood types, which are determined by the presence or absence of certain
                                antigens–substances that can trigger an immune response if they are foreign to the body. Since
                                some antigens can trigger patient’s immune system to attack the transfused blood, safe blood
                                transfusions depend on careful blood typing and cross-matching. There are four major blood
                            groups determined by the presence or absence of two antigens–A and B–on the surface of redblood cells:</Text>
                                <Image source={bloodMatch} style={{ height: 310, width: '100%', marginTop: 10, resizeMode: 'contain' }} />

                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.GroupText}>Group A <Text>– has only the A antigen on red cells (and B antibody in the plasma)</Text></Text>
                                <Text style={styles.GroupText}>Group B  <Text>– has only the B antigen on red cells (and A antibody in the plasma)</Text></Text>
                                <Text style={styles.GroupText}>Group AB <Text>– has both A and B antigens on red cells (but neither A nor B antibody in the plasma)</Text></Text>
                                <Text style={styles.GroupText}>Group O <Text>– has neither A nor B antigens on red cells (but both A and B antibody are in the plasma)</Text></Text>


                            </Body>
                        </CardItem>
                    </Card>


                    <Card style={{ flex: 0, elevation: 10, width: "96%", alignSelf: 'center', margin: 10 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={shareIcon} />
                                <Body>
                                    <Text>Invite Friend</Text>

                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Body>
                                <Text style={{ paddingLeft: 30, paddingRight: 30, fontSize: 15, color: '#757575' }}>Inviting people can bring a change someone your friend and family would be able to help</Text>
                            </Body>
                        </CardItem>
                        <CardItem>

                            <Right>
                                <TouchableOpacity onPress={onShare} ><Text style={{ color: 'blue', fontWeight: 'bold' }}>Invite  <Icon name='share' /></Text></TouchableOpacity>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        </>
    )
}
const mapStateToProps = (state) => ({
    personal_info: state.personal_info,

})

const mapDispatchToProps = (dispatch) => {
    return {
        getPersonalInfo: () => dispatch(getPersonalInfo()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
const styles = StyleSheet.create({
    Card: {
        flex: 0,
        elevation: 10,
        width: "96%",
        alignSelf: 'center',
    },
    Icon: {
        fontSize: 25,
        color: 'red',
        paddingLeft: 10
    },
    GroupText: {
        paddingTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    }
})
