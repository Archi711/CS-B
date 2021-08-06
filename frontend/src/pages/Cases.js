import { Button, Center, Flex, Spacer, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useFetch from '../hooks/useFetch';
import { tokenSessionState } from '../recoil/selectors';
import CasesTable from '../components/CasesTable';
import AddCase from '../components/AddCase';

export default function Cases() {
  const { accessToken } = useRecoilValue(tokenSessionState);
  const { state, setBody } = useFetch('/cases', 'get', { token: accessToken });
  const { status, data, error } = state;
  const [cases, setCases] = useState([]);
  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    if (error.code) {
      throw error;
    }
  }, [error]);

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
    </Flex>
  );
}
