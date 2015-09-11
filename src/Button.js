import React, { Component, PropTypes } from 'react';
import { Block } from 'jsxstyle';

export default class Button extends Component {
  static propTypes = {
    char: PropTypes.string.isRequired
  };

  render() {
    return (
      <Block width='5rem'
             height='5rem'
             margin='2rem'
             padding='2rem'
             border='4px solid #222'
             fontSize='4rem'
             textAlign='center'
             fontWeight='bold'
             borderRadius={16}>
        {this.props.char}
      </Block>
    );
  }
}
