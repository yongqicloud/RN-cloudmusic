import React, { useContext } from 'react'
import styles from './style_baseSongList'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { navigationContext } from '../../context/navigation'
import { getCount,} from '../../api/utils'
import LinearCount from '../../baseUI/linearCount/linearCount'
interface Props{
  recommendList: Array<object>
}
export default function BaseSongList(props: Props) {
  const navigationController: any = useContext(navigationContext)
  const { recommendList } = props
  const handlePageChange = (id: number) => () => {
    navigationController.navigation.push('Album',{id: id, titleType: '歌单'})
  }
  if(!recommendList.length){
    return null
  }
  return (
    <View
      style={styles.container}
    >
      {
        recommendList.map((item: any)=>(
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.touchableOpacity}
            onPress={handlePageChange(item.id)}
          >
            <View
              style={styles.itemContainer}
            >
              <Image style={styles.img} source={{uri: item.picUrl}}/>
              <LinearCount count={item.playCount}></LinearCount>
            </View>
            <Text
              numberOfLines={2}
              style={styles.text}
            >{item.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}
