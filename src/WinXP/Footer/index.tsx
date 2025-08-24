import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import type { IAppState } from '../apps/default-app-state';
import Balloon from '../../components/Balloon';
import startButton from '../../assets/windowsIcons/start.png';
import sound from '../../assets/windowsIcons/690(16x16).png';
import usb from '../../assets/windowsIcons/394(16x16).png';
import risk from '../../assets/windowsIcons/229(16x16).png';

import FooterMenu from './FooterMenu';
import styles from './styles.module.scss';

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let hourPostFix = 'AM';
  let min: number | string = date.getMinutes();
  if (hour >= 12) {
    hour -= 12;
    hourPostFix = 'PM';
  }
  if (hour === 0) {
    hour = 12;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return `${hour}:${min} ${hourPostFix}`;
};

interface IFooterProps {
  onMouseDownApp: any,
  apps: IAppState[],
  focusedAppId: number,
  onMouseDown: any,
  onClickMenuItem: (name?: string) => void,
};

const Footer: React.FC<IFooterProps> = ({
  onMouseDownApp,
  apps,
  focusedAppId,
  onMouseDown,
  onClickMenuItem,
}) => {
  const [time, setTime] = useState(getTime);
  const [menuOn, setMenuOn] = useState(false);
  const menu = useRef<any>(null);
  function toggleMenu() {
    setMenuOn(on => !on);
  }
  function _onMouseDown(e: any) {
    if (e.target.closest(`.${styles['footer__window']}`)) return;
    onMouseDown();
  }
  function _onClickMenuItem(name?: string) {
    onClickMenuItem(name);
    setMenuOn(false);
  }
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTime();
      newTime !== time && setTime(newTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);
  useEffect(() => {
    const target = menu.current;
    if (!target) return;
    function onMouseDown(e: any) {
      if (!target.contains(e.target) && menuOn) setMenuOn(false);
    }
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [menuOn]);

  return (
    <footer className={styles.root}
      onMouseDown={_onMouseDown}>
      <div className={clsx(
        styles["footer__items"],
        styles["left"],
      )}>
        <div ref={menu} className={styles["footer__start__menu"]}>
          {menuOn && <FooterMenu onClick={_onClickMenuItem} />}
        </div>
        <img
          src={startButton}
          alt="start"
          className={styles["footer__start"]}
          onMouseDown={toggleMenu}
        />
        {[...apps].map(
          app =>
            !app.header.noFooterWindow && (
              <FooterWindow
                key={app.id}
                id={app.id}
                icon={app.header.icon}
                title={app.header.title}
                onMouseDown={onMouseDownApp}
                isFocus={focusedAppId === app.id}
              />
            ),
        )}
      </div>

      <div className={clsx(
        styles["footer__items"],
        styles["right"],
      )}>
        <img className={styles["footer__icon"]} src={sound} alt="" />
        <img className={styles["footer__icon"]} src={usb} alt="" />
        <img className={styles["footer__icon"]} src={risk} alt="" />
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          <Balloon />
        </div>
        <div className={styles["footer__time"]}>{time}</div>
      </div>
    </footer>
  );
}

interface IFooterWindowProps {
  id: any,
  icon: any,
  title: any,
  onMouseDown: any,
  isFocus: boolean
};

const FooterWindow: React.FC<IFooterWindowProps> = ({ id, icon, title, onMouseDown, isFocus }) => {
  function _onMouseDown() {
    onMouseDown(id);
  }
  return (
    <div
      onMouseDown={_onMouseDown}
      className={clsx(
        styles['footer__window'],
        isFocus ? styles['focus'] : styles['cover'],
      )}
    >
      <img className={styles["footer__icon"]} src={icon} alt={title} />
      <div className={styles["footer__text"]}>{title}</div>
    </div>
  );
}
export default Footer;
