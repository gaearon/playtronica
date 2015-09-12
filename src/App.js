import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';
import { connect } from 'react-redux';
import { play, remove, toggleLock } from './actions';
import Button from './Button';
import Center from './Center';

class App extends Component {
  componentDidMount() {
    const { play } = this.props;

    window.addEventListener('keydown', e => {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      const charCode = e.charCode || e.which || e.keyCode;
      const key = String.fromCharCode(charCode).toUpperCase();

      if (key.match(/[A-Z]/)) {
        play(key);
      }
    });
  }

  render() {
    const {
      play, remove, toggleLock,
      pressedChars, isLocked
    } = this.props;
    return (
      <Block fontFamily='Helvetica, Arial, sans-serif'>
        <Center width='100vw' height='100vh'>
          <Block position='absolute'
                 right='1rem'
                 top='1rem'>
            <a href='#' onClick={toggleLock}>
              {isLocked ? 'Edit' : 'Done'}
            </a>
          </Block>
          <Center>
            {pressedChars.map((char, index) =>
              <Button key={char}
                      char={char}
                      onClick={play}
                      onDeleteClick={remove}
                      isLocked={isLocked} />
            )}
          </Center>
        </Center>
      </Block>
    );
  }
}

function mapStateToProps(state) {
  return {
    pressedChars: state.pressedChars,
    isLocked: state.isLocked
  };
}

export default connect(mapStateToProps, {
  play,
  remove,
  toggleLock
})(App);
