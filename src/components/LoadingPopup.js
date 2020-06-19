/**
 * 
 * 全局加载状态弹窗
 */
import React, {Fragment}from 'react';
import {autobind} from 'core-decorators';
import {View, StyleSheet} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import Spinner from 'react-native-spinkit';
import {unitWidth, unitHeight, unitSize} from '../../misc/Adapt';

let unsubscribe  = null;

@autobind
class LoadingPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingPopupVisible: false
        }
    }

    static defaultProps = {
        //visible: false,
        //msg: 'loading...'
    }

    componentDidMount() {
        unsubscribe  = global.store.subscribe(()=> {
            if(global.store.getState().login.loadingPopupVisible !==this.state.loadingPopupVisible) {
                this.setState({loadingPopupVisible: global.store.getState().login.loadingPopupVisible})
            }
        });
    }

    componentWillUnmount() {
        unsubscribe();
    }
    

    render() {
        const styles = StyleSheet.create({
            Mask: {
                width: unitWidth*120,
                height: unitHeight*80, 
                position: 'absolute',
                left: '50%',
                //right: 0,
                top: unitHeight*300,
                //bottom: 0,
                marginLeft: unitWidth*-60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
                opacity: 0.5
            }
        })

        return (
            <Fragment> 
                {this.state.loadingPopupVisible ?  
                    <View style={{...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0)'}}> 
                        <Card style={styles.Mask} elevation={4}>
                            <Spinner
                                color="#ccc"
                                type={'Circle'} 
                                size={unitWidth*60}
                            />                      
                        </Card> 
                    </View>                                                 
                :
                    null
                }
            </Fragment>               
        )
    }
}

const propTypes = {
    //visible: PropTypes.bool,
    //msg: PropTypes.string
};
LoadingPopup.propTypes = propTypes;

export default LoadingPopup;
