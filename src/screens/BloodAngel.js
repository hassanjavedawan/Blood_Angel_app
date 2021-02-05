import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, StatusBar, } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import DonorList from './DonorList';
import { getPersonalInfo } from "../store/action";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
const Tab = createMaterialTopTabNavigator();

const BloodAngel = (props) => {
    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='red' />
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: 'white',
                    showLabel: false,
                    showIcon: true,
                    style: { backgroundColor: 'red', },
                    indicatorStyle: { backgroundColor: 'white', height: '8%' },
                }}>
                <Tab.Screen name="Home"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} style={{ fontSize: 30 }} />),
                    }}
                    component={HomeScreen} />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="tint" style={{ fontSize: 30 }} color={color} />),
                    }}
                    name="Settings" component={DonorList} />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user-circle" style={{ fontSize: 25 }} color={color} />),
                    }}
                    name="profile" component={Profile} />
            </Tab.Navigator>
        </>
    )
}

const mapStateToProps = (state) => ({
    personal_info: state.personal_info
})

const mapDispatchToProps = (dispatch) => {
    return {

        getPersonalInfo: () => dispatch(getPersonalInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BloodAngel);

const styles = StyleSheet.create({
})