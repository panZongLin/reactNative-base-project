/**
 * 
 * 解绑设备弹窗, 删除吃药提醒弹窗 
 */
import React , {Fragment} from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals'; 

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class UnbindModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {title, desc, unbindModalVisible, toggleUnbindModal, confirmUnbind} = this.props;
        // <StatusBar
        //     hidden={true}
        // />

        return (
            <Fragment>               
                <Modal
                    width={0.7} actionsBordered  visible={unbindModalVisible}  
                    onTouchOutside={()=>toggleUnbindModal(false)}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleUnbindModal(false)}
                                />
                                <ModalButton
                                    text="Confirm"
                                    textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                                    onPress={()=>confirmUnbind()}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Text style={{fontSize: unitSize(20)}}>{title}</Text>
                            <Text style={{fontSize: unitSize(14), color: '#999', marginTop: unitHeight*12}}>{desc}</Text>
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
        height: unitHeight*70,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const propTypes = {
    unbindModalVisible: PropTypes.bool,
    toggleUnbindModal: PropTypes.func,
    confirmUnbind: PropTypes.func
};
UnbindModal.propTypes = propTypes;
