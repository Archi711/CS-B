import { VStack } from '@chakra-ui/react'
import React from 'react'

import UserData from '../components/UserData'



export default function Dashboard() {

  return (
    <VStack as='main'>
      <UserData />
    </VStack>
  )
}