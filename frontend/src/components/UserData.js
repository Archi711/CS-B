import React, { useEffect } from 'react'
import { Grid, useBoolean } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/react'

import { userState } from '../recoil/atoms'
import UserDataControl from './UserDataControl'
import { userDataBuider } from '../utils/userDataBuilder'
import useFetch from '../hooks/useFetch'
import { tokenSessionState } from '../recoil/selectors'



export default function UserData(props) {
  const [user, setUser] = useRecoilState(userState);
  const tokens = useRecoilValue(tokenSessionState);
  const [editMode, setEditMode] = useBoolean(false);
  const { state, setBody } = useFetch('/user', 'put', false);
  const { status, data, error } = state;
  const toast = useToast();
  debugger;
  const { personalData, contactData, addressData } = userDataBuider(user);
  const handleSaveData = e => {
    e.preventDefault();
    let sendReq = false;
    const data = new FormData(e.target);
    const updatedData = [];
    for (let entry of data.entries()) {
      updatedData.push(entry[1]);
      if (entry[1].length > 0) sendReq = true;
    }
    if (sendReq) {
      setBody({
        data: updatedData,
        token: tokens.accessToken,
      });
    } else {
      toast({
        description: 'Podaj wymagane dane i spróbuj ponownie',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    if (!data) return;
    if (data !== user && tokens) {
      setUser(data);
      toast.closeAll();
      toast({
        status: 'success',
        title: 'Zapisano dane',
        duration: 3000,
        isClosable: true,
      });
      setEditMode.off();
    }
  }, [data, toast, setEditMode, setUser, status, user, tokens]);

  useEffect(() => {
    if (error && status === 'error') {
      toast({
        status: status,
        title: 'Błąd zapisu, spróbuj ponownie',
        isClosable: true,
      });
      setEditMode.off();
    }
  }, [error, status, toast, setEditMode]);

  return (
    <Grid
      as="form"
      onSubmit={handleSaveData}
      p={5}
      borderRadius="lg"
      border="1px"
      gap={5}
      borderColor="gray.500"
      maxW="full"
      templateColumns={['1fr', null, null, null, '5fr 1fr']}
      w="full"
    >
      <Grid
        gap="5"
        templateColumns={['1fr', null, null, null, 'repeat(3, 1fr)']}
      >
        <UserDataControl headingText="Dane osobowe: " data={personalData} />
        <UserDataControl
          headingText="Dane kontaktowe: "
          data={contactData}
          editable
          editMode={editMode}
        />
        <UserDataControl
          headingText="Dane adresowe: "
          data={addressData}
          editable
          editMode={editMode}
        />
      </Grid>
      <Grid alignItems="center" gap={3}>
        <Button
          onClick={() => setEditMode.on()}
          disabled={editMode}
          colorScheme="yellow"
        >
          Edytuj swoje dane
        </Button>
        <Button
          onClick={() => setEditMode.off()}
          disabled={!editMode}
          colorScheme="blue"
        >
          Anuluj
        </Button>
        <Button
          type="submit"
          disabled={!editMode}
          colorScheme="green"
          isLoading={status === 'loading'}
        >
          Zapisz dane
        </Button>
      </Grid>
    </Grid>
  );
}
