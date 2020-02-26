import { combineReducers } from "redux-immutable";
import { reducer as albumReducer } from "../pages/album/store/index";
import { reducer as rankReducer } from '../pages/rank/store/index'
export default combineReducers({
  album: albumReducer,
  rank: rankReducer,
});
