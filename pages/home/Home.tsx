import React, {useState, useEffect,useRef, useContext} from 'react'
import { StyleSheet } from 'react-native'
import Header from '../../baseUI/header/Header'
import Swiper from './swiper/Swiper'
import SliderWrapper from '../../components/sliderWrapper/SliderWrapper'
import BaseSongList from '../../components/baseSongList/BaseSongList'
import Nav from './nav/Nav'
import Player from '../../components/player/player'
import { getBannerRequest, getRecommendListRequest } from '../../api/request'
import { View, ScrollView, Text } from 'react-native'
function Home(props) {
  const videoRef = useRef(null)
  let [swiperList, setSwiperList] = useState([])
  let [recommendList, setRecommentList] = useState([])
  // 轮播数据
  useEffect(() => {
    const fetchData = async ()=>{
      const { banners } = await getBannerRequest()
      const swiperList: Array<object> = banners.map(({ imageUrl, targetId, encodeId })=>({
        imageUrl,
        targetId,
        encodeId,
      }))
      setSwiperList(swiperList)
    }
    fetchData()

  }, [])
  // 推荐歌单数据
  useEffect(()=>{
    const fetchRecommendData = async ()=>{
      const { result } = await getRecommendListRequest()
      const recommendList = result.slice(0,6).map((
        {
          id,
          name,
          picUrl,
          copywriter,
          playCount,
        })=>({
          id,
          name,
          picUrl,
          copywriter, 
          playCount,
        }))
      setRecommentList(recommendList)
    }
    fetchRecommendData()
  },[])
  return (
    <>
      <Header 
        title={'智慧音乐'}
      />  
      <ScrollView 
        style={{ flex: 1}}
      >
        <Swiper swiperList={swiperList}/>
        <Nav />
        <SliderWrapper
          mainTitle="让我为你唱一首歌"
          miniTitle="推荐歌单"
          buttonText="查看更多"
        >
            <BaseSongList recommendList={recommendList}></BaseSongList>
        </SliderWrapper>
      </ScrollView>
    </>
  )
}

export default React.memo(Home)
