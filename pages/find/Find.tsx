import React,{useState, useEffect} from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { getHotKeyWordsRequest } from '../../api/request'
import Header from '../../baseUI/header/Header'
import Search from '../../components/search/Search'
export default function Find() {
  const [hotList, setHotList] = useState(null)
  useEffect(()=>{
    const fetchData = async ()=>{
      const list = await getHotKeyWordsRequest()
      const res: Array<string> = list.result.hots.map(item=> item.first) 
      setHotList(res)
    }
    fetchData()
  },[])
  const onInput = (value)=>{
    console.log(value)
  }
  const renderHotkeyWord = ()=>{
    // if(hotList === null){
    //   return null
    // }
    
    return (
      <View
        style={{
          flexWrap: "wrap",
          width: '100%',
          // backgroundColor: 'pink',
          flexDirection: 'row',
          paddingVertical: 10
        }}
      >
        {
          hotList.map(keyWord=> (
            <TouchableOpacity
              key={keyWord}
              style={{
                display: 'flex',
                borderWidth: 1,
                borderColor: 'red',
                borderStyle: 'solid',
                borderRadius: 10,
                paddingHorizontal: 10,
                marginHorizontal: 10,
                marginVertical: 5,
              }}
            >
              <Text>{keyWord}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      
    )
  }
  return (
    <View>
      <Header title={'发现'} ></Header>
      <Search onInput={onInput}></Search>
      {
        hotList === null ? null : renderHotkeyWord()
      }
    </View>
  )
}
