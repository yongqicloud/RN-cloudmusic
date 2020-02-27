import React, {useEffect, useState } from 'react'
import { View, Text} from 'react-native'
import HorizenItem  from '../../baseUI/horizenItem/HorizenItem'
import Header from '../../baseUI/header/Header'
import ListContainer from './listContainer/ListContainer'
import { categoryTypes, alphaTypes  } from '../../api/config'
import { getSingerList, changeCategory, changeAlpha, getHotSingerList,
    changeEnterLoading, changeListOffset, refreshMoreSingerList,
    changePullUpLoading,changePullDownLoading, refreshMoreHotSingerList 
} from './store/actionCreators';
import {connect} from 'react-redux'
import styles from './style_singers'
function Singers (props) {
  let [refresh, setRefresh] = useState(false)
  // let [category, setCategory] = useState ('');
  // let [alpha, setAlpha] = useState ('');
  const { singerList, pageCount, category, alpha } = props
  const singerListJs = singerList.toJS()
  // dispatch
  const { getHotSinger, pullUpRefresh, pullDownRefresh, updateCategory, updateAlpha } = props
  const { getHotSingerDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch, updateDispatch} = props


  useEffect(()=>{
    if(!singerList.length && !category && !alpha) {
      getHotSinger();
    }
  },[])

  const _handlePullDown = async () => {
    console.log('刷新中')
    setRefresh(true)
    await pullDownRefresh(category, pageCount);
    console.log('刷新成功')
    setRefresh(false)
  }

  const _handlePullUp = () => {
    console.log('到底啦')
    pullUpRefresh(category === '', pageCount)
  }; 

  const handleUpdateAlpha = (newVal) => {
    if(alpha === newVal) return
    updateAlpha(newVal)
  }

  const handleUpdateCatetory = (newVal) => {
    if(category === newVal) return
    updateCategory(newVal)
  }
  return (
    <View style={styles.pageContainer}>
      <Header 
        title={'歌手'}
      />
      <HorizenItem 
        title={"分类(默认热门):"}
        list={categoryTypes}
        selectedVal={category}
        handlePress={handleUpdateCatetory}
      />
      <HorizenItem 
        title={"首字母:"}
        list={alphaTypes}
        selectedVal={alpha}
        handlePress={handleUpdateAlpha}
      />
      <ListContainer 
        refresh={refresh}
        handlePullend={_handlePullUp}
        handleRefresh={_handlePullDown}
        list={singerListJs}
      />
    </View>
  )
}
const mapStateToProps = (state) => ({
  alpha: state.getIn(['singers', 'alpha']),
  category: state.getIn(['singers', 'category']),
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
  // songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSinger() {
      dispatch(getHotSingerList());
    },
    updateCategory(newVal) {
      dispatch(changeCategory(newVal));
      dispatch(changeListOffset(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList());
    },
    updateAlpha(newVal) {
      dispatch(changeAlpha(newVal));
      dispatch(changeListOffset(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList());
    },
    // 滑到最底部刷新部分的处理
    pullUpRefresh(hot, count) {
      dispatch(changePullUpLoading(true));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList());
      }
    },
    //顶部下拉刷新
    pullDownRefresh(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changeListOffset(0));
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList());
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers)) 
