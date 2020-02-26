import React, {useState, useEffect} from 'react';
import { Text, View, Image } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import styles from './style_swiper'
interface Props {
  swiperList: Array<object>
}
export default function Swiper(props: Props) {

  const { swiperList } = props
  if(!swiperList.length){
    return null
  }
  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={styles.setOverFlow}
        >
        {
          <Carousel
            style={styles.wrapper}
            selectedIndex={ 0 }
            autoplay
            infinite
          >
            {
              swiperList.map((item:any)=>(
                <View
                  style={styles.container}
                  key={item.targetId}
                >
                  <Image source={{uri:item.imageUrl}} style={styles.img} />
                </View>
              ))
            }
          </Carousel>
        }
        </View>
      </View>
    </View>
  )
}
