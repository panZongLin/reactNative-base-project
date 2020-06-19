/**
 * 
 * 齿轮日期选择组件
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import range from 'lodash.range';
import {autobind} from 'core-decorators';
import {
    View, Text, StyleSheet, Animated, StatusBar, 
    Dimensions, Platform, TouchableOpacity, default as Easing, 
} from 'react-native';

import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import {unitWidth, unitHeight, unitSize, isIphoneXAndUp} from '../../misc/Adapt';
const { width, height } = Dimensions.get('window');

@autobind
export default class WheelPickerBirthdayModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonthItem : this.props.opations[0].selectedItem,
            itemMonthList: this.props.opations[0].itemList,

            selectedDayItem : this.props.opations[1].selectedItem,
            itemDayList: this.props.opations[1].itemList,

            selectedYearItem : this.props.opations[2].selectedItem,
            itemYearList: this.props.opations[2].itemList,

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
        opations: [
            {
                selectedItem: 4,
                itemList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            },
            {
                selectedItem: 20,
                itemList: range(31).map((item)=> `${item}`)
            },
            {
                selectedItem: 99,
                itemList: range(100).map((item)=> {
                    const year = new Date().getFullYear();
                    return `${year-(100-item)+1}`
                })
            }
        ]
    }

    componentDidMount() {} 

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.pickerModalVisible===true && this.props.pickerModalVisible ==false) {
            this.startAnimation()
        }
    }

    onPickerSelect (index, target) {      
        if(target==='month') {
            this.setState({selectedMonthItem: index})
        }else if(target==='day'){
            this.setState({selectedDayItem: index})           
        }else {
            this.setState({selectedYearItem: index})
        }
    }

    handerConfirmPicker() {
        const {selectedMonthItem, itemMonthList, selectedDayItem, itemDayList, selectedYearItem, itemYearList} = this.state;
        let month = itemMonthList[selectedMonthItem];
        let day = itemDayList[selectedDayItem];
        let year = itemYearList[selectedYearItem];

        this.props.confirmPicker(year, month, day);
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
                borderTopRightRadius: unitHeight*5,               
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
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center'}}>
                                <Picker style={{width: '45%', height: unitHeight*200}}
                                    selectedValue={this.state.selectedMonthItem}
                                    itemStyle={{color:"#3a3a3a", fontSize: Platform.OS==='ios' ? unitSize(24) : unitSize(18)}}
                                    onValueChange={(index) => this.onPickerSelect(index, 'month')}
                                >
                                        {this.state.itemMonthList.map((value, i) => (
                                            <PickerItem label={value} value={i} key={"month"+value}/>
                                        ))}
                                </Picker>
                                <Picker style={{width: '25%', height: unitHeight*200}}
                                    selectedValue={this.state.selectedDayItem}
                                    itemStyle={{color:"#3a3a3a", fontSize: unitSize(24)}}
                                    onValueChange={(index) => this.onPickerSelect(index, 'day')}
                                >
                                        {this.state.itemDayList.map((value, i) => (
                                            <PickerItem label={value} value={i} key={"day"+value}/>
                                        ))}
                                </Picker>
                                <Picker style={{width: '30%', height: unitHeight*200}}
                                    selectedValue={this.state.selectedYearItem}
                                    itemStyle={{color:"#3a3a3a", fontSize: unitSize(24)}}
                                    onValueChange={(index) => this.onPickerSelect(index, 'year')}
                                >
                                        {this.state.itemYearList.map((value, i) => (
                                            <PickerItem label={value} value={i} key={"year"+value}/>
                                        ))}
                                </Picker>
                            </View>                         
                            <View style={{flexDirection: 'row', width: '100%', height: unitHeight*50}}>
                                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.togglePickerModal(false)}>
                                    <View style={styles.leftV}>
                                        <Text style={{color: '#999', fontSize: unitSize(16)}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>  
                                <TouchableOpacity 
                                    activeOpacity={1} 
                                    onPress={this.handerConfirmPicker}
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
    opations: PropTypes.array
};
WheelPickerBirthdayModal.propTypes = propTypes;
