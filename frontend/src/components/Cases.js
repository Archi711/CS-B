import { Spinner, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useFetch from '../hooks/useFetch'
import { tokenSessionState } from '../recoil/selectors'

export default function Cases() {
  const { accessToken } = useRecoilValue(tokenSessionState)
  const { state, setBody } = useFetch('/cases', 'get', { token: accessToken })
  const { status, data } = state
  const [cases, setCases] = useState([])
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(cases)) {
      setCases(data)
    }
  }, [data, setCases, cases])

  useEffect(() => { setBody(1) }, [setBody])


  return status === 'loading' ? <Spinner size='lg' /> :
    <VStack>
      cases
      {
        cases?.map(cltCase => <div key={cltCase.CaseNumber}>{cltCase.CaseNumber}</div>)
      }
    </VStack>
}