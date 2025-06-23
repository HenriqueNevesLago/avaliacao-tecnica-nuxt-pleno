export interface PersonalData {
  name: string
  email: string
  phone: string
}

export interface AddressData {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipcode: string
}

export interface PreferencesData {
  color: string
}

export interface FormData {
  personal: PersonalData
  address: AddressData
  preferences: PreferencesData
}
