/**
 * 
 * tab1
 */
import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {View, Text, StyleSheet} from 'react-native';

import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';


@autobind
export default class LeftTitView extends React.Component { 
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
                marginLeft: unitWidth*20,
                marginRight: unitWidth*20,
                height: unitHeight*50,
                borderBottomWidth: unitHeight*1,
                borderBottomColor: '#E6E6E6',
                overflow: 'hidden'
            },
            tit: {
                width: unitWidth*125,
                fontSize: unitSize(15),
                lineHeight: unitHeight*50, 
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
LeftTitView.propTypes = propTypes;
