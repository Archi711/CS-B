import React from 'react'
import {
  Button,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text
}
  from '@chakra-ui/react'
export default function ModalPopup(props) {
  if (props.variant === 'error') return <ErrorModal {...props}></ErrorModal>
}

export const ErrorModal = ({ title, message, ...props }) =>
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader backgroundColor='red.500' textColor='white'>{title}</ModalHeader>
      <ModalBody>
        <Text
          borderRadius='sm'
          fontSize='larger'
          p='1'
        >{message.heading}</Text>
        <Text p='1' textColor='gray.500'>{message.description}</Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='red' width='full' onClick={props.onClose}>
          Zamknij
          </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
