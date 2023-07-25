import {getTranslator} from 'next-intl/server';

import {I18nValidKeys} from '@/types/i18n';
import {GenerateMetadata} from '@/types/next/metadata';


type GeneratePageMetaValues = {
  name: string,
};

type GeneratePageMetaOpts = {
  key: I18nValidKeys<IntlMessages['UI']['Metadata']>,
  values?: GeneratePageMetaValues,
};

export const generatePageMeta = ({key, values}: GeneratePageMetaOpts): GenerateMetadata => async ({params}) => {
  const {locale} = params;
  const t = await getTranslator(locale, 'UI.Metadata');

  return {
    title: `${t(key, values)} | ${t('SiteName')}`,
    colorScheme: 'dark',
  };
};
