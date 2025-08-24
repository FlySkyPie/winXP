import React from 'react';
import clsx from 'clsx';

import styles from './header-button.styles.module.scss';

function HeaderButtons({
  buttons,
  isFocus,
  onMaximize,
  onMinimize,
  onClose,
  maximized,
  resizable,
  className,
}) {
  const buttonElements = {
    minimize: (
      <button
        key="minimize"
        className={clsx(
          styles["header__button"],
          styles["header__button--minimize"],
        )}
        onMouseUp={onMinimize}
      />
    ),
    maximize: (
      <button
        key="maximize"
        className={clsx(
          styles['header__button'],
          maximized ?
            styles['header__button--maximized'] :
            styles['header__button--maximize'],
          !resizable && styles['header__button--disable'],
        )}
        onMouseUp={onMaximize}
      />
    ),
    close: (
      <button
        key="button"
        className={clsx(
          styles["header__button"],
          styles["header__button--close"],
        )}
        onMouseUp={onClose}
      />
    ),
  };

  return (
    <div className={clsx(
      styles.root,
      isFocus && styles.isFocus,
      className,)}>
      {buttons ? (
        buttons.map(b => buttonElements[b])
      ) : (
        <>
          {buttonElements.minimize}
          {buttonElements.maximize}
          {buttonElements.close}
        </>
      )}
    </div>
  );
}

export default HeaderButtons;