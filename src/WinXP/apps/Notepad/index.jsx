import React, { useState } from 'react';
import clsx from 'clsx';

import { WindowDropDowns } from '../../../components';
import dropDownData from './dropDownData';
import styles from './styles.module.scss';

export default function Notepad({ onClose }) {
  const [docText, setDocText] = useState('');
  const [wordWrap, setWordWrap] = useState(false);

  function onClickOptionItem(item) {
    switch (item) {
      case 'Exit':
        onClose();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }
  function onTextAreaKeyDown(e) {
    // handle tabs in text area
    if (e.which === 9) {
      e.preventDefault();
      e.persist();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);

      // asynchronously update textarea selection to include tab
      // workaround due to https://github.com/facebook/react/issues/14174
      requestAnimationFrame(() => {
        e.target.selectionStart = start + 1;
        e.target.selectionEnd = start + 1;
      });
    }
  }

  return (
    <div className={styles.root}>
      <section className={styles["np__toolbar"]}>
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <textarea
        className={clsx(
          styles.textarea,
          wordWrap && styles.no_wordWrap,
        )}
        value={docText}
        onChange={e => setDocText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </div>
  );
}
