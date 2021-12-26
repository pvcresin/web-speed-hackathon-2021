import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../../components/modal/Modal';
import { NewPostModalPage } from '../../components/new_post_modal/NewPostModalPage';
import { sendFile, sendJSON } from '../../utils/fetchers';

type Params = {
  images: Array<File>;
  movie: File;
  sound: File;
  text: string;
};

async function sendNewPost({ images, movie, sound, text }: Params) {
  const payload = {
    images: images ? await Promise.all(images.map((image) => sendFile('/api/v1/images', image))) : [],
    movie: movie ? await sendFile('/api/v1/movies', movie) : undefined,
    sound: sound ? await sendFile('/api/v1/sounds', sound) : undefined,
    text,
  };

  return sendJSON<Models.Post>('/api/v1/posts', payload);
}

const NewPostModalContainer: React.VFC<{ onRequestCloseModal: () => void }> = ({ onRequestCloseModal }) => {
  const navigate = useNavigate();

  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResetError = React.useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = React.useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        const post = await sendNewPost(params);
        if (post === null) return;
        onRequestCloseModal();
        navigate(`/posts/${post.id}`);
      } catch (_err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onRequestCloseModal, navigate],
  );

  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <NewPostModalPage
        hasError={hasError}
        isLoading={isLoading}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { NewPostModalContainer };
