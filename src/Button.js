import React, { Component, PropTypes } from 'react';
import { Block, Inline } from 'jsxstyle';
import Center from './Center';

const DeleteButton = ({ onClick, color }) =>
  <Inline fontSize='2rem'
          position='absolute'
          right='.5rem'
          top='-.25rem'
          color={color}
          cursor='pointer'>
    <span onClick={onClick}>×</span>
  </Inline>;

export default class Button extends Component {
  static propTypes = {
    char: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    updateSound: PropTypes.func.isRequired,
    loadSound: PropTypes.func.isRequired
  };

  handleClick(e) {
    if (!this.props.isLocked) {
      return;
    }

    e.stopPropagation();
    this.props.onClick(this.props.char);
  }

  handleDeleteClick(e) {
    if (this.props.isLocked) {
      return;
    }

    e.stopPropagation();
    this.props.onDeleteClick(this.props.char);
  }

  handleInputChange(e) {
    if (this.props.isLocked) {
      return;
    }

    const file = e.target.files[0];
    this.props.updateSound(this.props.char, file);
  }

  componentDidMount() {
    this.props.loadSound(this.props.char);
  }

  render() {
    const { char, isLocked, color } = this.props;
    const accentColor = color ? 'white' : '#222';
    return (
      <div onClick={::this.handleClick}>
        <Center position='relative'
                width='8rem'
                height='8rem'
                margin='2rem'
                border={`4px ${isLocked ? 'solid' : 'dashed'} #222`}
                fontSize='4rem'
                textAlign='center'
                fontWeight='bold'
                borderRadius={16}>
          {color &&
            <Block position='absolute'
                   top={0}
                   left={0}
                   right={0}
                   bottom={0}
                   zIndex={-1}
                   pointerEvents='none'
                   backgroundColor={color} />
          }
          {color &&
            <Block position='absolute'
                   top={0}
                   left={0}
                   right={0}
                   bottom={0}
                   zIndex={-1}
                   pointerEvents='none'
                   opacity={0.25}
                   backgroundColor='black' />
          }
          <Inline color={accentColor}>
            {char}
          </Inline>
          {!isLocked &&
            <input type='file'
                   onChange={::this.handleInputChange}
                   accept='audio/mpeg'
                   style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     opacity: 0,
                     width: '100%',
                     height: '100%',
                     cursor: 'pointer'
                   }} />
          }
          {!isLocked &&
            <DeleteButton onClick={::this.handleDeleteClick}
                          color={accentColor} />
          }
        </Center>
      </div>
    );
  }
}
