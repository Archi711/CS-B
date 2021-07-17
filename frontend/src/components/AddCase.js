import React, { useState, useEffect } from 'react'
import { Grid } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel, Textarea } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { tokenSessionState } from '../recoil/selectors'
import useFetch from '../hooks/useFetch'

export default function AddCase({ handleAdded }) {
  const { accessToken } = useRecoilValue(tokenSessionState)
  const { state, setBody } = useFetch('/cases', 'post', { token: accessToken })
  const { status, data, error } = state
  const [caseDescription, setCaseDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setBody({ data: caseDescription })
  }

  useEffect(() => {
    if (data) handleAdded(data)
  }, [data, handleAdded])

  const handleChange = e => setCaseDescription(e.target.value)

  return (
    <Grid as='form' onSubmit={handleSubmit}>
      <FormControl id='login' p={3} isRequired>
        <FormLabel>Szczegóły zgłoszenia</FormLabel>
        <Textarea
          value={caseDescription}
          onChange={handleChange}
          maxLength={300}
          name='description' />
        <FormHelperText>maksymalna długość zgłoszenia to 300 znaków - ({caseDescription.length}/300)</FormHelperText>
      </FormControl>
      <FormControl >
        <Button
          type='submit'
          variant='outline'
          colorScheme='orange'
          p={3}
          isLoading={status === 'loading'}
          isFullWidth>Zgłoś</Button>
      </FormControl>
    </Grid>
  )
}