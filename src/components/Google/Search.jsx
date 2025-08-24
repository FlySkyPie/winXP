import React, { useState } from 'react';
import clsx from 'clsx';

import find from './find.svg';
import smile from './smile.svg';
import styles from './search-style.module.scss';

function Search({ className, goMain, onSearch, query }) {
  const [value, setValue] = useState(query);
  const [tag, setTag] = useState('All');
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
  function renderTags() {
    return 'All,Maps,Images,News,Videos,More'.split(',').map(tagName => (
      <div
        onClick={() => setTag(tagName)}
        className={clsx(
          styles.tag,
          tagName === tag && styles.active,
        )}
        key={tagName}
      >
        {tagName}
      </div>
    ));
  }
  return (
    <div className={clsx(styles.root, className)}>
      <section className={styles["top-bars"]}>
        <div className={styles["top-bar"]}>
          <div className={clsx(
            styles["bar-items"],
            styles["left"],
          )}>
            <img
              onClick={goMain}
              className={styles["logo"]}
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
            />
            <div className={styles["search-bar"]}>
              <input
                id="search"
                type="text"
                name="search"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
              <div className={styles["icon"]}>
                <img
                  src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"
                  alt="microphone"
                />
              </div>
              <div className={styles["icon"]} onClick={onClick}>
                <img src={find} alt="find" />
              </div>
            </div>
          </div>
          <div className={clsx(
            styles["bar-items"],
            styles["right"],
          )}>
            <div className={styles["functions"]}>
              <img src={smile} alt="smile" />
            </div>
          </div>
        </div>
        <div className={styles["app-bar"]}>
          <div className={clsx(
            styles["tags"],
            styles["left"],
          )}>{renderTags()}</div>
          <div className={clsx(
            styles["tags"],
            styles["right"],
          )}>
            <div className={styles["tag"]}>Settings</div>
            <div className={styles["tag"]}>Tools</div>
          </div>
        </div>
      </section>
      <section className={styles["content"]}>
        <p>
          Your search - <span id={styles['search-in-content']}>{query}</span> - did not
          match any documents.
        </p>
        <p>Suggestions</p>
        <ul>
          <li>Make sure that all words are spelled correctly.</li>
          <li>Try different keywords.</li>
          <li>Try more general keywords.</li>
        </ul>
      </section>
      <footer>
        <section className={styles["upper"]}>
          <div className={clsx(
            styles["footer-items"],
            styles["left"],
          )}>
            <div className={styles["item"]}>Taiwan</div>
          </div>
        </section>
        <section className={styles["lower"]}>
          <div className={clsx(
            styles["footer-items"],
            styles["left"],
          )}>
            <div className={styles["item"]}>Help</div>
            <div className={styles["item"]}>Send feedback</div>
            <div className={styles["item"]}>Privacy</div>
            <div className={styles["item"]}>Terms</div>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Search;
