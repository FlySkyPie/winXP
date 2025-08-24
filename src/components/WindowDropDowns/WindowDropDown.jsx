import React, { useState } from 'react';
import clsx from 'clsx';

import iePaper from '../../assets/windowsIcons/ie-paper.png';
import ieBook from '../../assets/windowsIcons/ie-book.png';
import check from '../../assets/windowsIcons/checked.png';
import folder from '../../assets/windowsIcons/folder.png';
import styles from './window-drop-down.styles.module.scss';

export function WindowDropDown({ items, position = {}, onClick }) {
  const [option, setOption] = useState('');
  return (
    <div
      className={styles.root}
      style={{
        left: position.left,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <div className={styles["drop-down__menu"]}>
        {items.map((item, index) => {
          switch (item.type) {
            case 'item':
              return (
                <div
                  key={item.text}
                  className={clsx(
                    !item.disable && styles['drop-down__row'],
                    item.disable && styles['drop-down__row--disable'],
                  )}
                  onMouseEnter={() => setOption(item.text)}
                  onClick={() => onClick(item.text)}
                >
                  <div className={styles["drop-down__check"]}>
                    <RowSymbol type={item.symbol} />
                  </div>
                  <div className={styles["drop-down__text"]}>{item.text}</div>
                  <span className={styles["drop-down__hot-key"]}>
                    {item.hotkey || ''}
                  </span>
                  <div className={styles["drop-down__arrow--disable"]} />
                </div>
              );
            case 'menu':
              return (
                <div
                  key={item.text}
                  className={clsx(
                    option !== item.text && styles['drop-down__row'],
                    option === item.text && styles['drop-down__row--active'],
                  )}
                  onMouseEnter={() => setOption(item.text)}
                >
                  <div className={styles["drop-down__check"]}>
                    <RowSymbol type={item.symbol} />
                  </div>
                  <div className={styles["drop-down__text"]}>{item.text}</div>
                  <span className={styles["drop-down__hot-key"]}>
                    {item.hotkey || ''}
                  </span>
                  <div className={styles["drop-down__arrow"]} />
                  <div style={{ position: 'relative' }}>
                    {option === item.text && (
                      <WindowDropDown
                        position={item.position}
                        items={item.items}
                        onClick={onClick}
                      />
                    )}
                  </div>
                </div>
              );
            case 'separator':
              return <div key={index} className={styles["drop-down__separator"]} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

function RowSymbol({ type }) {
  switch (type) {
    case 'ie-paper':
      return <img className={styles["drop-down__icon"]} src={iePaper} alt="" />;
    case 'ie-book':
      return <img className={styles["drop-down__icon"]} src={ieBook} alt="" />;
    case 'folder':
      return <img className={styles["drop-down__icon"]} src={folder} alt="" />;
    case 'check':
      return <img src={check} alt="" />;
    case 'circle':
      return (
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#000',
          }}
        />
      );
    default:
      return null;
  }
}

export default WindowDropDown;
