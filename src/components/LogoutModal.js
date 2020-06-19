/**
 * 
 * 退出确认弹窗，可用于退出登录确认 和其他操作需要确认的时候
 */
import React from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, StyleSheet, StatusBar} from 'react-native';
import Modal, { ModalFooter, ModalButton } from 'react-native-modals'; 

import {unitWidth, unitHeight, unitSize, isIphoneXAndUp} from '../../misc/Adapt';


@autobind
export default class LogoutModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {

        return (
            <Modal.BottomModal
                width={1} 
                //height={0.1}
                actionsBordered  
                visible={this.props.logoutModalVisible}  
                onTouchOutside={()=>this.props.toggleLogoutModal(false)}  
                footer={
                    <ModalFooter>
                        <ModalButton
                            text="Cancel"
                            textStyle={{color: '#999', fontSize: unitSize(16)}}
                            onPress={()=>this.props.toggleLogoutModal(false)}
                        />
                        <ModalButton
                            text="Confirm"
                            textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                            onPress={()=>this.props.confirmLogout()}
                        />
                    </ModalFooter>
                }
                modalStyle={{paddingBottom: isIphoneXAndUp() ? unitHeight*23 : 0}}
            >      
                {/* <StatusBar
                    hidden={true}
                /> */}
                <View></View>
            </Modal.BottomModal>     
        )
    }
}

const styles = StyleSheet.create({  
    
})

const propTypes = {
    logoutModalVisible: PropTypes.bool,
    toggleLogoutModal: PropTypes.func,
    confirmLogout: PropTypes.func
};
LogoutModal.propTypes = propTypes;
