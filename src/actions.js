import { put, get, del } from './db';
import { colorFromFile } from './utils';

export const PLAY = 'PLAY';
export const REMOVE = 'REMOVE';
export const TOGGLE_LOCK = 'TOGGLE_LOCK';
export const SET_COLOR = 'SET_COLOR';

let objectUrls = {};

function playSound(char) {
  get(char, (file) => {
    if (objectUrls[char]) {
      window.URL.revokeObjectURL(objectUrls[char])
    }

    const url = objectUrls[char] = window.URL.createObjectURL(file);
    const audio = new Audio();
    audio.src = url;
    audio.play();
  });
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
      playSound(char);
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
  return dispatch => put(char, file, () =>
    dispatch(setColor(char, colorFromFile(file)))
  );
}

export function remove(char) {
  return dispatch => del(char, (file) =>
    dispatch({ type: REMOVE, char })
  );
}