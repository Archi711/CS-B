import { Input } from '@chakra-ui/input'
import { Tr, Td } from '@chakra-ui/table'
import React, { useState } from 'react'

export default function UserDataEntry(props) {
  const entry = props.data
  const [value, setValue] = useState(null)
  return (
    <Tr>
      <Td>{entry.label}</Td>
      <Td>{props.editable ?
        <Input
          variant='flushed'
          pattern={entry?.pattern}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={typeof entry.value === 'string' ? entry.value.trim() : entry.value}
          type={entry.type}>
        </Input> :
        entry.value}
      </Td>
    </Tr>
  )
}