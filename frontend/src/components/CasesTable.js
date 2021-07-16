import React, { useState } from 'react'
import { Table, Tbody, Thead, Tr, Th } from '@chakra-ui/table'
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import Case from '../components/Case'
import ModalPopup from '../common/ModalPopup'

export default function CasesTable(props) {
  const cases = props.cases
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [activeCase, setActiveCase] = useState(null)
  const headings = [
    'status', 'numer sprawy', 'data wysłania', 'opis sprawy', 'odpowiedź', 'data zamknięcia'
  ]
  const caseDetailsHandler = caseData => {
    if (caseData && JSON.stringify(activeCase) !== JSON.stringify(caseData)) {
      setActiveCase(caseData)
    }
    onOpen()
  }
  const showAllRows = useBreakpointValue({ base: false, lg: true })
  const CaseDetails = <ModalPopup
    headings={headings}
    variant='case'
    cltCase={activeCase}
    onClose={onClose}
    isOpen={isOpen}
  />
  return (
    <>
      <Table maxWidth='full'>
        <Thead>
          <Tr>
            {headings.map((h, i) => showAllRows || i < 2 ? <Th key={h}>{h}</Th> : null)}
          </Tr>
        </Thead>
        <Tbody>
          {
            cases?.map(cltCase =>
              <Case
                allRows={showAllRows}
                showCase={caseDetailsHandler}
                cltCase={cltCase}
                key={cltCase.CaseNumber} />
            )
          }
        </Tbody>
      </Table>
      {
        activeCase ? CaseDetails : null
      }
    </>
  )
}