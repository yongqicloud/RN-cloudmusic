import React from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'
interface Props{
  list: Array<object>,
  refresh: boolean,
  handlePullend: Function,
  handleRefresh: Function
}

function ListContainer(props: Props) {
  const { list, handlePullend, refresh, handleRefresh } = props
  
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity 
        key={item.picUrl}
        style={{
          width: '100%',
          height: 60,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{height: 50, width: 50, borderRadius: 5, overflow: "hidden"}}>
          <Image 
            style={{width: '100%', height: '100%'}}
            source={{uri: item.picUrl}}
          />
        </View>
        <View style={{flexDirection: "row", alignItems: "center", paddingLeft: 20}}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  if(!list.length){
    return <Text>无数据</Text>
  }
  return (
    <View style={{
      flex: 1,
      // paddingBottom: 10,
      paddingHorizontal: 10,
    }}>
      <FlatList 
        data={list}
        refreshing={refresh}
        onRefresh={()=>{handleRefresh()}}
        renderItem={_renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={()=>{handlePullend()}}
      />
    </View>
  )
}

export default React.memo(ListContainer)
