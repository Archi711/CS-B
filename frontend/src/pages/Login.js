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
import { useHistory } from 'react-router-dom';

import { useUserLoginMutation } from '../services/backend';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import NetworkErrorPopup from '../common/NetworkErrorPopup';

export default function Login() {
  const [trigger, { isLoading, error, data }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      history.push('/');
    }
  }, [data, dispatch, history]);

  const handleSubmit = e => {
    e.preventDefault();
    const authData = {
      login: e.target[0].value,
      password: e.target[1].value,
    };
    trigger(authData);
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
              isLoading={isLoading}
              isFullWidth
            >
              Zaloguj
            </Button>
          </FormControl>
        </form>
      </VStack>
      <NetworkErrorPopup error={error} />
    </Grid>
  );
}
