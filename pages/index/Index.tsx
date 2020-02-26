import React, { useState } from 'react'
import TabNavigator from 'react-native-tab-navigator';
import Home from '../home/Home'
import { View, Image, Text } from 'react-native'
import styles from './style_index'
import { Provider } from '../../context/navigation'

export default function Album (props) {
  let [state,setState] = useState({
    selectedTab: 'home'
  })
  

  return (
    <View style={styles.layoutWrap}>
      <Provider value={{...props}}>
        <TabNavigator
          tabBarStyle={{ height: 55 }}
        >
          <TabNavigator.Item
            selected={state.selectedTab === 'home'}
            title="音乐屋"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},styles.text]}>&#xe676;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xe676;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'home' })}
          >
            {<Home></Home>}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={state.selectedTab === 'recommend'}
            title="推荐"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},styles.text]}>&#xe642;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xe642;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'recommend' })}
          >
            {<Text>2</Text>}
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={state.selectedTab === 'singers'}
            title="歌手"
            renderIcon={() => <Text style={[{fontFamily:'selffont'},styles.text]}>&#xe895;</Text>}
            renderSelectedIcon={() => <Text style={[{fontFamily:'selffont'},styles.selectedText]}>&#xe895;</Text>}
            selectedTitleStyle={styles.selectedTitleText}
            onPress={() => setState({ selectedTab: 'singers' })}
          >
            {<Text>3</Text>}
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
