import React, { useEffect, useCallback } from 'react'
import { View, TouchableOpacity, ScrollView, Image, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import BackHeader from '../../baseUI/backHeader/BackHeader'
import globalStyles from '../../assets/global-style'
import { filterIndex } from '../../api/utils' 
import { getRankList } from './store/index'
import { connect } from 'react-redux'
import styles from './style_rank'
function Rank(props) {
  // console.log(props)
  const { rankList } = props
  const { getRankListDataDispatch } = props
  const rankListJs = rankList ? rankList.toJS () : [];
 
  useEffect(()=>{
    getRankListDataDispatch()
  },[])

  const handleGoback = useCallback(()=>{
    props.navigation.goBack()
  },[])
  // const rankListJs =  rankList.toJS()
  const globalStartIndex: number = filterIndex(rankListJs);
  // console.log('globalStartIndex: ', globalStartIndex);

  const officialList = rankListJs.slice(0, globalStartIndex);
  const globalList = rankListJs.slice(globalStartIndex);
  // const _toDetail = useCallback(()=>{
  //   console.log(1)
  // },[])

  const _toDetail = (id) => () => {
    // console.log(props.navigation)
    props.navigation.push('Album',{id})
  }
  // console.log(officialList.length)
  const renderOfficialSonglist= (list) => {
    return (
      list.map((item, index)=>(
        <View 
          key={item.first + item.second}
          style={styles.songItemContainer}
        >
          <Text 
            style={{color: '#666', fontSize: 14}}
            numberOfLines={1}
          >
            {index+1}.{item.first}
          </Text>
        </View>
      ))
    )
  }
  const renderOfficialRank = (list) => {
    return (
      list.map((item, index)=>(
        <TouchableOpacity 
          key={item.coverImgId + index}
          style={styles.officialItem}
          onPress={_toDetail(item.id)}
        >
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item.coverImgUrl}}
            style={styles.img}
          />
          <LinearGradient 
            colors={['transparent','#333' ]}
            style={styles.linearGradient}
          >
            <Text style={{color: '#fff'}}>{item.updateFrequency}</Text>
          </LinearGradient>
        </View>
        <View
          style={styles.songListContainer}
        >
          {
            renderOfficialSonglist(item.tracks)
          }
        </View>
      </TouchableOpacity>
      ))
    )
  }
  const renderGlobalRank = (list) => {
    // console.log('list: ', list.length);
    return (
      <View style={styles.globalRankContainer}>
        {
          list.map((item, index)=>{
            let marginRight = ((index+1) % 3 ) === 0 ? 0 : 10
            return (
              <TouchableOpacity 
                key={item.coverImgUrl}
                onPress={_toDetail(item.id)}
                style={[
                  styles.globalRankItem,
                  {
                    marginRight: marginRight 
                  }
                ]}
              >
                <View style={styles.globalImgContainer}>
                  <Image
                    source={{uri: item.coverImgUrl}}
                    style={styles.img}
                  />
                  <LinearGradient 
                    colors={['transparent','#333' ]}
                    style={styles.linearGradient}
                  >
                    <Text style={{color: '#fff'}}>{item.updateFrequency}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.nameContainer}>
                  <Text numberOfLines={2}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
      
    )
  }

  return (
    <View style={styles.pageContainer}>
      <BackHeader
        title={"排行榜"}
        position={'relative'}
        fontColor={'#fff'}
        opacity={1}
        backgroundColor={globalStyles['theme-color']}
        handleGoBack={handleGoback}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>官方榜</Text>
          </View>
          {
            renderOfficialRank(officialList)
          }
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>全球榜</Text>
          </View>
          {
            renderGlobalRank(globalList)
          }
        </View>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn (['rank', 'rankList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch (getRankList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rank)