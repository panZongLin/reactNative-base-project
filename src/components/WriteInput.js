/**
 * 
 * 正常输入框，带笔尖图标
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class WriteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warnVisible: false
        }
    }

    static defaultProps = {
        keyboardType: 'default',                //键盘类型
        placeholder: 'default',                 //提示文字                                 
        imageType: 'write',                      //左侧icon
        value: '',                              //值
        onChangeText: ()=>{},                   //回调
        sendMessage: ()=>{}
    }

    componentDidMount() {
        this.props.getRefs(this._input);
    }

    render() {
        const {keyboardType, placeholder, imageType, value, onChangeText, sendMessage} = this.props;
        const styles = StyleSheet.create({
            inputWrap: {
                position: 'relative'
            },
            textinput: {
                marginBottom: unitHeight*28,
                height: unitHeight*44,
                backgroundColor: '#fff', 
                borderRadius: unitWidth*30,
                paddingLeft: unitWidth*48,
                paddingRight: unitWidth*74,
                paddingBottom: unitHeight*0,
                fontSize: unitSize(14),              
            },
            userIcon: {
                position: 'absolute',
                width: unitWidth*20,
                height: unitHeight*20,
                left: unitWidth*20,
                top: unitHeight*14,
                zIndex: 100
            },
            sendBtn: {
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                width: unitWidth*70,
                height: unitHeight*30,
                borderRadius: 30,
                backgroundColor: '#60BD6E',
                right: unitWidth*0,
                top: unitHeight*10, 
                zIndex: 100,
                marginRight: unitWidth*6
            }
        })
        return (             
            <View style={styles.inputWrap}>
                <Image 
                    style={styles.userIcon}
                    source={imageType ==='write' ?
                            require('../../static/images/icon/group/write.png')
                        :
                            require('../../static/images/icon/group/write.png')
                    } 
                />
                <TextInput
                    ref={(node)=> this._input = node}
                    style={styles.textinput}
                    keyboardType={keyboardType}               
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(text)=>onChangeText(text)}
                    onBlur={()=> {this.setState({warnVisible: false})}} 
                    multiline={true}
                />     
                {value==='' ? 
                    <View style={{...styles.sendBtn, backgroundColor: '#ccc'}}>
                            <Text style={{fontSize: unitSize(16), color: '#fff'}}>Send</Text>
                    </View>
                : 
                    <View style={styles.sendBtn}>
                        <TouchableOpacity activeOpacity={1} onPress={sendMessage}>
                            <Text style={{fontSize: unitSize(16), color: '#fff'}}>Send</Text>
                        </TouchableOpacity>
                    </View> 
                }                                       
            </View>
        )
    }
}

const propTypes = {
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    imageType: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    sendMessage: PropTypes.func
};
WriteInput.propTypes = propTypes;
