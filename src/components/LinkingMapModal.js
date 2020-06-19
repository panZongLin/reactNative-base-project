/**
 * 
 * 地图跳转导航弹窗
 */
import React from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Linking } from 'react-native';
import Modal, { ModalContent } from 'react-native-modals'; 
import Geolocation from 'react-native-geolocation-service';

import MapLinking from '../../components/dialogs/MapLinkingDialog';
import {unitWidth, unitHeight, unitSize, isIphoneXAndUp} from '../../misc/Adapt';
import misc from '../../misc/misc';


const LATITUDE_DELTA =  0.0622;
const LONGITUDE_DELTA = 0.0422;

@autobind
export default class LinkingMapModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {},
            watchId: ''
        }
    }

    componentDidMount() {
        let thisWatchId2 = Geolocation.watchPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };
                this.setState({region})
            },
            (error) => {},
            {enableHighAccuracy: true, distanceFilter: 50, interval: 10000}
        )
        this.setState({watchId: thisWatchId2}); 
    } 

    componentWillUnmount() {
        Geolocation.clearWatch(this.state.watchId);
    }

    googleMapLinking() {
        const {devicePos, navWay} = this.props;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${this.state.region.latitude},${this.state.region.longitude}&destination=${devicePos.geometry.location.lat},${devicePos.geometry.location.lng}&travelmode=${navWay === 'drive' ? 'driving' : (navWay === 'bus' ? 'transit' : 'walking')}`
        Linking.canOpenURL(url)
        .then((results)=> {
            if(results) {
                Linking.openURL(url);
            }else{
                misc.showShortToast("You don't have google maps yet.");
                //Linking.openURL('https://www.google.com/maps/@37.0625,-95.677068,4z');
            }
        })
        
    }
    mapLinking() {
        const {devicePos, navWay} = this.props;

        MapLinking.planRoute(
            {lat: this.state.region.latitude, lng: this.state.region.longitude, title: 'Curernt Location'}, 
            {lat: devicePos.geometry.location.lat, lng: devicePos.geometry.location.lng, title: devicePos.shortName}, 
            navWay
        );

    }


    render() {
  
        return (
            <Modal.BottomModal
                width={0.8} //莫得作用
                actionsBordered  
                visible={this.props.linkingModalVisible}  
                onTouchOutside={()=>this.props.toggleLinkingModal(false)}  
            > 
                <ModalContent style={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0}}>  
                    {/* <StatusBar
                        hidden={true}
                    /> */}
                    <View style={styles.tabWrap}>
                        <Text style={{
                            fontSize: unitSize(15), color: '#999'
                        }}>Please select the navigation mode</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={this.mapLinking}>
                        <View style={{...styles.tabWrap, height: unitHeight*50}}>
                            <Text style={{
                                fontSize: unitSize(15), color: '#000'
                            }}>Use the phone's own map navigation</Text>
                        </View>
                    </TouchableOpacity>  
                    <TouchableOpacity activeOpacity={1} onPress={this.googleMapLinking}>
                        <View style={{...styles.tabWrap, height: unitHeight*50}}>
                            <Text style={{
                                fontSize: unitSize(15), color: '#000'
                            }}>Use the Google map navigation</Text>
                        </View>
                    </TouchableOpacity>                                   
                    <TouchableOpacity activeOpacity={1} onPress={()=> this.props.toggleLinkingModal(false)}>
                        <View style={{
                            marginBottom: isIphoneXAndUp() ? unitHeight*23 : 0,
                            ...styles.tabWrap, height: unitHeight*48, borderBottomWidth: unitHeight*0
                            }}>
                            <Text style={{
                                fontSize: unitSize(15), color: '#60BD6E'
                            }}>Cancel</Text>
                        </View>
                    </TouchableOpacity>                    
                </ModalContent>
            </Modal.BottomModal>     
        )
    }
}

const styles = StyleSheet.create({  
    tabWrap: {
        height: unitHeight*55,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: unitHeight*1,
        borderBottomColor: '#ccc',
        //backgroundColor: '#ccc'
    }
})

const propTypes = {
    linkingModalVisible: PropTypes.bool,
    toggleLinkingModal: PropTypes.func
};
LinkingMapModal.propTypes = propTypes;
