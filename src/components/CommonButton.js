/**
 * 
 * 确认按钮组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
// import { Button } from 'react-native-elements';
// import {Card} from 'react-native-shadow-cards';
import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class CommonButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static defaultProps = {
        title: 'default',     //按钮文字
        backgroundColor: '#60BD6E', //
        onPress: ()=> {},      //触摸回调
        width: 318,
        height: 44,
        borderR: 24
    }


    render() {
        const {title, backgroundColor, onPress, width, height, borderR} = this.props;
        const styles = StyleSheet.create({
            inputWrap: {               
                alignItems: 'center'        
            },
            cardSty: {
                width: unitWidth*width,
                height: unitHeight*height,   
                borderRadius: unitWidth*borderR,  
                backgroundColor: backgroundColor,
                textAlign: 'center',
                lineHeight: unitHeight*height,
                fontSize: unitSize(16),
                color: '#fff'
            },
            buttonStyle: {
                width: unitWidth*width,
                height: unitHeight*height,                 
                borderRadius: unitWidth*borderR,             
            }
        })
        return (             
            <View style={styles.inputWrap}>
                <TouchableHighlight 
                    underlayColor={'#083103'} 
                    activeOpacity={0.8}
                    onPress={onPress}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.cardSty}>{title}</Text>
                </TouchableHighlight>               
            </View>
        )
    }
}

const propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    borderR: PropTypes.number
};
CommonButton.propTypes = propTypes;
