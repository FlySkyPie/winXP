import { useReducer, useRef, useCallback } from 'react';
import clsx from 'clsx';
import useMouse from 'react-use/lib/useMouse';

import { DashedBox } from '../components';

import { ActionType } from './constants/action-type';
import { Focusing as FOCUSING } from './constants/focusing';
import { PowerState as POWER_STATE } from './constants/power-state';
import { appSettings } from './apps/app-settings';
import Modal from './Modal';
import Footer from './Footer';
import Windows from './Windows';
import Icons from './Icons';
import { reducer, initState } from './reducer';
import styles from './styles.module.scss';

function WinXP() {
  const [state, dispatch] = useReducer(reducer, initState);
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const focusedAppId = getFocusedAppId();
  const onFocusApp = useCallback(id => {
    dispatch({ type: ActionType.FOCUS_APP, payload: id });
  }, []);
  const onMaximizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: ActionType.TOGGLE_MAXIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onMinimizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: ActionType.MINIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onCloseApp = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: ActionType.DEL_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  function onMouseDownFooterApp(id: any) {
    if (focusedAppId === id) {
      dispatch({ type: ActionType.MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: ActionType.FOCUS_APP, payload: id });
    }
  }
  function onMouseDownIcon(id: any) {
    dispatch({ type: ActionType.FOCUS_ICON, payload: id });
  }
  function onDoubleClickIcon(component: any) {
    const appSetting = Object.values(appSettings).find(
      setting => setting.component === component,
    );
    dispatch({ type: ActionType.ADD_APP, payload: appSetting });
  }
  function getFocusedAppId() {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find(app => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }
  function onMouseDownFooter() {
    dispatch({ type: ActionType.FOCUS_DESKTOP });
  }
  function onClickMenuItem(o?: string) {
    if (o === 'Internet')
      dispatch({ type: ActionType.ADD_APP, payload: appSettings['Internet Explorer'] });
    else if (o === 'My Computer')
      dispatch({ type: ActionType.ADD_APP, payload: appSettings['My Computer'] });
    else if (o === 'Notepad')
      dispatch({ type: ActionType.ADD_APP, payload: appSettings.Notepad });
    else if (o === 'Paint')
      dispatch({ type: ActionType.ADD_APP, payload: appSettings.Paint });
    else if (o === 'Log Off')
      dispatch({ type: ActionType.POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (o === 'Turn Off Computer')
      dispatch({ type: ActionType.POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ActionType.ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: 'C:\\\nApplication not found' },
        },
      });
  }
  function onMouseDownDesktop(e: any) {
    if (e.target === e.currentTarget)
      dispatch({
        type: ActionType.START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }
  function onMouseUpDesktop() {
    dispatch({ type: ActionType.END_SELECT });
  }
  const onIconsSelected = useCallback(
    iconIds => {
      dispatch({ type: ActionType.SELECT_ICONS, payload: iconIds });
    },
    [dispatch],
  );
  function onClickModalButton() {
    dispatch({ type: ActionType.CANCEL_POWER_OFF });
    dispatch({
      type: ActionType.ADD_APP,
      payload: appSettings.Error,
    });
  }
  function onModalClose() {
    dispatch({ type: ActionType.CANCEL_POWER_OFF });
  }
  return (
    <div
      ref={ref}
      className={clsx(
        styles.root,
        state.powerState === POWER_STATE.START && styles['power_start'],
        state.powerState === POWER_STATE.TURN_OFF && styles['power_off'],
        state.powerState === POWER_STATE.LOG_OFF && styles['power_off'],
      )}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
    // state={state.powerState}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
      <Windows
        apps={state.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
      />
      <Footer
        apps={state.apps}
        onMouseDownApp={onMouseDownFooterApp}
        focusedAppId={focusedAppId}
        onMouseDown={onMouseDownFooter}
        onClickMenuItem={onClickMenuItem}
      />
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
    </div>
  );
}

export default WinXP;
