/**
 * 
 * 分享弹窗
 */
import React from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Linking} from 'react-native';
import Modal, { ModalContent } from 'react-native-modals'; 

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class SharingOnModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
 

    shareOnFacebook() {
        // Linking.canOpenURL('facebook://').then((support)=> {
        //     if(!support) {
        //         misc.showShortToast("You haven't installed facebook yet");
        //         return;
        //     }else {
        //         Linking.openURL('facebook://')
        //     }
        // })       
    }
    shareOnTwitter() {
        // Linking.canOpenURL('twitter://').then((support)=> {
        //     if(!support) {
        //         misc.showShortToast("You haven't installed twitter yet");
        //         return;
        //     }else {
        //         Linking.openURL('twitter://')
        //     }
        // })  
    }
    shareOnInstagram() {
        // Linking.canOpenURL('instagram://').then((support)=> {
        //     if(!support) {
        //         misc.showShortToast("You haven't installed instagram yet");
        //         return;
        //     }else {
        //         Linking.openURL('instagram://')
        //     }
        // })
    }

    render() {

        return (
            <Modal.BottomModal
                width={1} 
                height={0.3}
                actionsBordered  
                visible={this.props.sharingModalVisible}  
                onTouchOutside={()=>this.props.toggleSharingModal(false)}  
            > 
                <ModalContent style={{flex: 1, alignItems: 'center', backgroundColor: 'fff'}}>
                    {/* <StatusBar
                        hidden={true}
                    /> */}
                    <Text style={{fontSize: unitSize(16), marginTop: unitHeight*15}}>share on</Text>
                    <View style={styles.line}></View>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}> 
                        <TouchableOpacity activeOpacity={1} onPress={this.shareOnFacebook}>
                            <View style={{alignItems: 'center'}}>
                                <Image 
                                    style={{width: unitHeight*50, height: unitHeight*50}}
                                    source={require('../../static/images/three/fbtwo.png')}
                                />
                                <Text style={{fontSize: unitSize(12)}}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={this.shareOnTwitter}>
                            <View style={{alignItems: 'center'}}>
                                <Image 
                                    style={{width: unitHeight*50, height: unitHeight*50}}
                                    source={require('../../static/images/three/twtwo.png')}
                                />
                                <Text style={{fontSize: unitSize(12)}}>Twitter</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={this.shareOnInstagram}>
                            <View style={{alignItems: 'center'}}>
                                <Image 
                                    style={{width: unitHeight*50, height: unitHeight*50}}
                                    source={require('../../static/images/three/igtwo.png')}
                                />
                                <Text style={{fontSize: unitSize(12)}}>Instagram</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ModalContent>
            </Modal.BottomModal>     
        )
    }
}

const styles = StyleSheet.create({  
    line: {
        width: '90%',
        height: unitHeight*1,
        backgroundColor: '#ABAAAB',
        marginTop: unitHeight*15,
        marginBottom: unitHeight*30
    }
})

const propTypes = {
    sharingModalVisible: PropTypes.bool,
    toggleSharingModal: PropTypes.func
};
SharingOnModal.propTypes = propTypes;
