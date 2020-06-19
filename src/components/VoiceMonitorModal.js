/**
 * 
 * 拨打设备电话弹窗
 */
import React , {Fragment} from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals'; 

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class VoiceMonitorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {voiceMonitorModalVisible, toggleVoiceMonitorModal, confirmVoiceMonitor} = this.props;
        // <StatusBar
        //     hidden={true}
        // />

        return (
            <Fragment>               
                <Modal
                    width={0.8} actionsBordered  visible={voiceMonitorModalVisible}  
                    onTouchOutside={()=>toggleVoiceMonitorModal(false)}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleVoiceMonitorModal(false)}
                                />
                                <ModalButton
                                    text="Confirm"
                                    textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                                    onPress={()=>confirmVoiceMonitor()}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Image 
                                source={require('../../static/images/icon/device/monitor.png')}
                                style={{width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100}}
                            />
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>Are you sure to monitor?</Text>
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
    voiceMonitorModalVisible: PropTypes.bool,
    toggleVoiceMonitorModal: PropTypes.func,
    confirmVoiceMonitor: PropTypes.func
};
VoiceMonitorModal.propTypes = propTypes;
