import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Center } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { useUserReloginMutation } from '../services/backend';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../features/userSlice';
import NetworkErrorPopup from './NetworkErrorPopup';

export default function GuardedRoute({ Component, ComponentElse, ...rest }) {
  const [trigger, { isLoading, data, error }] = useUserReloginMutation();
  const user = useSelector(state => state.user.userData);
  const token = useSelector(state => state.user.accessToken);
  const dispatch = useDispatch();
  if (user === null && token) {
    trigger({
      token,
    });
  }

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  return isLoading ? (
    <Center width="full" height="lg">
      <Spinner size="xl" />
    </Center>
  ) : (
    <>
      <NetworkErrorPopup error={error} />
      <Route
        {...rest}
        render={() => (user !== null ? <Component /> : <ComponentElse />)}
      />
    </>
  );
}
