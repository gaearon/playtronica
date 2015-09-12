import { put, get, del } from './db';
import { colorFromFile } from './utils';

export const PLAY = 'PLAY';
export const REMOVE = 'REMOVE';
export const TOGGLE_LOCK = 'TOGGLE_LOCK';
export const SET_COLOR = 'SET_COLOR';

let cachedFiles = {};
function getCachedFile(char, cb) {
  if (cachedFiles[char]) {
    return cb(cachedFiles[char]);
  }
  get(char, (file) => {
    cachedFiles[char] = file;
    return cb(file);
  });
}
function removeCachedFile(char) {
  delete cachedFiles[char];
}

let cachedBuffers = {};
function getCachedBuffer(char, cb) {
  if (cachedBuffers[char]) {
    return cb(cachedBuffers[char]);
  }
  getCachedFile(char, file => {
    const reader = new FileReader();
    reader.onload = () => {
      audioContext.decodeAudioData(reader.result, buffer => {
        cachedBuffers[char] = buffer;
        return cb(buffer);
      });
    };
    reader.readAsArrayBuffer(file);
  });
}
function removeCachedBuffer(char) {
  removeCachedFile(char);
  delete cachedBuffers[char];
}

let audioContext = new AudioContext();
let playingSources = {};
function playSource(char, buffer) {
  if (playingSources[char]) {
    playingSources[char].stop();
  }

  const source = playingSources[char] = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
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
      getCachedBuffer(char, buffer => playSource(char, buffer));
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
    removeCachedBuffer(char);
    dispatch(setColor(char, colorFromFile(file)));
  });
}

export function remove(char) {
  return dispatch => del(char, (file) => {
    removeCachedBuffer(char);
    dispatch({ type: REMOVE, char });
  });
}