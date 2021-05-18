import { Grid, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import UserDataControl from '../components/UserDataControl'
import { userState } from '../recoil/atoms'

function rawDataEntry(label, value, type, ...rest) {
  this.label = label
  this.value = value
  this.type = type
  rest.forEach(v => this[v.name] = v.value)
}


export default function Dashboard() {
  const user = useRecoilValue(userState)
  const personalData = [
    new rawDataEntry('Imię', user.FirstName, 'text'),
    new rawDataEntry('Nazwisko', user.LastName, 'text')
  ]
  const contactData = [
    new rawDataEntry('Numer telefonu', user.PhoneNumber, 'number'),
    new rawDataEntry('Adres email', user.Email, 'email')
  ]
  const addressData = [
    new rawDataEntry('Ulica', user.StreetName, 'text'),
    new rawDataEntry('Numer budynku', user.BuildingNumber, 'number'),
    new rawDataEntry('Numer mieszkania', user.FlatNumber, 'number'),
    new rawDataEntry('Kod pocztowy', user.PostalCode, 'text', { name: 'pattern', value: '[0-9]{2}-[0-9]{3}' })
  ]
  return (
    <Grid templateColumns={['1fr', '5fr 1fr']}>
      <VStack as='main' templateColumns={['1fr', null, 'repeat(3, 1fr)']}>
        <Grid
          gap={5}
          templateColumns={['1fr', null, 'repeat(3, 1fr)']}>
          <UserDataControl headingText='Dane osobowe: ' data={personalData} />
          <UserDataControl headingText='Dane kontaktowe: ' data={contactData} editable />
          <UserDataControl headingText='Dane adresowe: ' data={addressData} editable />
        </Grid>
      </VStack>
    </Grid>
  )
}