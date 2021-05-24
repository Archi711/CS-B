import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch'
import ModalPopup from './ModalPopup'
import { useDisclosure } from '@chakra-ui/hooks'
import { Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'

export default function GuardedRoute({ Component, ComponentElse, ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const tokens = useRecoilValue(tokenSessionState)
  const [user, setUser] = useRecoilState(userState)
  const { status, data, error, setBody } = useFetch(`/relogin`, 'post', false)

  useEffect(() => {
    setUser(data)
  }, [data, setUser])

  useEffect(() => {
    console.log('user changed', user)
  }, [user])

  useEffect(() => {
    if (tokens?.accessToken && !user) {
      setBody({ token: tokens.accessToken })
    }
  }, [user, setUser, tokens, setBody])

  useEffect(() => {
    if (error && status === 'error') onOpen()
  }, [error, status, onOpen])

  return status === 'loading' ? <Center width='full' height='lg'><Spinner size='xl' /></Center>
    :
    <>
      <Route {...rest} render={() => user !== null ? <Component /> : <ComponentElse />} />
      <ModalPopup
        isOpen={isOpen}
        onClose={onClose}
        title='Wystąpił błąd'
        variant='error'
        message={error}
      />
    </>
}