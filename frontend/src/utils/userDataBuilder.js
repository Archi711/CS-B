function rawDataEntry(label, value, type, name, ...rest) {
  this.label = label
  this.value = value
  this.type = type
  this.fieldName = name
  rest.forEach(v => this[v.name] = v.value)
}

export const userDataBuider = (user) => {
  const personalData = [
    new rawDataEntry('Imię', user.FirstName, 'text', 'FirstName'),
    new rawDataEntry('Nazwisko', user.LastName, 'text', 'LastName')
  ]
  const contactData = [
    new rawDataEntry('Numer telefonu', user.PhoneNumber, 'number', 'PhoneNumber'),
    new rawDataEntry('Adres email', user.Email, 'email', 'Email')
  ]
  const addressData = [
    new rawDataEntry('Ulica', user.StreetName, 'text', 'StreetName'),
    new rawDataEntry('Numer budynku', user.BuildingNumber, 'number', 'BuildingNumber'),
    new rawDataEntry('Numer mieszkania', user.FlatNumber, 'number', 'FlatNumber'),
    new rawDataEntry('Kod pocztowy', user.PostalCode, 'text', 'PostalCode', { name: 'pattern', value: '[0-9]{2}-[0-9]{3}' })
  ]

  return {
    personalData,
    contactData,
    addressData
  }
}