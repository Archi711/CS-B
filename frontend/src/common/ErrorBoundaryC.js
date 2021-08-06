import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms';
import { tokenSessionState } from '../recoil/selectors';
import ModalPopup from './ModalPopup';

const ErrorModal = ({ error, resetErrorBoundary }) => {
  const [isOpen, setOpen] = React.useState(true);
  const onClose = () => {
    resetErrorBoundary(error);
    setOpen(false);
  };
  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Wystąpił błąd"
      variant="error"
      error={error}
    />
  );
};

export default function ErrorBoundaryC({ children }) {
  const [, setUser] = useRecoilState(userState);
  const [, setTokens] = useRecoilState(tokenSessionState);
  const history = useHistory();

  const resetHandler = error => {
    console.dir(error);
    switch (error.code) {
      case (401, 403):
        setUser(null);
        setTokens(null);
        history.replace('/');
        break;
      default:
        break;
    }
  };
  return (
    <ErrorBoundary onReset={resetHandler} FallbackComponent={ErrorModal}>
      {children}
    </ErrorBoundary>
  );
}
