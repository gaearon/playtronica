import React, { Component, PropTypes } from 'react';
import { Block, Flex } from 'jsxstyle';
import Button from './Button';
import Center from './Center';

const Fonts = ({ children }) =>
  <Block fontFamily='Helvetica, Arial, sans-serif'>
    {children}
  </Block>;

function play(char) {
}

const App = () =>
  <Fonts>
    <Center width='100vw' height='100vh'>
      <Center>
        <Button char='Q' onKeyDown={play} />
      </Center>
    </Center>
  </Fonts>;

export default App;
