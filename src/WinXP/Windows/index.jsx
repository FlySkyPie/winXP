import React, { useRef, memo } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import clsx from 'clsx';

import { useElementResize } from '../../hooks';

import HeaderButtons from './HeaderButtons';
import styles from './styles.module.scss';

function Windows({
  apps,
  onMouseDown,
  onClose,
  onMinimize,
  onMaximize,
  focusedAppId,
}) {
  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      {apps.map(app => (
        <Window
          show={!app.minimized}
          key={app.id}
          id={app.id}
          onMouseDown={onMouseDown}
          onMouseUpClose={onClose}
          onMouseUpMinimize={onMinimize}
          onMouseUpMaximize={onMaximize}
          isFocus={focusedAppId === app.id} // for styledWindow
          {...app}
        />
      ))}
    </div>
  );
}

const Window = memo(function ({
  injectProps,
  id,
  show,
  onMouseDown,
  onMouseUpClose,
  onMouseUpMinimize,
  onMouseUpMaximize,
  header,
  defaultSize,
  defaultOffset,
  resizable,
  maximized,
  component,
  zIndex,
  isFocus,
  className,
}) {
  function _onMouseDown() {
    onMouseDown(id);
  }
  function _onMouseUpClose() {
    onMouseUpClose(id);
  }
  function _onMouseUpMinimize() {
    onMouseUpMinimize(id);
  }
  function _onMouseUpMaximize() {
    if (resizable) onMouseUpMaximize(id);
  }
  function onDoubleClickHeader(e) {
    if (e.target !== dragRef.current) return;
    _onMouseUpMaximize();
  }
  const dragRef = useRef(null);
  const ref = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { offset, size } = useElementResize(ref, {
    dragRef,
    defaultOffset,
    defaultSize,
    boundary: {
      top: 1,
      right: windowWidth - 1,
      bottom: windowHeight - 31,
      left: 1,
    },
    resizable,
    resizeThreshold: 10,
  });
  let width, height, x, y;
  if (maximized) {
    width = windowWidth + 6;
    height = windowHeight - 24;
    x = -3;
    y = -3;
  } else {
    width = size.width;
    height = size.height;
    x = offset.x;
    y = offset.y;
  }
  return (
    <div
      className={clsx(
        styles.root,
        show && styles.show,
        header.invisible && styles.header_invisible,
        isFocus && styles.isFocus,
        className)}
      ref={ref}
      onMouseDown={_onMouseDown}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        zIndex,
      }}
    >
      <div className={styles["header__bg"]} />
      <header
        className={styles["app__header"]}
        ref={dragRef}
        onDoubleClick={onDoubleClickHeader}
      >
        <img
          onDoubleClick={_onMouseUpClose}
          src={header.icon}
          alt={header.title}
          className={styles["app__header__icon"]}
          draggable={false}
        />
        <div className={styles["app__header__title"]}>{header.title}</div>
        <HeaderButtons
          buttons={header.buttons}
          onMaximize={_onMouseUpMaximize}
          onMinimize={_onMouseUpMinimize}
          onClose={_onMouseUpClose}
          maximized={maximized}
          resizable={resizable}
          isFocus={isFocus}
        />
      </header>
      <div className={styles["app__content"]}>
        {component({
          onClose: _onMouseUpClose,
          onMinimize: _onMouseUpMinimize,
          isFocus,
          ...injectProps,
        })}
      </div>
    </div>
  );
});
export default Windows;
