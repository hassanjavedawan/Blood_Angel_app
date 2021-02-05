import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Badge, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
var icon = require('../images/icon.png');

const DonorList = (props) => {
    const user = props.personal_info;
    return (
        <Container>
            <Content style={{ backgroundColor: 'whitesmoke', }}>
                {user.map((v) => {
                    return (<View style={styles.Card} key={v.uid} >
                        <Card transparent >
                            <CardItem style={styles.CardItem1}>
                                <Left>
                                    <Thumbnail source={icon} />
                                    <Body>
                                        <Text style={{ fontWeight: 'bold' }}>{v.displayName} </Text>
                                        <Badge success style={styles.donor}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{v.medical_info.bloodGroup}</Text>
                                        </Badge>
                                        <Text note >Donor</Text>
                                    </Body>
                                </Left>
                            </CardItem>

                            <CardItem style={styles.CardItem}>
                                <Left>
                                    <Body>
                                        <Text style={{ color: 'red', fontWeight: 'bold' }}>City:</Text>
                                        <Text>{v.city}</Text>
                                    </Body>

                                </Left>
                                <Body>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>BMI:</Text>
                                    <Text>{v.medical_info.BMI}</Text>
                                </Body>
                                <Right>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Contact#</Text>
                                    <Text>{v.phoneNumber}</Text>
                                </Right>

                            </CardItem>
                            <CardItem style={styles.CardItem2}>
                                <Left>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Medical Record:</Text>
                                </Left>
                                <Body>
                                    <Text>{v.medical_info.medical}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>

                    )
                })
                }
            </Content>
        </Container >
    )
}
const styles = StyleSheet.create({
    Card: {
        // flex: 0,
        width: "95%",
        alignSelf: 'center',
        marginTop: 10,
        overflow: 'hidden',
        elevation: 5,
        borderRadius: 40

    },
    donor: {
        position: "absolute",
        right: 0,
        top: 5,
        fontSize: 15,
        color: 'green',

    },
    CardItem: {
        borderLeftWidth: 6,
        borderLeftColor: 'red',
        borderRightWidth: 6,
        borderRightColor: 'red',
    }
    , CardItem1: {

        borderLeftWidth: 6,
        borderLeftColor: 'red',
        borderTopLeftRadius: 40,
        overflow: 'hidden',
        borderTopRightRadius: 40,
        borderRightWidth: 6,
        borderRightColor: 'red',
    },
    CardItem2: {
        borderRightWidth: 6,
        borderRightColor: 'red',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderLeftWidth: 6,
        borderLeftColor: 'red',
    }

})
const mapStateToProps = (state) => ({
    personal_info: state.personal_info
})

export default connect(mapStateToProps, null)(DonorList)
