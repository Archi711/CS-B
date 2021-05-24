
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Heading, Grid, Divider } from '@chakra-ui/react'
import React from 'react'

import UserDataEntry from '../components/UserDataEntry'

export default function UserDataControl(props) {
  const editMode = props.editMode
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  return (
    <Grid
      p={5}
      bg={bgColor}
      alignContent='start'
      gap={5}>
      <Heading
        fontSize='2xl'
      >{props.headingText}</Heading>
      <Divider />
      {props.data.map(el =>
        <UserDataEntry data={el} key={el.label} editable={editMode} />
      )}
    </Grid>
  )
}