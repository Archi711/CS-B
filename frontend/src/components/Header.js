import { Flex, Spacer, Text, } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { ColorModeSwitcher } from '../ColorModeSwitcher'


import { userState } from '../recoil/atoms'
import LogoutButton from './LogoutButton'
import Navigator from './Navigator'

export default function Header(props) {
  const user = useRecoilValue(userState)

  return (
    <Flex flexDir='row' alignItems='center'>
      <Text p={3}>CS-B</Text>
      <Spacer />
      {props.children}
      {user ? <>
        <Navigator />
        <LogoutButton />
      </> : null}
      <ColorModeSwitcher />
    </Flex>
  )
}