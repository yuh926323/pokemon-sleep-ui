import {GenerateMetadata} from '@/types/next/metadata';
import {Constructing} from '@/ui/placeholder/constructing';
import {getI18nTranslator} from '@/utils/i18n';
import {generatePageMetaFromString} from '@/utils/meta';


export const generateMetadata: GenerateMetadata = async ({params}) => {
  const {locale} = params;
  const t = await getI18nTranslator({locale, namespace: 'UI.Metadata'});

  return generatePageMetaFromString({
    t,
    title: `${t('Team.Index.Title')} / ${t('Team.Box.Title')}`,
  });
};

export default Constructing;
