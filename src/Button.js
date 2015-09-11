import React, { Component, PropTypes } from 'react';
import { Block } from 'jsxstyle';
import Center from './Center';

export default class Button extends Component {
  static propTypes = {
    char: PropTypes.string.isRequired,
    onKeyDown: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { onKeyDown, char } = this.props;
    const charCode = e.charCode || e.which || e.keyCode;
    if (String.fromCharCode(charCode).toLowerCase() === char.toLowerCase()) {
      onKeyDown(char);
    }
  }

  render() {
    return (
      <Center width='8rem'
             height='8rem'
             margin='2rem'
             border='4px solid #222'
             fontSize='4rem'
             textAlign='center'
             fontWeight='bold'
             borderRadius={16}>
        {this.props.char}
      </Center>
    );
  }
}
