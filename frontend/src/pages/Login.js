import React from 'react'
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react'
export default function Login() {
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <Grid
      templateColumns={{ sm: "1fr", xl: "1fr 1fr" }}
      alignItems='center'
      justifyContent='center'>
      <Box></Box>
      <VStack verticalAlign='middle'>
        <form onSubmit={handleSubmit}>
          <FormControl id='login' p={3} isRequired>
            <FormLabel>Login:</FormLabel>
            <Input type='text' size='xl'></Input>
            <FormHelperText>Twój login podany na umowie</FormHelperText>
          </FormControl>
          <FormControl id='password' p={3} isRequired>
            <FormLabel>Hasło:</FormLabel>
            <Input type='password' size='xl'></Input>
            <FormHelperText>Twoje hasło</FormHelperText>
          </FormControl>
          <FormControl >
            <Button type='submit' variant='outline' colorScheme='orange' p={3} isFullWidth>Zaloguj</Button>
          </FormControl>
        </form>
      </VStack>
    </Grid>
  )
}