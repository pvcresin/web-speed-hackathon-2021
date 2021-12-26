import React from 'react';
import ReactDOM from 'react-dom';

const Modal: React.VFC<{
  children: React.ReactNode;
  onRequestCloseModal: () => void;
}> = ({ children, onRequestCloseModal }) => {
  // overflow: hidden を付与して、スクロールできないようにする
  React.useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  // inert 属性を #app に付与して、アプリケーションが操作できないようにする
  React.useEffect(() => {
    const app = document.getElementById('app');
    if (!app) return;
    // @ts-expect-error プロパティ 'inert' は型 'HTMLElement' に存在しません。ts(2339)
    app.inert = true;
    return () => {
      // @ts-expect-error プロパティ 'inert' は型 'HTMLElement' に存在しません。ts(2339)
      app.inert = false;
    };
  }, []);

  // Escape キーを入力すると、モーダルを閉じる
  React.useEffect(() => {
    const handler: React.KeyboardEventHandler<Document> = (ev) => {
      if (ev.key === 'Escape') {
        onRequestCloseModal();
      }
    };
    // @ts-expect-error 型 'KeyboardEventHandler<Document>' を型 'EventListener' に割り当てることはできません。ts(2769)
    document.addEventListener('keyup', handler);
    // @ts-expect-error 型 'KeyboardEventHandler<Document>' を型 'EventListener' に割り当てることはできません。ts(2769)
    return () => document.removeEventListener('keyup', handler);
  }, [onRequestCloseModal]);

  return ReactDOM.createPortal(
    <div className="fixed z-10 bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute bottom-0 left-0 right-0 top-0" onClick={onRequestCloseModal}></div>
      <div className="flex flex-col items-center justify-center px-2 w-full h-4/6">
        <div className="relative px-2 py-8 w-full max-w-md max-h-full bg-white rounded">
          <div className="relative w-full max-h-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>,
    // @ts-expect-error 型 'null' を型 'Element' に割り当てることはできません。ts(2345)
    document.getElementById('modal'),
  );
};

export { Modal };
