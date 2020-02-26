import * as actionTypes from './constants';
import { fromJS } from 'immutable';

export const defaultState = fromJS({
  currentAlbum: {},
  startIndex: 0,
  totalCount: 0,
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.data);
    case actionTypes.CHANGE_START_INDEX:
      return state.set('startIndex', action.data);
    default:
      return state;
  }
}