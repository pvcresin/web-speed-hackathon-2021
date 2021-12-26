import React from 'react';
import { Link } from 'react-router-dom';

import { ModalErrorMessage } from '../../modal/ModalErrorMessage';
import { ModalSubmitButton } from '../../modal/ModalSubmitButton';
import { AuthInput } from '../AuthInput';

type SubmitParams = {
  name: string;
  password: string;
  type: 'signin' | 'signup';
  username: string;
};

const AuthModalPage: React.VFC<{
  hasError: boolean;
  isLoading: boolean;
  onRequestCloseModal: () => void;
  onResetError: () => void;
  onSubmit: (params: SubmitParams) => void;
}> = ({ hasError, isLoading, onRequestCloseModal, onResetError, onSubmit }) => {
  const [params, setParams] = React.useState<SubmitParams>({
    name: '',
    password: '',
    type: 'signin',
    username: '',
  });

  const handleToggleType = React.useCallback(() => {
    onResetError();
    setParams((params) => ({
      ...params,
      type: params.type === 'signin' ? 'signup' : 'signin',
    }));
  }, [onResetError]);

  const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      username: value,
    }));
  }, []);

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      name: value,
    }));
  }, []);

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      password: value,
    }));
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (ev) => {
      ev.preventDefault();
      onResetError();
      onSubmit(params);
    },
    [params, onSubmit, onResetError],
  );

  const isFilled =
    params.username !== '' && params.password !== '' && (params.type === 'signup' ? params.name !== '' : true);

  return (
    <section>
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">{params.type === 'signin' ? 'サインイン' : '新規登録'}</h2>
        <p className="mt-4">
          <button className="text-green-600 underline" onClick={handleToggleType} type="button">
            {params.type === 'signin' ? '初めての方はこちら' : 'サインインはこちら'}
          </button>
        </p>
        <div className="mt-8">
          <AuthInput label="ユーザー名" onChange={handleChangeUsername} type="text" />
        </div>
        {params.type === 'signup' ? (
          <div className="mt-4">
            <AuthInput label="名前" onChange={handleChangeName} type="text" />
          </div>
        ) : null}
        <div className="mt-4">
          <AuthInput
            autoComplete={params.type === 'signup' ? 'new-password' : 'current-password'}
            label="パスワード"
            onChange={handleChangePassword}
            type="password"
          />
        </div>
        {params.type === 'signup' ? (
          <p className="mt-4">
            <Link className="text-green-600 underline" onClick={onRequestCloseModal} to="/terms">
              利用規約
            </Link>
            に同意して
          </p>
        ) : null}
        <p className="mt-4">
          <ModalSubmitButton disabled={isLoading || !isFilled} loading={isLoading}>
            {params.type === 'signin' ? 'サインイン' : '登録する'}
          </ModalSubmitButton>
        </p>
        <p className="mt-4">
          <ModalErrorMessage>
            {hasError ? (params.type === 'signin' ? 'パスワードが異なります' : 'ユーザー名が使われています') : null}
          </ModalErrorMessage>
        </p>
      </form>
    </section>
  );
};

export { AuthModalPage };
