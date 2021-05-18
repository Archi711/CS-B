import { Flex, } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil';
import { ColorModeSwitcher } from '../ColorModeSwitcher';


import { userState } from '../recoil/atoms';
import LogoutButton from './LogoutButton';

export default function Header(props) {
  const user = useRecoilValue(userState)

  return (
    <Flex flexDir='row-reverse' alignItems='center'>
      <ColorModeSwitcher />
      {props.children}
      {user ? <LogoutButton /> : null}
    </Flex>
  )
}