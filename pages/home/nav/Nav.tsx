import React, { useContext } from 'react'
import { View, Text, TouchableOpacity,  } from 'react-native'
import { navigationContext } from '../../../context/navigation'
import styles from './style_nav'
interface Props{

}
export default function Nav(props: Props) {
  const navigationController: any = useContext(navigationContext)
  const handlePress = (payload) => ()=> {
    navigationController.navigation.push(payload.navigation,{id: payload.id})
  }
  const navList = [
    {
      id:'0001',
      title: '新歌速递',
      navigation: 'Album',
      targetId: 3230546212,
      font: (<Text style={[{fontFamily:'selffont'},styles.text]}>&#xe633;</Text>)
    },
    {
      id:'0002',
      title: '歌单',
      navigation: 'Album',
      targetId: 3230546212,
      font: (<Text style={[{fontFamily:'selffont'},styles.text]}>&#xe63a;</Text>)
    },
    {
      id:'0003',
      title: '排行榜',
      navigation: 'Rank',
      targetId: 3230546212,
      font: (<Text style={[{fontFamily:'selffont'},styles.text]}>&#xe6fa;</Text>)
    },
    {
      id:'0004',
      title: '电台',
      navigation: 'Album',
      targetId: 3230546212,
      font: (<Text style={[{fontFamily:'selffont'},styles.text]}>&#xe636;</Text>)
    },
    {
      id:'0005',
      title: 'MV',
      navigation: 'Album',
      targetId: 3230546212,
      font: (<Text style={[{fontFamily:'selffont'},styles.text]}>&#xe74f;</Text>)
    },

  ]
  return (
    <View style={styles.container}>
      {
        navList.map((item)=>(
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            style={styles.touchableOpacity}
            onPress={handlePress({navigation: item.navigation, id: item.targetId})}
          >
            <View style={styles.item}>
              {item.font}
            </View>
            <Text style={{paddingTop: 5, fontSize: 12}}>{item.title}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}
