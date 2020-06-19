/**
 * 
 * 定位设备 弹窗组
 */
import React , {Fragment} from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals'; 
import Spinner from 'react-native-spinkit';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class LocationDeviceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        //locationModalStep 状态码： 0 未开启， 1 请确认定位， 2 查找中， 3 成功, 4失败
        const {locationModalStep, toggleLocationModal, confirmLoaction} = this.props;
        // <StatusBar
        //     hidden={true}
        // />

        return (
            <Fragment>               
                <Modal
                    width={0.8} actionsBordered  
                    visible={locationModalStep === 1 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleLocationModal(0, 'cancel')}
                                />
                                <ModalButton
                                    text="Confirm"
                                    textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                                    onPress={confirmLoaction}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Image 
                                source={require('../../static/images/icon/device/locating_device.png')} 
                                style={{width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100}}
                            />
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>Locating the device?</Text>
                        </View>
                    </ModalContent>
                </Modal>
                {/* ==================================== */}
                <Modal
                    width={0.8} actionsBordered  
                    visible={locationModalStep === 2 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleLocationModal(0, 'cancelByUser')}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <View style={{
                                width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100, backgroundColor: '#60BD6E',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Spinner color="#fff" type={'Circle'} size={unitWidth*60}/> 
                            </View>
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>Locating...</Text>
                        </View>
                    </ModalContent>
                </Modal>
                {/* ==================================== */}
                <Modal
                    width={0.8} actionsBordered  
                    visible={locationModalStep === 4 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleLocationModal(0, 'cancel')}
                                />
                                <ModalButton
                                    text="Reload"
                                    textStyle={{color: '#f00', fontSize: unitSize(16)}}
                                    onPress={()=>toggleLocationModal(1, 'next')}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Image 
                                source={ require('../../static/images/icon/device/locating_device_failed.png')}
                                style={{width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100}}
                            />
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>{'Failed Location'}</Text>
                        </View>
                    </ModalContent>
                </Modal>
            </Fragment>     
        )
    }
}

const styles = StyleSheet.create({  
    content: {
        width: '100%',
        height: unitHeight*180,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const propTypes = {
    locationModalStep: PropTypes.number,
    toggleLocationModal: PropTypes.func,
    confirmLoaction: PropTypes.func
};
LocationDeviceModal.propTypes = propTypes;
