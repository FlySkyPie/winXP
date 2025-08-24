import { useState } from 'react';
import clsx from 'clsx';

import styles from './stylees.module.scss';

interface ISubMenuProps {
  className?: string,
  data: any[],
  style?: React.CSSProperties,
  bottom?: string | number;
  left?: string | number;
  onClick: any;
};

const SubMenu: React.FC<ISubMenuProps> = ({
  className,
  data,
  bottom,
  left,
  style,
  onClick }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  return (
    <div
      className={clsx(styles.root, className)}
      style={{ bottom, left, ...style }}     >
      {data.map((item, index) => (
        <SubMenuItem
          onClick={onClick}
          onHover={setHoverIndex}
          key={index}
          hover={hoverIndex === index}
          item={item}
          index={index}
          className={className}
        />
      ))}
    </div>
  );
}

interface ISubMenuItemProps {
  index: any,
  item: any,
  className?: string,
  hover: any,
  onHover: any,
  onClick: any
};

const SubMenuItem: React.FC<ISubMenuItemProps> = ({ index, item, className, hover, onHover, onClick }) => {
  function _onMouseOver() {
    onHover(index);
  }
  function _onClick() {
    onClick(item.text);
  }
  switch (item.type) {
    case 'item':
      return (
        <div
          onClick={_onClick}
          onMouseEnter={_onMouseOver}
          className={styles[`root-item`]}
        >
          <img className={styles[`root-img`]} src={item.icon} alt="" />
          <div className={styles[`root-text`]}>{item.text}</div>
        </div>
      );
    case 'separator':
      return <div className={`${className}-separator`} />;
    case 'menu':
      return (
        <div
          onMouseEnter={_onMouseOver}
          className={
            clsx(
              styles['root-item'],
              hover && styles['hover'],
            )
          }
        >
          <img className={styles['root-img']} src={item.icon} alt="" />
          <div className={styles["root-text"]}>{item.text}</div>
          <div className={styles['root-arrow']}>
            {hover && (
              <SubMenu
                data={item.items}
                bottom={item.bottom}
                onClick={onClick}
              />
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default SubMenu;
