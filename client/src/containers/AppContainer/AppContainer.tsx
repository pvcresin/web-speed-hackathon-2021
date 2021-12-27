import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

import { NotFoundContainer } from '../NotFoundContainer';

const AuthModalContainer = loadable(
  () => import(/* webpackPrefetch: true, webpackChunkName: "AuthModalContainer" */ '../AuthModalContainer'),
);
const NewPostModalContainer = loadable(
  () => import(/* webpackPrefetch: true, webpackChunkName: "NewPostModalContainer" */ '../NewPostModalContainer'),
);
const PostContainer = loadable(
  () => import(/* webpackPrefetch: true, webpackChunkName: "PostContainer" */ '../PostContainer'),
);
const TermContainer = loadable(
  () => import(/* webpackPrefetch: true, webpackChunkName: "TermContainer" */ '../TermContainer'),
);
const TimelineContainer = loadable(
  () => import(/* webpackPrefetch: true, webpackChunkName: "TimelineContainer" */ '../TimelineContainer'),
);
const UserProfileContainer = loadable(
  () => import(/* webpackPrefetch: true, webpackChunkName: "UserProfileContainer" */ '../UserProfileContainer'),
);

const AppContainer: React.VFC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState<Models.User | null>(null);
  const { data, isLoading } = useFetch<Models.User | null>('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  React.useEffect(() => {
    if (isLoading) {
      document.title = '読込中 - CAwitter';
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={<TimelineContainer />} path="/" />
          <Route element={<UserProfileContainer />} path="/users/:username" />
          <Route element={<PostContainer />} path="/posts/:postId" />
          <Route element={<TermContainer />} path="/terms" />
          <Route element={<NotFoundContainer />} path="*" />
        </Routes>
      </AppPage>
      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

export { AppContainer };
