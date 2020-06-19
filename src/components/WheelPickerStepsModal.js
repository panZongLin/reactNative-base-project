/**
 * 
 * 齿轮数值选择组件
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {autobind} from 'core-decorators';
import {
    View, Text, StyleSheet, Animated, StatusBar, 
    Dimensions, TouchableOpacity, default as Easing, 
} from 'react-native';

import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import {unitWidth, unitHeight, unitSize, isIphoneXAndUp} from '../../misc/Adapt';
const { width, height } = Dimensions.get('window');

@autobind
export default class WheelPickerStepsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem : this.props.opations.selectedItem,
            itemList: this.props.opations.itemList,

            contentBottom: new Animated.Value(unitHeight*-250) 
        }
    }
    static navigationOptions = {
        header: null
    };

    static defaultProps = {
        pickerModalVisible: false,
        togglePickerModal: ()=>{},
        confirmPicker: ()=>{},
        opations: {
            selectedItem: 1,
            itemList: [1,2,3]
        }
    }

    componentDidMount() {} 

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.pickerModalVisible===true && this.props.pickerModalVisible ==false) {
            this.startAnimation()
        }
    }

    onPickerSelect (index) {
        this.setState({
            selectedItem: index,
        })
    }

    startAnimation ()  {
        //this.state.contentBottom.setValue(unitHeight*-250);
        Animated.sequence([
            Animated.timing(
                this.state.contentBottom,
                {
                    toValue: unitHeight*0,
                    duration: 500,
                    easing: Easing.linear
                }
            )
        ]).start() 

    };


    render() {
        const styles = StyleSheet.create({  
            content: {
                width: '100%',
                height: unitHeight*250,
                position: 'absolute',
                left: 0,             
                backgroundColor: '#fff',
                borderTopLeftRadius: unitHeight*5,
                borderTopRightRadius: unitHeight*5
            },
            leftV: {
                width: width/2,
                height: unitHeight*50,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: unitHeight*1,
                borderTopColor: '#ccc',
                borderRightWidth: unitHeight*1,
                borderRightColor: '#ccc'
            }
        })

        return (
            <Fragment>
                {this.props.pickerModalVisible &&
                    <View style={{...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <Animated.View style={[styles.content, {bottom: this.state.contentBottom}]}>
                            <Picker style={{width: '100%', height: unitHeight*200}}
                                selectedValue={this.state.selectedItem}
                                itemStyle={{color:"#60BD6E", fontSize: unitSize(24)}}
                                onValueChange={(index) => this.onPickerSelect(index)}
                            >
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"money"+value}/>
                                    ))}
                            </Picker>
                            <View style={{flexDirection: 'row', width: '100%', height: unitHeight*50}}>
                                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.togglePickerModal(false)}>
                                    <View style={styles.leftV}>
                                        <Text style={{color: '#999', fontSize: unitSize(16)}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>  
                                <TouchableOpacity 
                                    activeOpacity={1} 
                                    onPress={()=>this.props.confirmPicker(this.state.itemList[this.state.selectedItem])}
                                >
                                    <View style={{...styles.leftV, borderRightWidth: 0}}>
                                        <Text style={{color: '#60BD6E', fontSize: unitSize(16)}}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>                       
                            </View>
                        </Animated.View>
                    </View> 
                }
            </Fragment>          
        )
    }
}


const propTypes = {
    pickerModalVisible: PropTypes.bool,
    togglePickerModal: PropTypes.func,
    confirmPicker: PropTypes.func,
    opations: PropTypes.object
};
WheelPickerStepsModal.propTypes = propTypes;
