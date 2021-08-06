import React from 'react'
import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Flex, Box, Divider
}
  from '@chakra-ui/react'
export default function ModalPopup(props) {
  if (props.variant === 'error') return <ErrorModal {...props}></ErrorModal>
  if (props.variant === 'case') return <CaseModal {...props}></CaseModal>
}

export const ErrorModal = ({ title, error, ...props }) => (
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader backgroundColor="red.500" textColor="white">
        {title}
      </ModalHeader>
      <ModalBody>
        <Text borderRadius="sm" fontSize="larger" p="1">
          {error.message}
        </Text>
        <Text p="1" textColor="gray.500">
          {error.description}
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="red" width="full" onClick={props.onClose}>
          Zamknij
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export const CaseModal = props => {
  const cltCase = [
    props.cltCase.Status,
    props.cltCase.CaseNumber,
    new Date(props.cltCase.SendDate).toLocaleDateString('pl'),
    props.cltCase.Description,
    props.cltCase.Answer,
    props.cltCase.ClosingDate
      ? new Date(props.cltCase.ClosingDate).toLocaleDateString('pl')
      : '',
  ];
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sprawa nr: {props.cltCase.CaseNumber}</ModalHeader>
        <ModalBody>
          {props.headings.map((text, idx) => (
            <CaseDetail
              heading={text}
              key={text.concat('key')}
              data={cltCase[idx]}
              fallback="nie udzielono"
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" width="full" onClick={props.onClose}>
            Zamknij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const CaseDetail = props => (
  <>
    <Flex flexDir="column" p={3}>
      <Box fontWeight="bold">{props.heading}:</Box>
      <Box paddingLeft={2}>{props.data || props.fallback}</Box>
    </Flex>
    <Divider />
  </>
);
