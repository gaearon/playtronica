import { put, get, del } from './db';
import { colorFromFile } from './utils';

export const PLAY = 'PLAY';
export const REMOVE = 'REMOVE';
export const TOGGLE_LOCK = 'TOGGLE_LOCK';
export const SET_COLOR = 'SET_COLOR';

let urlCache = {};

function getCachedUrl(char, cb) {
  if (urlCache[char]) {
    cb(urlCache[char]);
  } else {
    get(char, (file) => {
      const url = window.URL.createObjectURL(file);
      urlCache[char] = url;
      cb(url);
    });
  }
}

function removeCachedUrl(char) {
  const url = urlCache[char];
  if (url) {
    window.URL.revokeObjectURL(url);
    delete urlCache[char];
  }
}

export function play(char) {
  return (dispatch, getState) => {
    const { isLocked, pressedChars } = getState();
    if (isLocked && pressedChars.indexOf(char) === -1) {
      if (pressedChars.length === 0) {
        dispatch(toggleLock());
      } else {
        return;
      }
    }

    if (getState().colors[char]) {
      getCachedUrl(char, url => new Audio(url).play());
    }

    dispatch({ type: PLAY, char });
  };
}

export function toggleLock() {
  return { type: TOGGLE_LOCK };
}

function setColor(char, color) {
  return { type: SET_COLOR, char, color };
}

export function updateSound(char, file) {
  return dispatch => put(char, file, () => {
    removeCachedUrl(char);
    dispatch(setColor(char, colorFromFile(file)));
  });
}

export function remove(char) {
  return dispatch => del(char, (file) => {
    removeCachedUrl(char);
    dispatch({ type: REMOVE, char });
  });
}