import axios from 'axios'
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms'
import { tokenSessionState } from '../recoil/selectors'

export default function GuardedRoute({ Component, ComponentElse, ...rest }) {
  const tokens = useRecoilValue(tokenSessionState)
  const [user, setUser] = useRecoilState(userState)
  console.log("guarding:", user, tokens)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(`http://${process.env.REACT_APP_API_ADDRESS}/relogin`, { token: tokens.accessToken })
        setUser(response.data)
      }
      catch (e) {
        console.log("error reloggin user", e)
      }
    }
    if (tokens?.accessToken && !user) {
      getUser()
    }

  }, [user, setUser, tokens])

  return <Route {...rest} render={props => user !== null ? <Component /> : <ComponentElse />} />
}