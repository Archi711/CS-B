import React, { useEffect } from 'react'
import { debounce } from 'lodash'
import { Button, useToast } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'

import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch'

export default function LogoutButton() {
  const toast = useToast()
  const [user, setUser] = useRecoilState(userState)
  const [tokens, setTokens] = useRecoilState(tokenSessionState)
  const { setBody, data, status } = useFetch('/logout', 'post')
  const history = useHistory()

  useEffect(() => {
    if (!data) return
    toast({
      description: "Pomyślnie wylogowano",
      status: "success",
      duration: 2000,
      isClosable: true
    })
    history.push('/')
    setUser(null)
  }, [data, setUser, toast, history])

  const handleLogout = (byUser) => e => {
    if (user && tokens.refreshToken) setBody({ token: tokens.refreshToken })
    if (byUser) setTokens({ accessToken: "", refreshToken: "" })
  }
  window.addEventListener('beforeunload', debounce(handleLogout(false), 500))

  return (
    <Button onClick={handleLogout(true)} isLoading={status === 'loading'}>
      Wyloguj się
    </Button>
  )
}