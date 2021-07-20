import { Button, Center, Flex, Spacer, Spinner, useDisclosure, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useHistory } from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import { tokenSessionState } from '../recoil/selectors'
import ModalPopup from '../common/ModalPopup'
import CasesTable from '../components/CasesTable'
import AddCase from '../components/AddCase'

export default function Cases() {
  const { accessToken } = useRecoilValue(tokenSessionState);
  const { state, setBody } = useFetch('/cases', 'get', { token: accessToken });
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { status, data, error } = state;
  const [cases, setCases] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (error.heading.length) onOpen();
  }, [error, onOpen]);

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(cases)) {
      setCases(data);
    }
  }, [data, setCases, cases]);

  useEffect(() => {
    setBody(1);
  }, [setBody]);

  const addHandler = cases => {
    setCases(cases);
    setAddMode(false);
  };

  const ErrorModal = (
    <ModalPopup
      variant="error"
      message={error}
      title="Wystąpił błąd"
      isOpen={isOpen}
      onClose={() => {
        history.push('/');
        onClose();
      }}
    />
  );

  return status === 'loading' ? (
    <Center>
      <Spinner size="lg" />
    </Center>
  ) : (
    <Flex flexDir="column">
      <Flex m={3}>
        <Text>Wybierz sprawę, aby wyświelić szczegóły</Text>
        <Spacer />
        <Button
          onClick={() => setAddMode(true)}
          isDisabled={addMode}
          colorScheme="orange"
        >
          Dodaj sprawę
        </Button>
      </Flex>
      {addMode ? (
        <AddCase handleAdded={addHandler} />
      ) : (
        <CasesTable cases={cases} />
      )}
      {error.heading.length ? ErrorModal : null}
    </Flex>
  );
}
