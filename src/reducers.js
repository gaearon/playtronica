import { combineReducers } from 'redux';
import { mergePersistedState } from 'redux-localstorage';
import { PLAY, REMOVE, TOGGLE_LOCK, SET_COLOR } from './actions';
import union from 'lodash/array/union';
import without from 'lodash/array/without';

function pressedChars(state = [], action) {
  switch (action.type) {
  case PLAY:
    return union(state, [action.char]);
  case REMOVE:
    return without(state, action.char);
  default:
    return state;
  }
}

function colors(state = {}, action) {
  switch (action.type) {
  case SET_COLOR:
    return { ...state, [action.char]: action.color };
  case REMOVE:
    return { ...state, [action.char]: undefined };
  default:
    return state;
  }
}

function isLocked(state = false, action) {
  switch (action.type) {
  case TOGGLE_LOCK:
    return !state;
  default:
    return state;
  }
}

const reducer = combineReducers({
  pressedChars,
  isLocked,
  colors
});

export default mergePersistedState()(reducer);