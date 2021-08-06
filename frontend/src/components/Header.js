import { Flex, Spacer, Text, Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { resetUser } from '../features/userSlice';
import { useUserLogoutMutation } from '../services/backend';

import Navigator from './Navigator';

export default function Header(props) {
  const token = useSelector(state => state.user.accessToken);
  const toast = useToast();
  const dispatch = useDispatch();
  const [trigger, { isLoading }] = useUserLogoutMutation();
  const handleLogout = e => {
    trigger(token);
    dispatch(resetUser());
    toast({
      status: 'success',
      title: 'Pomyślnie wylogowano',
      description: 'Nie zapomnij wrócić!',
      isClosable: true,
      duration: 3000,
    });
  };
  return (
    <Flex flexDir="row" alignItems="center">
      <Text p={3}>CS-B</Text>
      <Spacer />
      {props.children}
      {token ? (
        <>
          <Navigator />
          <Button onClick={handleLogout} isLoading={isLoading}>
            Wyloguj się
          </Button>
        </>
      ) : null}
      <ColorModeSwitcher />
    </Flex>
  );
}
