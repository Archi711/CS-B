import React from 'react';
import ModalPopup from './ModalPopup';
import { ERROR_CODES_MESSAGES } from '../utils/errorMaker';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../features/userSlice';
export default function NetworkErrorPopup({ error }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.accessToken);
  if (error) dispatch(resetUser(token));
  return error ? (
    <>
      <ModalPopup
        variant="error"
        heading={'Wystąpił błąd!'}
        error={ERROR_CODES_MESSAGES[error.originalStatus]}
      />
      <Redirect to="/" />
    </>
  ) : null;
}
