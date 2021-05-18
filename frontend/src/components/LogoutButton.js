import React, { useEffect } from 'react'
import { debounce } from 'lodash'
import { Button, Spinner, useToast } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch';

export default function LogoutButton() {
  const toast = useToast()
  const [user, setUser] = useRecoilState(userState)
  const [tokens, setTokens] = useRecoilState(tokenSessionState)
  const { setBody, data, status } = useFetch('/logout', 'post')

  useEffect(() => {
    if (!data) return;
    toast({
      description: "Pomyślnie wylogowano",
      status: "success",
      duration: 2000,
      isClosable: true
    })
    setUser(null)
  }, [data, setUser, toast])

  const handleLogout = (byUser) => e => {
    if (user && tokens.refreshToken) setBody({ token: tokens.refreshToken })
    if (byUser) setTokens({ accessToken: "", refreshToken: "" })
  }
  window.addEventListener('beforeunload', debounce(handleLogout(false), 500))

  return (
    <Button onClick={handleLogout(true)}>
      {status === 'loading' ? <Spinner /> : 'Wyloguj się'}
    </Button>
  )
}