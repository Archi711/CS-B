import React from 'react'
import {
  Grid,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSetRecoilState } from 'recoil'

import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'

export default function Login(props) {
  const setUser = useSetRecoilState(userState)
  const setTokens = useSetRecoilState(tokenSessionState)
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    const authData = {
      login: e.target[0].value,
      password: e.target[1].value
    }

    try {
      const resp = await axios.post(`http://${process.env.REACT_APP_API_ADDRESS}/login`, authData)
      setUser(resp.data.user)
      setTokens({
        accessToken: resp.data.accessToken,
        refreshToken: resp.data.refreshToken
      })
      history.push('/')
    }
    catch (ex) {
      alert(ex)
    }

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
            <Button type='submit' variant='outline' colorScheme='orange' p={3} isFullWidth>Zaloguj</Button>
          </FormControl>
        </form>
      </VStack>
    </Grid>
  )
}