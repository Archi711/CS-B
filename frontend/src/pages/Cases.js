import { Center, Spinner, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { Table, Tbody, Thead, Tr, Th } from '@chakra-ui/table'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useHistory } from 'react-router-dom'
import Case from '../components/Case'
import useFetch from '../hooks/useFetch'
import { tokenSessionState } from '../recoil/selectors'
import ModalPopup from '../common/ModalPopup'

export default function Cases() {
  const { accessToken } = useRecoilValue(tokenSessionState)
  const { state, setBody } = useFetch('/cases', 'get', { token: accessToken })
  const { onClose, onOpen, isOpen } = useDisclosure()
  const { status, data, error } = state
  const [cases, setCases] = useState([])
  const [activeCase, setActiveCase] = useState(null)

  const history = useHistory()
  const rows = useBreakpointValue({
    base: false,
    lg: true
  })
  const headings = [
    'status', 'numer sprawy', 'data wysłania', 'opis sprawy', 'odpowiedź', 'data zamknięcia'
  ]

  const caseDetailsHandler = caseData => {
    if (caseData && JSON.stringify(activeCase) !== JSON.stringify(caseData)) {
      setActiveCase(caseData)
    }
    onOpen()
    console.log(activeCase)
  }

  useEffect(() => {
    if (error.heading.length) onOpen()
  }, [error, onOpen])

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(cases)) {
      setCases(data)
    }
  }, [data, setCases, cases])

  useEffect(() => { setBody(1) }, [setBody])


  return status === 'loading' ? <Center><Spinner size='lg' /></Center> :
    <>
      <Table overflowX='scroll'>
        <Thead>
          <Tr>
            {headings.map((h, i) => rows || i < 2 ? <Th key={h}>{h}</Th> : null)}
          </Tr>
        </Thead>
        <Tbody>
          {
            cases?.map(cltCase =>
              <Case
                allRows={rows}
                showCase={caseDetailsHandler}
                cltCase={cltCase}
                key={cltCase.CaseNumber} />
            )
          }
        </Tbody>
      </Table>
      {
        activeCase ? <ModalPopup
          headings={headings}
          variant='case'
          cltCase={activeCase}
          onClose={onClose}
          isOpen={isOpen}
        /> : null
      }
      {
        error.heading.length ?
          <ModalPopup
            variant='error'
            message={error}
            title='Wystąpił błąd'
            isOpen={isOpen}
            onClose={
              e => {
                history.push('/')
              }
            } /> : null
      }
    </>

}