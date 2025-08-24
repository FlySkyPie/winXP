import React from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { PowerState as POWER_STATE } from '../../WinXP/constants/power-state';
import windowsLogo from '../../assets/windowsIcons/windows-off.png';
import off from '../../assets/windowsIcons/310(32x32).png';
import lock from '../../assets/windowsIcons/546(32x32).png';
import restart from '../../assets/windowsIcons/restart.ico';
import switcher from '../../assets/windowsIcons/290.png';
import styles from './styles.module.scss';

function Modal(props) {
  return createPortal(
    <Container>
      <Menu {...props} />
    </Container>,
    document.body,
  );
}

const Container = ({ className, children }) => {
  function noop(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <div
      className={clsx(
        styles.root,
        className,
      )}
      onMouseMove={noop}
      onClick={noop}
      onMouseDown={noop}
      onMouseUp={noop}
    >
      {children}
    </div>
  );
};
const Menu = ({ mode, onClose, onClickButton }) => {
  function renderButtons() {
    if (mode === POWER_STATE.TURN_OFF) {
      return (
        <>
          <ButtonDisabled img={off} text="Stand By" />
          <Button img={off} text="Turn Off" onClick={onClickButton} />
          <Button
            style={{ margin: '-3px 0 0px 0', width: '33px', height: '33px' }}
            img={restart}
            text="Restart"
            onClick={onClickButton}
          />
        </>
      );
    }
    return (
      <>
        <Button
          img={switcher}
          text="Switch User"
          style={{ border: '1px solid #fff', borderRadius: '3px' }}
          onClick={onClickButton}
        />
        <Button img={lock} text="Log Off" onClick={onClickButton} />
      </>
    );
  }
  return (
    <div className={styles["modal"]}>
      <header className={styles["header"]}>
        <span className={styles["header__text"]}>Log Off Windows</span>
        <img src={windowsLogo} alt="" className={styles["header__img"]} />
      </header>
      <div className={styles["content"]}>{renderButtons()}</div>
      <footer className={styles["footer"]}>
        <button onClick={onClose} className={styles["footer__button"]}>
          Cancel
        </button>
      </footer>
    </div>
  );
};
const Button = ({ style, img, text, onClick }) => {
  function _onClick() {
    onClick(text);
  }
  return (
    <div className={styles["button-container"]}>
      <img
        onClick={_onClick}
        style={{ ...style }}
        src={img}
        alt={text}
        className={styles["button-img"]}
      />
      <span className={styles["button-text"]}>{text}</span>
    </div>
  );
};
const ButtonDisabled = ({ img, text }) => (
  <div className={clsx(
    styles["button-container"],
    styles["disable"],
  )}>
    <img src={img} alt={text} className={styles["button-img"]} />
    <span className={styles["button-text"]}>{text}</span>
  </div>
);

export default Modal;
