import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { useBoolean } from '@chakra-ui/hooks'
import { Flex } from '@chakra-ui/layout'
import { Table, Tbody, Thead, Tr, Th } from '@chakra-ui/table'
import React from 'react'

import UserDataEntry from '../components/UserDataEntry'

export default function UserDataControl(props) {
  const [editMode, setEditMode] = useBoolean(false)
  const bgColor = useColorModeValue('gray.100', 'gray.700')
  const controlBtnClickHandler = e => {
    e.preventDefault()
    if (editMode) {
      // save data 
      alert("zapis... #todo")
      setEditMode.off()
    }
    else {
      setEditMode.on()
    }
  }
  return (
    <Flex
      w='full'
      flexDir='column'
      p={5}
      justifyContent='space-between'
      borderRadius='md'
      bg={bgColor}>
      <Table colorScheme='orange'>
        <Thead><Tr><Th>{props.headingText}</Th><Th></Th></Tr></Thead>
        <Tbody>
          {
            props.data.map(el => <UserDataEntry data={el} key={el.label} editable={editMode} />)
          }
        </Tbody>
      </Table>
      {props.editable ?
        <Button
          marginTop={5}
          alignSelf='flex-end'
          size='md'
          colorScheme={!editMode ? 'yellow' : 'green'}
          onClick={controlBtnClickHandler}>
          {!editMode ? 'Edytuj' : 'Zapisz'}
        </Button> : null
      }
    </Flex>
  )
}