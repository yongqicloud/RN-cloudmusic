import React, {useState, useEffect, useContext} from 'react'
import Header from '../../baseUI/header/Header'
import Swiper from './swiper/Swiper'
import SliderWrapper from '../../components/sliderWrapper/SliderWrapper'
import BaseSongList from '../../components/baseSongList/BaseSongList'
import Nav from './nav/Nav'
import { getBannerRequest, getRecommendListRequest } from '../../api/request'
import { View, ScrollView, Text } from 'react-native'
// import { navigationContext } from '../../context/navigation'
function Home(props) {
  // 备用
  // let navigationController = useContext(navigationContext)

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
        title={'云音乐'}
      />  
      <ScrollView 
        style={{ flex: 1}}
      >
        <Swiper swiperList={swiperList}/>
        <Nav />
        <SliderWrapper
          mainTitle="为你精挑细选"
          miniTitle="推荐歌单"
          buttonText="查看更多"
        >
            <BaseSongList recommendList={recommendList}></BaseSongList>
        </SliderWrapper>
        
        <View>
          <Text>----------------我是底线----------------</Text>
        </View>
      </ScrollView>
    </>
  )
}

export default React.memo(Home)
