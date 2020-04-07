export const defaultState = {
  isFullScreen: false,
}

export default function reducer(state, action){
  switch(action.type) {
    case 'miniSize' :
      return { isFullScreen: false };
    case 'zoom' :
      console.log('reducer')
      return { isFullScreen: true };
    default :
      throw new Error('reducer 出错')
  }
}