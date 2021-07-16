import { Badge, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { Td, Tr } from '@chakra-ui/table'
import React from 'react'



export default function Case(props) {
  let { Answer, CaseNumber, ClosingDate, Description, SendDate, Status } =
    props.cltCase;
  SendDate = +SendDate;
  ClosingDate = +ClosingDate;
  const hoverColor = useColorModeValue('gray.100', 'gray.700');

  const clickHandler = e => {
    props.showCase(props.cltCase);
  };

  return (
    <>
      <Tr
        cursor="pointer"
        onClick={clickHandler}
        _hover={{ backgroundColor: hoverColor }}
      >
        <Td>
          <Badge>{Status}</Badge>
        </Td>
        <Td>
          <Text>{CaseNumber}</Text>
        </Td>
        {props.allRows ? (
          <>
            {' '}
            <Td>
              <Text as="time" dateTime={new Date(SendDate).toISOString()}>
                {new Date(SendDate).toLocaleDateString()}
              </Text>
            </Td>
            <Td>
              <Text isTruncated>{Description}</Text>
            </Td>
            {ClosingDate ? (
              <>
                <Td>
                  <Text
                    as="time"
                    dateTime={new Date(ClosingDate).toISOString()}
                  >
                    {new Date(ClosingDate).toLocaleDateString()}
                  </Text>
                </Td>
                <Td>
                  <Text isTruncated>{Answer}</Text>
                </Td>
              </>
            ) : (
              <Td colSpan="2" textAlign="center">
                sprawa w realizacji
              </Td>
            )}
          </>
        ) : null}
      </Tr>
    </>
  );
}
