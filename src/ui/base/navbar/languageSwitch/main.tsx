'use client';
import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {PopupCommon} from '@/components/popup/common/main';
import {localeName} from '@/const/website';
import {useLanguageSwitch} from '@/ui/base/navbar/languageSwitch/hook';
import {isLocale} from '@/utils/i18n';


export const LanguageSwitch = () => {
  const [show, setShow] = React.useState(false);
  const {currentLocale, isPending, onLocaleSwitch} = useLanguageSwitch();

  return (
    <>
      <button className="nav-button-text" onClick={() => setShow(true)} disabled={isPending}>
        {isLocale(currentLocale) ? localeName[currentLocale] : `(${currentLocale})`}
      </button>
      <PopupCommon show={show} setShow={setShow}>
        <Grid center className="grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.entries(localeName).map(([locale, name]) => (
            <button
              key={locale}
              disabled={isPending || currentLocale === locale}
              onClick={() => onLocaleSwitch(locale)}
              className={clsx(
                'button-base flex w-full justify-center p-5 text-xl sm:w-48',
                'enabled:button-clickable-bg disabled:button-disabled-border',
              )}
            >
              {name}
            </button>
          ))}
        </Grid>
      </PopupCommon>
    </>
  );
};
