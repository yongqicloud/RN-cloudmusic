import React from 'react';
import {View, Text} from 'react-native'
import Index from './pages/index/Index'
import Album from './pages/album/Album'
import Rank from './pages/rank/Rank'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import store from './store'
// import Header from './pages/home/header/Header'
// import { Provider } from './context/navigation'
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
// import { Header } from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();
import Player from './components/player/player'

export default class App extends React.Component {
  state = {
    theme: null,
    currentTheme: null,
    isReady: false,
  };

  changeTheme = (theme, currentTheme) => {
    this.setState({ theme, currentTheme });
  };
  // 异步加载字体资源
  loadAsyncFont = async () => {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );
    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    await Font.loadAsync(
      'iconfont',
       require('./assets/fonts/iconfont.ttf'),
    );
    await Font.loadAsync(
      'selffont',
       require('./assets/fonts/selffont/iconfont.ttf'),
    );
    // eslint-disable-next-line
    this.setState({ isReady: true }); 
  }
  async componentDidMount() {
    this.loadAsyncFont()
  }
  render() {
    const { theme, currentTheme, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <View style={{flex: 1, position:"relative"}}>
          <Player></Player>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitle: '首页',
                headerStyle: {
                  backgroundColor: '#ee7530'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  flex: 1,
                  fontSize: 20
                },
                header: () => null
              }}
            >
              
              <Stack.Screen 
                name="Index" 
                component={Index} 
              />
              <Stack.Screen
                name="Album"
                component={Album}
                options={{
                  title: '歌单详情'
                }}
              />
              <Stack.Screen
                name="Rank"
                component={Rank}
                options={{
                  title: '排行榜'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}