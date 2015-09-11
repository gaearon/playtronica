import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';
import Button from './Button';

const Fonts = ({ children }) =>
  <Block fontFamily='Helvetica, Arial, sans-serif'>
    {children}
  </Block>;

const Center = ({ children, ...rest }) =>
  <Flex alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        {...rest}>
    {children}
  </Flex>;

const App = () =>
  <Fonts>
    <Center width='100vw' height='100vh'>
      <Center>
        <Button char='Q' />
      </Center>
    </Center>
  </Fonts>;

export default App;
