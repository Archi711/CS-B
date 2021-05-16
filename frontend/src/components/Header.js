import { Button, Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { debounce } from 'lodash'

import { userState } from '../recoil/atoms';
import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch';

export default function Header(props) {
  const toast = useToast()
  const [user, setUser] = useRecoilState(userState)
  const [tokens, setTokens] = useRecoilState(tokenSessionState)
  const { setBody } = useFetch('/logout', 'post')

  const handleLogout = (byUser) => e => {
    if (user && tokens.refreshToken) setBody({ token: tokens.refreshToken })
    if (byUser) setTokens({ accessToken: "", refreshToken: "" })
    setUser(null)
    toast({
      description: "Pomyślnie wylogowano",
      status: "success",
      duration: 3000,
      isClosable: true
    })

  }
  window.addEventListener('beforeunload', debounce(handleLogout(false), 500))
  return (
    <Flex flexDir='row-reverse' alignItems='center'>
      <ColorModeSwitcher />
      {props.children}
      {user !== null ?
        <Button onClick={handleLogout(true)}>Wyloguj się</Button> :
        null
      }
    </Flex>
  )
}