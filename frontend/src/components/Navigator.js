
import { Flex } from '@chakra-ui/react'
import React from 'react'
import NavigatorLink from './NavigatorLink'


export default function Navigator(props) {
  const routes = [
    { title: 'Start', path: '/' },
    { title: 'Sprawy', path: '/cases' }
  ]
  return (
    <Flex
      paddingLeft={3}
      paddingRight={3}
      as='nav'>
      {
        routes.map(route => <NavigatorLink route={route} key={route.title} />)
      }
    </Flex>
  )
}