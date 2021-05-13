import { Button, Flex } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { debounce } from 'lodash'

import { userState } from '../recoil/atoms';
import { tokenSessionState } from '../recoil/selectors'

export default function Header(props) {
  const [user, setUser] = useRecoilState(userState)
  const [tokens, setTokens] = useRecoilState(tokenSessionState)
  let refreshToken = null
  if (tokens) refreshToken = tokens.refreshToken
  const handleLogout = (byUser) => e => {
    if (user && refreshToken) axios.post(`http://${process.env.REACT_APP_API_ADDRESS}/logout`, { token: refreshToken })
      .then(v => {
        setUser(null)
        if (byUser) setTokens({ accessToken: "", refreshToken: "" })
      })
      .catch(e => alert(`błąd wylogowania ${e}`))
  }
  window.addEventListener('beforeunload', debounce(handleLogout(false), 500))
  return (
    <Flex flexDir='row-reverse' alignItems='center'>
      <ColorModeSwitcher />
      <Redirect to='/'></Redirect>
      {props.children}
      {user !== null ?
        <Button onClick={handleLogout(true)}>Wyloguj się</Button> :
        null
      }
    </Flex>
  )
}