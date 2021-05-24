import React from 'react'
import { Grid, useBoolean } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { Button } from '@chakra-ui/button'

import { userState } from '../recoil/atoms'
import UserDataControl from './UserDataControl'
import { userDataBuider } from '../utils/userDataBuilder'



export default function UserData(props) {
  const user = useRecoilValue(userState)
  const [editMode, setEditMode] = useBoolean(false)

  const { personalData, contactData, addressData } = userDataBuider(user)
  const handleSaveData = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const updatedData = []
    for (let entry of data.entries()) updatedData.push(entry[1])
    console.log(updatedData)
  }

  return (
    <Grid
      as='form'
      onSubmit={handleSaveData}
      p={5}
      borderRadius='lg'
      border='1px'
      gap={5}
      borderColor='gray.500'
      maxW='full'
      templateColumns={['1fr', null, null, null, '5fr 1fr']}
      w='full'>
      <Grid
        gap='5'
        templateColumns={['1fr', null, null, null, 'repeat(3, 1fr)']}>
        <UserDataControl headingText='Dane osobowe: ' data={personalData} />
        <UserDataControl headingText='Dane kontaktowe: ' data={contactData} editable editMode={editMode} />
        <UserDataControl headingText='Dane adresowe: ' data={addressData} editable editMode={editMode} />
      </Grid>
      <Grid
        alignItems='center'
        gap={3}>
        <Button onClick={() => setEditMode.on()} disabled={editMode} colorScheme='yellow'>
          Edytuj swoje dane
        </Button>
        <Button type='submit' disabled={!editMode} colorScheme='green'>
          Zapisz dane
        </Button>
      </Grid>
    </Grid>
  )
}