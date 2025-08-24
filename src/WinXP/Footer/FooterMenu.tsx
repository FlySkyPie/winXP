import { useState } from 'react';
import clsx from 'clsx';

import SubMenu from '../../components/SubMenu';
import ie from '../../assets/windowsIcons/ie.png';
import setAccess from '../../assets/windowsIcons/227(32x32).png';
import outlook from '../../assets/windowsIcons/887(32x32).png';
import mediaPlayer from '../../assets/windowsIcons/846(32x32).png';
import messenger from '../../assets/windowsIcons/msn.png';
import documents from '../../assets/windowsIcons/308(32x32).png';
import recentDocuments from '../../assets/windowsIcons/301(32x32).png';
import pictures from '../../assets/windowsIcons/307(32x32).png';
import music from '../../assets/windowsIcons/550(32x32).png';
import computer from '../../assets/windowsIcons/676(32x32).png';
import controlPanel from '../../assets/windowsIcons/300(32x32).png';
import connect from '../../assets/windowsIcons/309(32x32).png';
import printer from '../../assets/windowsIcons/549(32x32).png';
import paint from '../../assets/windowsIcons/680(32x32).png';
import help from '../../assets/windowsIcons/747(32x32).png';
import search from '../../assets/windowsIcons/299(32x32).png';
import run from '../../assets/windowsIcons/743(32x32).png';
import lock from '../../assets/windowsIcons/546(32x32).png';
import user from '../../assets/windowsIcons/user.png';
import shut from '../../assets/windowsIcons/310(32x32).png';
import allProgramsIcon from '../../assets/windowsIcons/all-programs.ico';
import notepad from '../../assets/windowsIcons/327(32x32).png';
import empty from '../../assets/empty.png';

import { AllPrograms, ConnectTo, MyRecentDocuments } from './FooterMenuData';
import styles from './footer.styles.module.scss';

interface IFooterMenuProps {
  className?: string,
  onClick: (text?: string) => void;
};

const FooterMenu: React.FC<IFooterMenuProps> = ({ className, onClick }) => {
  const [hovering, setHovering] = useState('');
  function onMouseOver(e: any) {
    const item = e.target.closest(`.${styles['menu__item']}`);
    if (!item) return;
    const textEl = item.querySelector(`.${styles['menu__item__text']}`);
    setHovering(textEl.textContent);
  }
  return (
    <div className={clsx(
      styles.root,
      className,
    )}>
      <header>
        <img className={styles["header__img"]} src={user} alt="avatar" />
        <span className={styles["header__text"]}>User</span>
      </header>
      <section className={styles["menu"]} onMouseOver={onMouseOver}>
        <hr className={styles["orange-hr"]} />
        <div className={styles["menu__left"]}>
          <Item onClick={onClick} text="Internet" icon={ie}>
            <div className={styles["menu__item__subtext"]}>Internet Explorer</div>
          </Item>
          <Item onClick={onClick} text="E-mail" icon={outlook}>
            <div className={styles["menu__item__subtext"]}>Outlook Express</div>
          </Item>
          <div className={styles["menu__separator"]} />
          <Items
            onClick={onClick}
            items={[
              { icon: notepad, text: 'Notepad' },
              { icon: paint, text: 'Paint' },
              { icon: mediaPlayer, text: 'Windows Media Player' },
              { icon: messenger, text: 'Windows Messenger' },
            ]}
          />
          <div style={{ flex: 1 }} />
          <div className={styles["menu__separator"]} />
          <Item
            style={
              hovering === 'All Programs'
                ? {
                  backgroundColor: '#2f71cd',
                  color: '#FFF',
                }
                : {}
            }
            text={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                All Programs
                <img
                  src={allProgramsIcon}
                  alt=""
                  style={{
                    marginLeft: '5px',
                    height: '18px',
                  }}
                />
              </div>
            }
            icon={empty}
          >
            {hovering === 'All Programs' && (
              <SubMenu data={AllPrograms} onClick={onClick} />
            )}
          </Item>
        </div>
        <div className={styles["menu__right"]}>
          <Item text="My Documents" icon={documents} onClick={onClick} />
          <Item
            style={
              hovering === 'My Recent Documents'
                ? {
                  backgroundColor: '#2f71cd',
                  color: '#FFF',
                }
                : {}
            }
            text="My Recent Documents"
            icon={recentDocuments}
          >
            <div
              style={{
                borderLeftColor:
                  hovering === 'My Recent Documents' ? '#FFF' : '#00136b',
              }}
              className={styles["menu__arrow"]}
            />
            {hovering === 'My Recent Documents' && (
              <SubMenu
                left="153px"
                data={MyRecentDocuments}
                onClick={onClick}
              />
            )}
          </Item>
          <Items
            onClick={onClick}
            items={[
              { icon: pictures, text: 'My Pictures' },
              { icon: music, text: 'My Music' },
              { icon: computer, text: 'My Computer' },
            ]}
          />
          <div className={styles["menu__separator"]} />
          <Items
            onClick={onClick}
            items={[
              { icon: controlPanel, text: 'Control Panel' },
              { icon: setAccess, text: 'Set Program Access and Defaults' },
            ]}
          />
          <Item
            style={
              hovering === 'Connect To'
                ? {
                  backgroundColor: '#2f71cd',
                  color: '#FFF',
                }
                : {}
            }
            text="Connect To"
            icon={connect}
          >
            <div
              style={{
                borderLeftColor: hovering === 'Connect To' ? '#FFF' : '#00136b',
              }}
              className={styles["menu__arrow"]}
            />
            {hovering === 'Connect To' && (
              <SubMenu left="153px" data={ConnectTo} onClick={onClick} />
            )}
          </Item>
          <Item onClick={onClick} text="Printers and Faxes" icon={printer} />
          <div className={styles["menu__separator"]} />
          <Items
            onClick={onClick}
            items={[
              { icon: help, text: 'Help and Support' },
              { icon: search, text: 'Search' },
              { icon: run, text: 'Run...' },
            ]}
          />
        </div>
      </section>
      <footer>
        <div className={styles["footer__item"]} onClick={() => onClick('Log Off')}>
          <img className={styles["footer__item__img"]} src={lock} alt="" />
          <span>Log Off</span>
        </div>
        <div
          className={styles["footer__item"]}
          onClick={() => onClick('Turn Off Computer')}
        >
          <img className={styles["footer__item__img"]} src={shut} alt="" />
          <span>Turn Off Computer</span>
        </div>
      </footer>
    </div>
  );
}

interface IItemsProps {
  items: any[];
  onClick: any;
};

const Items: React.FC<IItemsProps> = ({ items, ...rest }) => {
  return <>
    {items.map((item, i) => <Item key={i} {...item} {...rest} />)}
  </>;
}


interface IItemProps {
  style?: any,
  text: any,
  icon: any,
  children?: React.ReactNode,
  onHover?: any,
  onClick?: any,
};

const Item: React.FC<IItemProps> = ({
  style,
  text,
  icon,
  onHover = () => { },
  onClick = () => { },
  children,
}) => {
  function _onClick() {
    onClick(text);
  }
  function onMouseEnter() {
    onHover(text);
  }
  return (
    <div
      className={styles["menu__item"]}
      style={style}
      onClick={_onClick}
      onMouseEnter={onMouseEnter}
    >
      <img className={styles["menu__item__img"]} src={icon} alt={text} />
      <div className={styles["menu__item__texts"]}>
        <div className={styles["menu__item__text"]}>{text}</div>
        {children}
      </div>
    </div>
  );
}
export default FooterMenu