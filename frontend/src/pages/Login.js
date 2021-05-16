import React, { useEffect } from 'react'
import {
  Grid,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'

import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch'
import ModalPopup from '../common/ModalPopup'

export default function Login(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const setUser = useSetRecoilState(userState)
  const setTokens = useSetRecoilState(tokenSessionState)
  const { status, data, error, setBody } = useFetch(`/login`, 'post', false)

  useEffect(() => {
    if (data) {
      console.log(data)
      setUser(data.user)
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      })
    }
  }, [data, setUser, setTokens])

  useEffect(() => {
    if (error && status === 'error') onOpen()
  }, [error, status, onOpen])

  const handleSubmit = e => {
    e.preventDefault()
    const authData = {
      login: e.target[0].value,
      password: e.target[1].value
    }
    setBody(authData)
  }
  return (
    <Grid
      templateColumns={{ sm: "1fr" }}
      alignItems='center'
      justifyContent='center'>
      <VStack verticalAlign='middle'>
        <form onSubmit={handleSubmit}>
          <FormControl id='login' p={3} isRequired>
            <FormLabel>Login:</FormLabel>
            <Input type='text' size='xl'></Input>
            <FormHelperText>Twój login podany na umowie</FormHelperText>
          </FormControl>
          <FormControl id='password' p={3} isRequired>
            <FormLabel>Hasło:</FormLabel>
            <Input type='password' size='xl'></Input>
            <FormHelperText>Twoje hasło</FormHelperText>
          </FormControl>
          <FormControl >
            <Button type='submit' variant='outline' colorScheme='orange' p={3} isFullWidth>{
              status === 'loading' ? <Spinner /> : 'Zaloguj'
            }</Button>
          </FormControl>
        </form>
      </VStack>
      <ModalPopup
        variant='error'
        isOpen={isOpen}
        onClose={onClose}
        title='Wystąpił błąd!'
        message={error}
      />
    </Grid>

  )
}