import { combineReducers } from "redux-immutable";
import { reducer as albumReducer } from "../pages/album/store/index";
import { reducer as rankReducer } from '../pages/rank/store/index'
import { reducer as singersReducer } from '../pages/singers/store/index';
import { reducer as playerReducer } from "../components/player/store/index";
export default combineReducers({
  album: albumReducer,
  rank: rankReducer,
  singers: singersReducer,
  player: playerReducer
});
