import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch';
import { Center } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';

export default function GuardedRoute({ Component, ComponentElse, ...rest }) {
  const tokens = useRecoilValue(tokenSessionState);
  const [user, setUser] = useRecoilState(userState);
  const { state, setBody } = useFetch(`/relogin`, 'post', false);
  const { data, status, error } = state;

  useEffect(() => {
    setUser(data);
  }, [data, setUser]);

  useEffect(() => {
    if (tokens?.accessToken && !user) {
      setBody({ token: tokens.accessToken });
    }
  }, [user, setUser, tokens, setBody]);

  useEffect(() => {
    if (error.code) throw error;
  }, [error]);

  return status === 'loading' ? (
    <Center width="full" height="lg">
      <Spinner size="xl" />
    </Center>
  ) : (
    <Route
      {...rest}
      render={() => (user !== null ? <Component /> : <ComponentElse />)}
    />
  );
}
