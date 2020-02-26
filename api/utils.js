// 计算播放量
export const getCount = (num)=>{
  if(num < 0) return
  if(num < 10000){
    return num 
  }else if(Math.floor(num / 10000) < 10000){
    return Math.floor(num / 1000) / 10 + '万'
  }else{
    return Math.floor(num / 10000000) / 10 + '亿'
  }
}
// 判断空对象
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;

//处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList [i].tracks.length && !rankList [i + 1].tracks.length) {
      return i + 1;
    }
  }
};