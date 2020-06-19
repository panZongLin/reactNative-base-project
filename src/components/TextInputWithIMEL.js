/**
 * 
 * IMEL 输入框
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, StyleSheet, TextInput} from 'react-native';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class TextInputWithIMEL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static defaultProps = {
        keyboardType: 'default',                //键盘类型
        placeholder: 'default',                 //提示文字                                 
        value: '',                              //值
        onChangeText: ()=>{},                   //回调
        onBlur: ()=> {},                        //确认
        autoFocus: false,                       //自动获取焦点   
        keyboardAppearance: 'default',          //键盘背景色
        max: 20,                                //最大
    }


    render() {
        const {keyboardType, placeholder, value, onChangeText, onBlur, autoFocus, keyboardAppearance, max} = this.props;
        const styles = StyleSheet.create({
            inputWrap: {
                position: 'relative'
            },
            textinput: {
                marginLeft: unitWidth*28,
                marginRight: unitWidth*28,
                marginBottom: unitHeight*22,
                height: unitHeight*44,
                backgroundColor: '#a7a7a7',
                borderRadius: unitWidth*30,
                fontSize: unitSize(18),
                color: '#fff',
                letterSpacing: unitWidth*4,
                textAlign: 'center'
            },

        })
        return (             
            <View style={styles.inputWrap}>
                <TextInput
                    ref={ele=> this._input = ele}
                    style={styles.textinput}
                    keyboardType={keyboardType}              
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(text)=>onChangeText(text)}
                    onBlur={onBlur}
                    autoFocus={autoFocus}
                    keyboardAppearance={keyboardAppearance}
                    maxLength={max}
                    placeholderTextColor={'#fff'}
                    clearTextOnFocus={true}
                />
            </View>
        )
    }
}

const propTypes = {
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    regexp: PropTypes.string,
    max: PropTypes.number,
    autoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string
};
TextInputWithIMEL.propTypes = propTypes;
