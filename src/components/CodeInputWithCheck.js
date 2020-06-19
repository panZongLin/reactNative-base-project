/**
 * 
 * 验证码输入框组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {Card} from 'react-native-shadow-cards'; 
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';
let laterTimeInterval = null;

@autobind
export default class CodeInputWithSomeCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warnVisible: false,
            time: 60
        }
    }

    static defaultProps = {
        keyboardType: 'default',                //键盘类型
        placeholder: 'default',                 //提示文字                                 
        imageType: 'code',                      //左侧icon
        value: '',                              //值
        maxLength: 10,
        onChangeText: ()=>{},                   //回调
        checkFn: ()=> {},                       //简单校验
        warnMsg: 'this is a warning message',    //警告提示
        sendCode: ()=>{}
    }

    checkBeforeChangeText(text) { 
        const {checkFn, onChangeText} = this.props;
        let pass = checkFn(text);

        if(pass) {
            this.setState({warnVisible: false}) 
        }else {
            this.setState({warnVisible: true})
        }
        onChangeText(text, this._codeInput, pass);
    }

    sendCode() {
        const sended = this.props.sendCode();
        if(sended) {
            clearInterval(laterTimeInterval); 
            laterTimeInterval = setInterval(()=>{
                if(this.state.time ===0) {
                    this.setState({time: 60});
                    clearInterval(laterTimeInterval);
                }else {
                    this.setState({time: this.state.time - 1});
                }
            }, 1000)  
        }           
    }

    render() {
        const {time,  warnVisible} = this.state;
        const {keyboardType, placeholder, imageType, value, maxLength, warnMsg} = this.props;
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
                paddingRight: unitWidth*120,
                fontSize: unitSize(14),
            },
            userIcon: {
                position: 'absolute',
                width: unitWidth*20,
                height: unitHeight*20,
                left: unitWidth*15,
                top: unitHeight*12,
                zIndex: 100
            },
            rightTit: {
                position: 'absolute',
                width: unitWidth*120, 
                height: unitHeight*44,
                right: unitWidth*0,
                top: unitHeight*0,
                zIndex: 100,
                color: '#60BD6E',
                fontSize: unitSize(14),
                textAlign: 'center',
                lineHeight: unitHeight*44,
            },
            verticalLine: {
                width: unitWidth*1,
                height: unitHeight*20,
                backgroundColor: '#60BD6E',
                position: 'absolute',
                right: unitWidth*120, 
                top: unitHeight*12
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
                    <Image 
                        style={styles.userIcon}
                        source={imageType ==='code' ?
                                require('../../static/images/icon/code/code.png')
                            :
                                require('../../static/images/icon/code/code.png')
                        } 
                    />
                    <TextInput
                        ref={(node)=> this._codeInput = node}
                        style={styles.textinput}
                        keyboardType={keyboardType}              
                        placeholder={placeholder}
                        value={value}
                        maxLength={maxLength}
                        onChangeText={(text)=>this.checkBeforeChangeText(text)}
                        onBlur={()=> {this.setState({warnVisible: false})}}
                    />
                    {time === 60 ?   
                        <Text style={styles.rightTit} onPress={this.sendCode}>Verification code</Text>                                        
                    :
                        <Text style={styles.rightTit}>{time}s later...</Text> 
                    }  
                    <View style={styles.verticalLine}></View>            
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
    maxLength: PropTypes.number,
    checkFn: PropTypes.func,
    warnMsg: PropTypes.string,
    sendCode: PropTypes.func
};
CodeInputWithSomeCheck.propTypes = propTypes;
