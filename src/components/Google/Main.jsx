import React, { useState } from 'react';
import clsx from 'clsx';

import smile from './smile.svg';
import styles from './main-style.module.scss';

function Main({ onSearch, className }) {
  const [value, setValue] = useState('');
  function onChange(e) {
    setValue(e.target.value);
  }
  function onClick() {
    onSearch(value);
  }
  function onKeyDown(e) {
    if (e.key !== 'Enter') return;
    onSearch(value);
  }
  return (
    <div className={clsx(className, styles.root)}>
      <header>
        <div className={styles["text"]}>Gmail</div>
        <div className={styles["text"]}>Images</div>
        <img src={smile} alt="avatar" />
      </header>
      <section className={styles["content"]}>
        <img
          className={styles["logo"]}
          alt="Google"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        />
        <div className={styles["search-bar"]}>
          <input
            id="search"
            type="text"
            name="search"
            onChange={onChange}
            value={value}
            onKeyDown={onKeyDown}
          />
          <div className={styles["icon"]}>
            <img
              src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"
              alt="microphone"
            />
          </div>
        </div>
        <div className={styles["buttons"]}>
          <button onClick={onClick} id="enter">
            Google Search
          </button>
          <button>I'm Feeling Lucky</button>
        </div>
      </section>
      <footer>
        <section className={styles["upper"]}>
          <div className={clsx(styles.items, styles.left)}>
            <div className={styles["item"]}>Taiwan</div>
          </div>
        </section>
        <section className={styles["lower"]}>
          <div className={clsx(styles.items, styles.left)}>
            <div className={styles["item"]}>Advertising</div>
            <div className={styles["item"]}>Business</div>
            <div className={styles["item"]}>About</div>
          </div>
          <div className={clsx(styles.items, styles.right)}>
            <div className={styles["item"]}>Privacy</div>
            <div className={styles["item"]}>Terms</div>
            <div className={styles["item"]}>Settings</div>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Main