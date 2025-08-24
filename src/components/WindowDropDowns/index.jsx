import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import WindowDropDown from './WindowDropDown';
import styles from './styles.module.scss';

export function WindowDropDowns({
  items,
  onClickItem,
  className,
  height = 20,
}) {
  const dropDown = useRef(null);
  const [openOption, setOpenOption] = useState('');
  function hoverOption(option) {
    if (openOption) setOpenOption(option);
  }
  function _onClickItem(name) {
    setOpenOption('');
    onClickItem(name);
  }
  function onMouseUp(e) {
    if (!dropDown.current.contains(e.target)) setOpenOption('');
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return (
    <div
      ref={dropDown}
      className={clsx(styles.root, className)}
      style={{
        height: height && `${height}px`,
        lineHeight: height && `${height}px`,
      }}>
      {Object.keys(items).map(name => (
        <div className={styles["drop-down"]} key={name}>
          <div
            key={name}
            onMouseDown={() => {
              setOpenOption(name);
            }}
            onMouseEnter={() => hoverOption(name)}
            className={clsx(
              styles["drop-down__label"],
              openOption === name && styles['drop-down__label--active'],
            )}
          >
            {name}
          </div>
          {openOption === name && (
            <WindowDropDown
              onClick={_onClickItem}
              items={items[name]}
              position={{ top: `${height}px`, left: '0' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default WindowDropDowns;
