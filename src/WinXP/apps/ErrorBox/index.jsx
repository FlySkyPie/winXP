import React, { useEffect } from 'react';

import errorSoundSrc from '../../../assets/sounds/error.wav';
import error from '../../../assets/windowsIcons/897(32x32).png';
import styles from './styles.module.scss';

function lineBreak(str) {
  return str.split('\n').map((s, i) => (
    <p key={i} className={styles["error__message"]}>
      {s}
    </p>
  ));
}

function Error({ onClose, message = "Something's wrong!" }) {
  useEffect(() => {
    try {
      new Audio(errorSoundSrc).play();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles["error__top"]}>
        <img src={error} alt="error" className={styles["error__img"]} />
        <div className={styles["error__messages"]}>{lineBreak(message)}</div>
      </div>
      <div className={styles["error__bottom"]}>
        <div onClick={onClose} className={styles["error__button"]}>
          <span className={styles["error__confirm"]}>OK</span>
        </div>
      </div>
    </div>
  );
}

export default Error;
