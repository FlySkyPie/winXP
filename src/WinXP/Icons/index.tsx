import type { State } from 'react-use/lib/useMouse';
import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import type { IIconState } from '../apps/default-icon-state';

import styles from './styles.module.scss'

interface IRect {
  id: number,
  x: number,
  y: number,
  w: number,
  h: number
}

interface IIconsProps {
  icons: IIconState[],
  onMouseDown: (id: any) => void,
  onDoubleClick: (component: any) => void,
  displayFocus: boolean,
  mouse: State,
  selecting: null | {
    x: number;
    y: number;
  },
  setSelectedIcons: (iconIds: any) => void,
};

const Icons: React.FC<IIconsProps> = ({
  icons,
  onMouseDown,
  onDoubleClick,
  displayFocus,
  mouse,
  selecting,
  setSelectedIcons,
}) => {
  const [iconsRect, setIconsRect] = useState<any[]>([]);
  function measure(rect: IRect) {
    if (iconsRect.find(r => r.id === rect.id)) return;
    setIconsRect((iconsRect: any) => [...iconsRect, rect]);
  }
  useEffect(() => {
    if (!selecting) return;
    const sx = Math.min(selecting.x, mouse.docX);
    const sy = Math.min(selecting.y, mouse.docY);
    const sw = Math.abs(selecting.x - mouse.docX);
    const sh = Math.abs(selecting.y - mouse.docY);
    const selectedIds = iconsRect
      .filter(rect => {
        const { x, y, w, h } = rect;
        return x - sx < sw && sx - x < w && y - sy < sh && sy - y < h;
      })
      .map(icon => icon.id);
    setSelectedIcons(selectedIds);
  }, [iconsRect, setSelectedIcons, selecting, mouse.docX, mouse.docY]);
  return (
    <div className={styles.root}>
      {icons.map((icon) => (
        <Icon
          key={icon.id}
          {...icon}
          className={clsx(
            styles.icon,
            icon.isFocus && displayFocus && styles['displayFocus'],
          )}
          onMouseDown={onMouseDown}
          onDoubleClick={onDoubleClick}
          measure={measure}
        />
      ))}
    </div>
  );
}

interface IIconProps extends IIconState {
  id: number;
  icon: string;
  title: string;
  component: React.FC<any>;
  isFocus: boolean;
  onMouseDown: (id: number) => void,
  onDoubleClick: (component: React.FC<any>) => void,
  className?: string,
  measure: (rect: IRect) => void,
};

const Icon: React.FC<IIconProps> = ({
  title,
  onMouseDown,
  onDoubleClick,
  icon,
  className,
  id,
  component,
  measure,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  function _onMouseDown() {
    onMouseDown(id);
  }
  function _onDoubleClick() {
    onDoubleClick(component);
  }
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const { left, top, width, height } = target.getBoundingClientRect();
    const posX = left + window.scrollX;
    const posY = top + window.scrollY;
    measure({ id, x: posX, y: posY, w: width, h: height });
  }, [id, measure]);
  return (
    <div
      className={clsx(
        className,
      )}
      onMouseDown={_onMouseDown}
      onDoubleClick={_onDoubleClick}
      ref={ref}
    >
      <div className={styles[`icon__img__container`]}>
        <img src={icon} alt={title} className={styles[`icon__img`]} />
      </div>
      <div className={styles[`icon__text__container`]}>
        <div className={styles[`icon__text`]}>{title}</div>
      </div>
    </div>
  );
}

export default Icons;
