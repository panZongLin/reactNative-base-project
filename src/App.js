import 'react-native-gesture-handler';
import React from 'react';
import { create } from 'dva-core';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
// import {request, PERMISSIONS} from 'react-native-permissions';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {View, StatusBar, TextInput, UIManager, Platform, BackHandler} from 'react-native';

import routerConfig from './configs/router'; //路由配置
import modelOption from './models/modelOption'; //数据管理


import './utils/storage'; //本地储存
import toolFn from './utils/toolFunction';  //工具函数
import {unitWidth, unitHeight, unitSize, isIphoneXAndUp} from './utils/fitConfig'; //适配文件
import registerUncaughtExceptionHandlers from './utils/uncaught-exception-handle';  //崩溃提示


//dva实例初始化
const dvaApp = create(); 
modelOption.forEach((obj) => {  
    dvaApp.model(obj);
});
dvaApp.start();      
global.store = dvaApp._store; 


//Stack.Navigator  
const Stack = createStackNavigator();
const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
        fontSize: unitSize(14),
        textAlign: 'center'
    },
}


class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state={}
        this.prepareApp();
    }

    UNSAFE_componentWillMount() {
        this.requestMultiple();
    }

    //请求权限，模块未安装
    async requestMultiple() {
        if(Platform.OS === 'android') { 
            //await request(PERMISSIONS.ANDROID.CAMERA);       
        }else {
            
        }
    }

    componentDidMount() {
        //关闭启动页，放在你认为合适的地方
        setTimeout(()=>{
            SplashScreen.hide();
        }, 1000)
    }

    prepareApp() {
        // 
        registerUncaughtExceptionHandlers();        

        // Set some default props to commonly used UI components.
        TextInput.defaultProps.padding = 0;

        // https://facebook.github.io/react-native/docs/layoutanimation
        if (toolFn.isAndroid()) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

    }

    render() {
        return ( 
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1}}>
                    <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />               
                    {/* <View 
                        style={{
                            position: 'absolute', left:0, top:0, right:0, 
                            bottom: isIphoneXAndUp() ? unitHeight*23 : 0
                        }}
                    > */}
                        <Provider store={store}>                      
                            <NavigationContainer>
                                <Stack.Navigator                                
                                    initialRouteName="Main"
                                    screenOptions={defaultNavigationOptions}                              
                                    headerMode="none" //隐藏 Navigator 标题栏
                                >
                                    {routerConfig && routerConfig.map((item, index)=> {
                                        return(
                                            <Stack.Screen 
                                                key={item.name} 
                                                name={item.name} 
                                                component={item.component} 
                                            />
                                        )
                                    })}
                                </Stack.Navigator>
                            </NavigationContainer>
                        </Provider> 
                    {/* </View> */}
                </SafeAreaView> 
            </SafeAreaProvider>         
        );
    }
}

export default App;
