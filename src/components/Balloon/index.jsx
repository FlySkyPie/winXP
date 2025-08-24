import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import risk from '../../assets/windowsIcons/229(16x16).png';

import styles from './styles.module.scss';

function Balloon({ startAfter = 3000, duration = 15000 }) {
  const [show, setShow] = useState(true);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const openTimer = setTimeout(() => setStart(true), startAfter);
    const fadeTimer = setTimeout(() => setShow(false), startAfter + duration);
    const closeTimer = setTimeout(
      () => setStart(false),
      startAfter + duration + 1000,
    );
    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [startAfter, duration]);
  return (
    start && (
      <div className={clsx(styles.root, show && styles.show)}>
        <div className={styles["balloon__container"]}>
          <button onClick={() => setShow(false)} className={styles["balloon__close"]} />
          <div className={styles["balloon__header"]}>
            <img className={styles["balloon__header__img"]} src={risk} alt="risk" />
            <span className={styles["balloon__header__text"]}>
              Your computer might be at risk
            </span>
          </div>
          <p className={styles["balloon__text__first"]}>
            Antivirus software might not be installed
          </p>
          <p className={styles["balloon__text__second"]}>
            Click this balloon to fix this problem.
          </p>
        </div>
      </div>
    )
  );
}

export default Balloon;
