import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../recoil/atoms'

export default function Dashboard(props) {
  const user = useRecoilValue(userState)
  return (
    <div>Hello {user.FirstName}</div>
  )
}