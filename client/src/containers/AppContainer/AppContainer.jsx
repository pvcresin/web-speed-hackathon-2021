import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

import { NotFoundContainer } from '../NotFoundContainer';

const AuthModalContainer = React.lazy(() => import(/* webpackPrefetch: true */ '../AuthModalContainer'));
const NewPostModalContainer = React.lazy(() => import(/* webpackPrefetch: true */ '../NewPostModalContainer'));
const PostContainer = React.lazy(() => import(/* webpackPrefetch: true */ '../PostContainer'));
const TermContainer = React.lazy(() => import(/* webpackPrefetch: true */ '../TermContainer'));
const TimelineContainer = React.lazy(() => import(/* webpackPrefetch: true */ '../TimelineContainer'));
const UserProfileContainer = React.lazy(() => import(/* webpackPrefetch: true */ '../UserProfileContainer'));

const Loadable = ({ children }) => <React.Suspense fallback={null}>{children}</React.Suspense>;

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
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
          <Route
            element={
              <Loadable>
                <TimelineContainer />
              </Loadable>
            }
            path="/"
          />
          <Route
            element={
              <Loadable>
                <UserProfileContainer />
              </Loadable>
            }
            path="/users/:username"
          />
          <Route
            element={
              <Loadable>
                <PostContainer />
              </Loadable>
            }
            path="/posts/:postId"
          />
          <Route
            element={
              <Loadable>
                <TermContainer />
              </Loadable>
            }
            path="/terms"
          />
          <Route element={<NotFoundContainer />} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' ? (
        <Loadable>
          <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
        </Loadable>
      ) : null}
      {modalType === 'post' ? (
        <Loadable>
          <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} />
        </Loadable>
      ) : null}
    </>
  );
};

export { AppContainer };
