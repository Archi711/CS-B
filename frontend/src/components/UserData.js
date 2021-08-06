import React, { useEffect } from 'react';
import { Grid, useBoolean } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateUserMutation } from '../services/user';
import UserDataControl from './UserDataControl';
import { userDataBuider } from '../utils/userDataBuilder';
import { setUserData } from '../features/userSlice';
import NetworkErrorPopup from '../common/NetworkErrorPopup';

export default function UserData(props) {
  const user = useSelector(state => state.user.userData);
  const token = useSelector(state => state.user.accessToken);
  const [trigger, { isLoading, data, error }] = useUpdateUserMutation();
  const [editMode, setEditMode] = useBoolean(false);
  const dispatch = useDispatch();
  const toast = useToast();
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
      trigger({
        token,
        data: updatedData,
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
    if (data && data !== user && token) {
      dispatch(setUserData(data));
      toast.closeAll();
      toast({
        status: 'success',
        title: 'Zapisano dane',
        duration: 3000,
        isClosable: true,
      });
      setEditMode.off();
    }
  }, [data, toast, setEditMode, user, dispatch, token]);

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
          isLoading={isLoading}
        >
          Zapisz dane
        </Button>
      </Grid>
      <NetworkErrorPopup error={error} />
    </Grid>
  );
}
