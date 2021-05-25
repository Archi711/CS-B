import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

export default function NavigatorLink({ route }) {

  return (
    <Link
      paddingLeft={3}
      paddingRight={3}
      as={NavLink}
      exact
      to={route.path}>
      {route.title}
    </Link>
  )
}