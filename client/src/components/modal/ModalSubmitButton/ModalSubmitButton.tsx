import classNames from 'classnames';
import React from 'react';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

const ModalSubmitButton: React.VFC<{
  children: string;
  disabled: boolean;
  loading: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, disabled, loading, onClick }) => {
  return (
    <button
      className={classNames('block px-8 py-2 text-white bg-green-600 rounded', {
        'opacity-50 cursor-not-allowed': disabled,
      })}
      disabled={disabled}
      onClick={onClick}
      type="submit"
    >
      {loading ? (
        <span className="pr-2">
          <span className="inline-block animate-spin">
            <FontAwesomeIcon iconType="circle-notch" styleType="solid" />
          </span>
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export { ModalSubmitButton };
