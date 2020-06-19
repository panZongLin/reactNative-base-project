/**
 * tab2
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, Text, StyleSheet} from 'react-native';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class LeftTitViewPro extends React.Component { 
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        title: 'defaultTit',      //左侧标题
        rightContent: null,       //右侧内容填充 
    }


    render() {
        const {title, rightContent} = this.props;
        const styles = StyleSheet.create({
            viewWrap: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: unitWidth*20,
                paddingRight: unitWidth*20,
                height: unitHeight*60,
                backgroundColor: '#fff'
            },
            tit: {
                width: unitWidth*150,
                fontSize: unitSize(13),
                lineHeight: unitHeight*60, 
                textAlign: 'left'
            }
        })
        return (              
            <View style={styles.viewWrap}>
                <Text style={styles.tit}>{title}</Text> 
                <View>{rightContent}</View>
            </View> 
        )
    }
}

const propTypes = {
    title: PropTypes.string,
    rightContent: PropTypes.element
};
LeftTitViewPro.propTypes = propTypes;
