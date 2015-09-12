export const PLAY = 'PLAY';
export const REMOVE = 'REMOVE';
export const TOGGLE_LOCK = 'TOGGLE_LOCK';

export function play(char) {
  return (dispatch, getState) => {
    const { isLocked, pressedChars } = getState();
    if (isLocked && pressedChars.indexOf(char) === -1) {
      return;
    }

    return dispatch({
      type: PLAY,
      char
    });
  };
}

export function remove(char) {
  return {
    type: REMOVE,
    char
  };
}

export function toggleLock() {
  return { type: TOGGLE_LOCK };
}