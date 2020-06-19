/**
 * 
 * 带检查的输入框，用于输入手机号，密码等
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CountryPicker from 'react-native-country-picker-modal';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';

@autobind
export default class TextInputWithSomeCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cca2: 'CN',
            warnVisible: false
        }
    }

    static defaultProps = {
        keyboardType: 'default',                //键盘类型
        placeholder: 'default',                 //提示文字                                 
        imageType: 'user',                      //左侧icon
        value: '',                              //值
        onChangeText: ()=>{},                   //回调
        maxLength: 20,
        checkFn: ()=>{},                        //简单校验
        warnMsg: 'this is a warning message',    //警告提示
        exectTIStyle: {},
        secureTextEntry: false,                   //密码遮挡,
        saveCountryCode: ()=> {}
    }


    checkBeforeChangeText(text) {
        const {checkFn, onChangeText} = this.props;
        let pass = checkFn(text);

        if(pass) {
            this.setState({warnVisible: false})
        }else {
            this.setState({warnVisible: true})
        }
        onChangeText(text);
    }

    selectCountry(country) { 
        this.setState({ cca2: country.cca2 });
        this.props.saveCountryCode(`+${country.callingCode[0]}`)
    }

    render() {
        const {keyboardType, placeholder, imageType, value, maxLength, warnMsg, exectTIStyle, secureTextEntry} = this.props;
        const styles = StyleSheet.create({
            inputWrap: {
                position: 'relative',
                alignItems: 'center'
            },
            cardSty: {
                width: unitWidth*318,
                height: unitHeight*44, 
                borderRadius: unitWidth*30,
                marginBottom: unitHeight*28,
            },
            textinput: {
                height: unitHeight*44,
                backgroundColor: '#fff',
                borderRadius: unitWidth*30,
                paddingLeft: unitWidth*48,
                fontSize: unitSize(14),
                ...exectTIStyle
            },
            userIcon: {
                position: 'absolute',
                width: unitWidth*20,
                height: unitHeight*20,
                left: unitWidth*15,
                top: unitHeight*12,
                zIndex: 100
            },
            warnWrap: {
                position: 'absolute',
                left: unitWidth*18,
                top: unitHeight*46,
                zIndex: 100,
                flexDirection: 'row'
            },
            warnMsgSty: {
                fontSize: unitSize(12), 
                color: '#f00',
                zIndex: 100,
                paddingLeft: unitWidth*15
            }
        })
        return (             
            <View style={styles.inputWrap}>
                <Card style={styles.cardSty}>
                    {imageType==='user' ?
                        <View style={{...styles.userIcon, width: unitWidth*25, height: unitHeight*25,left: unitWidth*10, top: unitHeight*8}}>
                            <CountryPicker                         
                                countryCode={this.state.cca2}
                                onSelect={value => this.selectCountry(value)}
                                translation="eng"
                                withAlphaFilter={true}
                                withCallingCode={true}
                            >
                                <View />
                            </CountryPicker>
                        </View>                    
                    :
                        <Image 
                            style={styles.userIcon}
                            source={imageType ==='password' ?
                                    require('../../static/images/icon/password/password.png')
                                :
                                    imageType ==='write'? require('../../static/images/icon/group/write.png')
                                :
                                    require('../../static/images/icon/user/user.png')
                            } 
                        />
                    }                
                    <TextInput
                        ref={(ele)=> this._input = ele}
                        style={styles.textinput}
                        keyboardType={keyboardType}              
                        placeholder={placeholder}
                        value={value}
                        maxLength={maxLength}
                        onChangeText={(text)=>this.checkBeforeChangeText(text)}
                        //onBlur={()=> {this.setState({warnVisible: false})}}
                        secureTextEntry={secureTextEntry}
                    />
                    {this.state.warnVisible ?  
                        <View style={styles.warnWrap}>
                            <AntDesignIcon 
                                name={'infocirlceo'} 
                                size={unitWidth*14} 
                                color={'#f00'} 
                                style={{marginTop: unitHeight*2}} />
                            <Text style={styles.warnMsgSty}>{warnMsg}</Text>
                        </View>                       
                    : 
                        null
                    }
                </Card>               
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
    maxLength: PropTypes.number,
    checkFn: PropTypes.func,
    warnMsg: PropTypes.string,
    exectTIStyle: PropTypes.object,
    secureTextEntry: PropTypes.bool,
    saveCountryCode: PropTypes.func
};
TextInputWithSomeCheck.propTypes = propTypes;
