import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Image } from '@chakra-ui/image'
import { Spinner } from '@chakra-ui/spinner'

import useFetch from '../hooks/useFetch'

export default function NotFound(props) {
  const [imageSrc, setImage] = useState(null)
  const { state } = useFetch('', 'get', null, 12, 'https://dog.ceo/api/breeds/image/random')
  const { data } = state

  useEffect(() => {
    if (data) setImage(data.message)
  }, [data])

  return (
    <Flex
      flexDir='column'
      alignItems='center'>
      <Heading p={3}>Nie znaleziono strony!</Heading>
      {
        imageSrc ?
          <Box as='figure' maxW={80}>
            <Image src={imageSrc} />
            <figcaption>pies na poprawę humoru.</figcaption>
          </Box> :
          <Spinner size='xl' />
      }
      <Button m={3} as={Link} to='/'>powrót do strony głównej</Button>
    </Flex>
  )
}