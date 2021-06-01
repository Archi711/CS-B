import React, { useEffect, useState } from 'react'
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
  const { state, setBody } = useFetch('/logout', 'post')
  const { data, status } = state
  const [byUser, setByUser] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (!data) return
    if (byUser) setTokens({ accessToken: "", refreshToken: "" })
    toast({
      description: "Pomyślnie wylogowano",
      status: "success",
      duration: 2000,
      isClosable: true
    })
    history.push('/')
    setUser(null)
  }, [data, setUser, toast, history, byUser, setTokens])

  const handleLogout = byUser => e => {
    if (user && tokens.refreshToken) setBody({ token: tokens.refreshToken })
    if (byUser) setByUser(true)
  }
  window.addEventListener('beforeunload', debounce(handleLogout(false), 500))

  return (
    <Button onClick={handleLogout(true)} isLoading={status === 'loading'}>
      Wyloguj się
    </Button>
  )
}