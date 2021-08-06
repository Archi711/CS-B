import React, { useState, useEffect } from 'react'
import { Grid } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel, Textarea } from '@chakra-ui/react'
import { useAddCaseMutation } from '../services/cases';
import NetworkErrorPopup from '../common/NetworkErrorPopup';
import { useHistory } from 'react-router-dom';

export default function AddCase({ handleAdded }) {
  const [caseDescription, setCaseDescription] = useState('');
  const history = useHistory();
  const [trigger, { error, isLoading, data }] = useAddCaseMutation();

  const handleChange = e => setCaseDescription(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    trigger({ data: caseDescription });
  };

  useEffect(() => {
    if (data) {
      history.push('/cases');
    }
  }, [data, history]);

  return (
    <Grid as="form" onSubmit={handleSubmit}>
      <FormControl id="caseDescription" p={3} isRequired>
        <FormLabel>Szczegóły zgłoszenia</FormLabel>
        <Textarea
          value={caseDescription}
          onChange={handleChange}
          maxLength={300}
          name="description"
        />
        <FormHelperText>
          maksymalna długość zgłoszenia to 300 znaków - (
          {caseDescription.length}/300)
        </FormHelperText>
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
          Zgłoś
        </Button>
      </FormControl>
      <NetworkErrorPopup error={error} />
    </Grid>
  );
}
