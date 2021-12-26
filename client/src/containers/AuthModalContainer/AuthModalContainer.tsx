import React from 'react';

import { AuthModalPage } from '../../components/auth_modal/AuthModalPage';
import { Modal } from '../../components/modal/Modal';
import { sendJSON } from '../../utils/fetchers';

const AuthModalContainer: React.VFC<{
  onRequestCloseModal: () => void;
  onUpdateActiveUser: (user: Models.User | null) => void;
}> = ({ onRequestCloseModal, onUpdateActiveUser }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResetError = React.useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = React.useCallback(
    async ({ type, ...params }) => {
      try {
        setIsLoading(true);
        if (type === 'signin') {
          const user = await sendJSON<Models.User>('/api/v1/signin', params);
          onUpdateActiveUser(user);
        } else if (type === 'signup') {
          const user = await sendJSON<Models.User>('/api/v1/signup', params);
          onUpdateActiveUser(user);
        }
        onRequestCloseModal();
      } catch (_err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onRequestCloseModal, onUpdateActiveUser],
  );

  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <AuthModalPage
        hasError={hasError}
        isLoading={isLoading}
        onRequestCloseModal={onRequestCloseModal}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { AuthModalContainer };
