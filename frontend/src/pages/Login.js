import React, { useEffect } from 'react'
import {
  Grid,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';

import { userState } from '../recoil/atoms';
import { tokenSessionState } from '../recoil/selectors';
import useFetch from '../hooks/useFetch';

export default function Login() {
  const setUser = useSetRecoilState(userState);
  const setTokens = useSetRecoilState(tokenSessionState);
  const { state, setBody } = useFetch(`/login`, 'post');
  const { status, data, error } = state;

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    }
  }, [data, setUser, setTokens]);

  useEffect(() => {
    if (error.code) throw error;
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    const authData = {
      login: e.target[0].value,
      password: e.target[1].value,
    };
    setBody(authData);
  };
  return (
    <Grid
      templateColumns={{ sm: '1fr' }}
      alignItems="center"
      justifyContent="center"
    >
      <VStack verticalAlign="middle">
        <form onSubmit={handleSubmit}>
          <FormControl id="login" p={3} isRequired>
            <FormLabel>Login:</FormLabel>
            <Input type="text" size="xl"></Input>
            <FormHelperText>Twój login podany na umowie</FormHelperText>
          </FormControl>
          <FormControl id="password" p={3} isRequired>
            <FormLabel>Hasło:</FormLabel>
            <Input type="password" size="xl"></Input>
            <FormHelperText>Twoje hasło</FormHelperText>
          </FormControl>
          <FormControl>
            <Button
              type="submit"
              variant="outline"
              colorScheme="orange"
              p={3}
              isLoading={status === 'loading'}
              isFullWidth
            >
              Zaloguj
            </Button>
          </FormControl>
        </form>
      </VStack>
    </Grid>
  );
}
