/**
 * 
 * 查找设备 弹窗组
 */
import React , {Fragment} from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals'; 
import Spinner from 'react-native-spinkit';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class SearchDeviceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        //searchModalStep 状态码： 0 未开启， 1 请确认查找， 2 查找中， 3，成功， 4 失败
        const {searchModalStep, toggleSearchModal, confirmSearch} = this.props;
        // <StatusBar
        //     hidden={true}
        // />

        return (
            <Fragment>               
                <Modal
                    width={0.8} actionsBordered  
                    visible={searchModalStep === 1 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleSearchModal(0, 'cancel')}
                                />
                                <ModalButton
                                    text="Confirm"
                                    textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                                    onPress={confirmSearch}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Image 
                                source={require('../../static/images/icon/device/look_for_device.png')}
                                style={{width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100}}
                            />
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>Sure to look for the device?</Text>
                        </View>
                    </ModalContent>
                </Modal>
                {/* ==================================== */}
                <Modal
                    width={0.8} actionsBordered  
                    visible={searchModalStep === 2 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Cancel"
                                    textStyle={{color: '#999', fontSize: unitSize(16)}}
                                    onPress={()=>toggleSearchModal(0, 'cancelByUser')}
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
                            }}>Searching...</Text>
                        </View>
                    </ModalContent>
                </Modal>
                {/* ==================================== */}
                <Modal
                    width={0.8} actionsBordered  
                    visible={searchModalStep === 3 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Confirm"
                                    textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                                    onPress={()=>toggleSearchModal(0, 'cancel')}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Image 
                                source={require('../../static/images/icon/device/successful.png')}
                                style={{width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100}}
                            />
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>{'Successful Search'}</Text>
                        </View>
                    </ModalContent>
                </Modal>
                {/* ==================================== */}
                <Modal
                    width={0.8} actionsBordered  
                    visible={searchModalStep === 4 ? true:false}  
                    footer={<ModalFooter>
                                <ModalButton
                                    text="Confirm"
                                    textStyle={{color: '#60BD6E', fontSize: unitSize(16)}}
                                    onPress={()=>toggleSearchModal(0, 'cancel')}
                                />
                            </ModalFooter>
                    }
                >                    
                    <ModalContent>
                        <View style={styles.content}>
                            <Image 
                                source={ require('../../static/images/icon/device/failed.png')}
                                style={{width: unitHeight*100, height: unitHeight*100, borderRadius: unitHeight*100}}
                            />
                            <Text style={{
                                fontSize: unitSize(18), marginTop: unitHeight*12
                            }}>{'Failed Search'}</Text>
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
    searchModalStep: PropTypes.number,
    toggleSearchModal: PropTypes.func,
    confirmSearch: PropTypes.func
};
SearchDeviceModal.propTypes = propTypes;
