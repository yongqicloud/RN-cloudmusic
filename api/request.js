import { axiosInstance } from "./config";
// 轮播
export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};
// 推荐歌单
export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};
// 精品歌单
// export const gethighqualityList = () => {
  // return 
// }

// 每日推荐
export const getEveryDayRecommendRequest = () => {
  return axiosInstance.get("/recommend/resource");
};
// 歌单详情数据
export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};

// 排行榜
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};
