import React, { useState } from 'react'
import TabNavigator from 'react-native-tab-navigator';
import Home from '../home/Home'
import Find from '../find/Find'
import Singers from '../singers/Singers'
import { View, Image, Text } from 'react-native'
import styles from './style_index'
import Player from '../../components/player/player'
import { Provider } from '../../context/navigation'

function Index (props) {
  let [state,setState] = useState({
    selectedTab: 'home'
  })
  
  return (
    <View style={styles.layoutWrap}>
      <Player></Player>
      <Provider value={{...props}}>
        <TabNavigator
          tabBarStyle={{ 
            height: 55,
          }}
          sceneStyle={{
            backgroundColor: '#fbfbfb',
            // height: 400
          }}
        >
          <TabNavigator.Item
            selected={state.selectedTab === 'home'}
            title="音乐屋"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},styles.text]}>&#xe676;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xe676;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'home' })}
          >
            {<><Home></Home></>}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={state.selectedTab === 'recommend'}
            title="发现"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},{color: '#000'},styles.text]}>&#xeb9c;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xeb9c;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'recommend' })}
          >
            {<Find></Find>}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={state.selectedTab === 'singers'}
            title="歌手"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},styles.text]}>&#xe895;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xe895;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'singers' })}
          >
            {<Singers></Singers>}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={state.selectedTab === 'mine'}
            title="我的"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},styles.text]}>&#xe600;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xe600;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'mine' })}
          >
            {<Text>4</Text>}
          </TabNavigator.Item>
        </TabNavigator>
      </Provider>
    </View>
  )
}

export default React.memo(Index)
