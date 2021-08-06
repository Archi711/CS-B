import { Button, Center, Flex, Spacer, Spinner, Text } from '@chakra-ui/react';
import { RepeatClockIcon } from '@chakra-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCases } from '../features/casesSlice';
import CasesTable from '../components/CasesTable';
import { useGetCasesQuery } from '../services/cases';
import NetworkErrorPopup from '../common/NetworkErrorPopup';
import { Link } from 'react-router-dom';

export default function Cases() {
  const dispatch = useDispatch();
  const cases = useSelector(store => store.cases.cases);

  const { isFetching, error, data, refetch } = useGetCasesQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCases(data));
    }
  }, [data, dispatch]);

  const handleRefresh = e => refetch();

  return isFetching ? (
    <Center>
      <Spinner size="lg" />
    </Center>
  ) : (
    <Flex flexDir="column">
      <Flex m={3}>
        <Text>Wybierz sprawę, aby wyświelić szczegóły</Text>
        <Spacer />
        <Button marginRight={5} onClick={handleRefresh}>
          <RepeatClockIcon marginRight={3} />
          Odśwież
        </Button>
        <Button as={Link} colorScheme="orange" to="/cases/add">
          Dodaj sprawę
        </Button>
      </Flex>
      <CasesTable cases={cases} />
      <NetworkErrorPopup error={error} />
    </Flex>
  );
}
