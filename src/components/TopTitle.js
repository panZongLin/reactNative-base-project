/**
 * 
 * 公用头部
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {unitWidth, unitHeight, getStatusBarHeight, unitSize} from '../../misc/Adapt';


@autobind

export default class TopTitle extends React.Component { 
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        title: 'defaultTit',       //标题
        backgroundColor: '#ccc',   //背景色
        hasIcon: false,            //是否有返回箭头
        touchIconBack: ()=>{}      //箭头回调 
    }

    render() {
        const {title, backgroundColor, hasIcon, touchIconBack} = this.props;
        const styles = StyleSheet.create({
            titWrap: {
                position: 'relative',
                height: Platform.OS==='android' ? unitHeight*64 - unitHeight*getStatusBarHeight() : unitHeight*64,
                backgroundColor: backgroundColor,
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            textSty: {
                color: '#fff',
                fontSize: unitSize(18),
                marginBottom: unitHeight*8
            },
            iconPos: {
                position: 'absolute',
                left: 0,
                bottom: 0,
                zIndex: 100,
                marginLeft: unitWidth*14,
                marginBottom: unitHeight*8,
            }
        })
        return (             
            <View style={styles.titWrap}>
                <StatusBar
                    backgroundColor={backgroundColor} 
                />
                {hasIcon ? 
                    <AntDesignIcon 
                        name={'left'}  
                        size={unitWidth*20} 
                        color={'#fff'}
                        style={styles.iconPos}  
                        onPress={touchIconBack}                          
                    />
                :
                    null
                }
                <Text style={styles.textSty}>
                    {title}
                </Text>
            </View>
        )
    }
}

const propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    hasIcon: PropTypes.bool,
    touchIconBack: PropTypes.func 
};
TopTitle.propTypes = propTypes;
