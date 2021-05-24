import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export default function UserDataEntry(props) {
  const entry = props.data
  const color = useColorModeValue('blackAlpha.600', 'gray.300')
  return (
    <FormControl>
      <FormLabel color={color}>{entry.label}:</FormLabel>
      <Text fontSize='2xl'>{props.editable ?
        <Input
          variant='flushed'
          maxLength={entry?.maxLength}
          pattern={entry?.pattern}
          name={entry.fieldName}
          placeholder={typeof entry.value === 'string' ? entry.value.trim() : entry.value}
          type={entry.type}>
        </Input> :
        entry.value}
      </Text>
    </FormControl>
  )
}