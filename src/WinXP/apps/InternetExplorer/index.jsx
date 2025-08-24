import React, { useState } from 'react';

import { WindowDropDowns, Google } from '../../../components';
import dropDownData from './dropDownData';
import ie from '../../../assets/windowsIcons/ie-paper.png';
import printer from '../../../assets/windowsIcons/17(32x32).png';
import go from '../../../assets/windowsIcons/290.png';
import links from '../../../assets/windowsIcons/links.png';
import search from '../../../assets/windowsIcons/299(32x32).png';
import favorite from '../../../assets/windowsIcons/744(32x32).png';
import back from '../../../assets/windowsIcons/back.png';
import earth from '../../../assets/windowsIcons/earth.png';
import edit from '../../../assets/windowsIcons/edit.png';
import forward from '../../../assets/windowsIcons/forward.png';
import history from '../../../assets/windowsIcons/history.png';
import home from '../../../assets/windowsIcons/home.png';
import mail from '../../../assets/windowsIcons/mail.png';
import msn from '../../../assets/windowsIcons/msn.png';
import refresh from '../../../assets/windowsIcons/refresh.png';
import stop from '../../../assets/windowsIcons/stop.png';
import windows from '../../../assets/windowsIcons/windows.png';
import dropdown from '../../../assets/windowsIcons/dropdown.png';
import styles from './styles.module.scss';

function InternetExplorer({ onClose }) {
  const [state, setState] = useState({
    route: 'main',
    query: '',
  });
  function onSearch(str) {
    if (str.length) {
      setState({
        route: 'search',
        query: str,
      });
    }
  }
  function goMain() {
    setState({
      route: 'main',
      query: '',
    });
  }
  function onClickOptionItem(item) {
    switch (item) {
      case 'Close':
        onClose();
        break;
      case 'Home Page':
      case 'Back':
        goMain();
        break;
      default:
    }
  }
  return (
    <div className={styles.root}>
      <section className={styles["ie__toolbar"]}>
        <div className={styles["ie__options"]}>
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
            height={21}
          />
        </div>
        <img className={styles["ie__windows-logo"]} src={windows} alt="windows" />
      </section>
      <section className={styles["ie__function_bar"]}>
        <div
          onClick={goMain}
          className={`ie__function_bar__button${state.route === 'main' ? '--disable' : ''
            }`}
        >
          <img className={styles["ie__function_bar__icon"]} src={back} alt="" />
          <span className={styles["ie__function_bar__text"]}>Back</span>
          <div className={styles["ie__function_bar__arrow"]} />
        </div>
        <div className={styles["ie__function_bar__button--disable"]}>
          <img className={styles["ie__function_bar__icon"]} src={forward} alt="" />
          <div className={styles["ie__function_bar__arrow"]} />
        </div>
        <div className={styles["ie__function_bar__button"]}>
          <img className={styles["ie__function_bar__icon--margin-1"]} src={stop} alt="" />
        </div>
        <div className={styles["ie__function_bar__button"]}>
          <img
            className={styles["ie__function_bar__icon--margin-1"]}
            src={refresh}
            alt=""
          />
        </div>
        <div className={styles["ie__function_bar__button"]} onClick={goMain}>
          <img className={styles["ie__function_bar__icon--margin-1"]} src={home} alt="" />
        </div>
        <div className={styles["ie__function_bar__separate"]} />
        <div className={styles["ie__function_bar__button"]}>
          <img
            className={styles["ie__function_bar__icon--normalize "]}
            src={search}
            alt=""
          />
          <span className={styles["ie__function_bar__text"]}>Search</span>
        </div>
        <div className={styles["ie__function_bar__button"]}>
          <img
            className={styles["ie__function_bar__icon--normalize"]}
            src={favorite}
            alt=""
          />
          <span className={styles["ie__function_bar__text"]}>Favorites</span>
        </div>
        <div className={styles["ie__function_bar__button"]}>
          <img className={styles["ie__function_bar__icon"]} src={history} alt="" />
        </div>
        <div className={styles["ie__function_bar__separate"]} />
        <div className={styles["ie__function_bar__button"]}>
          <img className={styles["ie__function_bar__icon--margin-1"]} src={mail} alt="" />
          <div className={styles["ie__function_bar__arrow--margin-11"]} />
        </div>
        <div className={styles["ie__function_bar__button"]}>
          <img
            className={styles["ie__function_bar__icon--margin12"]}
            src={printer}
            alt=""
          />
        </div>
        <div className={styles["ie__function_bar__button--disable"]}>
          <img className={styles["ie__function_bar__icon"]} src={edit} alt="" />
        </div>
        <div className={styles["ie__function_bar__button"]}>
          <img className={styles["ie__function_bar__icon--margin12"]} src={msn} alt="" />
        </div>
      </section>
      <section className={styles["ie__address_bar"]}>
        <div className={styles["ie__address_bar__title"]}>Address</div>
        <div className={styles["ie__address_bar__content"]}>
          <img src={ie} alt="ie" className={styles["ie__address_bar__content__img"]} />
          <div className={styles["ie__address_bar__content__text"]}>
            {`https://www.google.com.tw${state.route === 'search'
              ? `/search?q=${encodeURIComponent(state.query)}`
              : ''
              }`}
          </div>
          <img
            src={dropdown}
            alt="dropdown"
            className={styles["ie__address_bar__content__img"]}
          />
        </div>
        <div className={styles["ie__address_bar__go"]}>
          <img className={styles["ie__address_bar__go__img"]} src={go} alt="go" />
          <span className={styles["ie__address_bar__go__text"]}>Go</span>
        </div>
        <div className={styles["ie__address_bar__separate"]} />
        <div className={styles["ie__address_bar__links"]}>
          <span className={styles["ie__address_bar__links__text"]}>Links</span>
          <img
            className={styles["ie__address_bar__links__img"]}
            src={links}
            alt="links"
          />
        </div>
      </section>
      <div className={styles["ie__content"]}>
        <div className={styles["ie__content__inner"]}>
          <Google
            route={state.route}
            query={state.query}
            onSearch={onSearch}
            goMain={goMain}
          />
        </div>
      </div>
      <footer className={styles["ie__footer"]}>
        <div className={styles["ie__footer__status"]}>
          <img className={styles["ie__footer__status__img"]} src={ie} alt="" />
          <span className={styles["ie__footer__status__text"]}>Done</span>
        </div>
        <div className={styles["ie__footer__block"]} />
        <div className={styles["ie__footer__block"]} />
        <div className={styles["ie__footer__block"]} />
        <div className={styles["ie__footer__block"]} />
        <div className={styles["ie__footer__right"]}>
          <img className={styles["ie__footer__right__img"]} src={earth} alt="" />
          <span className={styles["ie__footer__right__text"]}>Internet</span>
          <div className={styles["ie__footer__right__dots"]} />
        </div>
      </footer>
    </div>
  );
}
export default InternetExplorer;
