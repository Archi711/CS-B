import { Flex } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
export default function Header(props) {

  return (
    <Flex flexDir='row-reverse'>
      <ColorModeSwitcher />
    </Flex>
  )
}