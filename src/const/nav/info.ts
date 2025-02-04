import {NavEntryLink} from '@/types/nav';


export const navEntriesForInfo: NavEntryLink[] = [
  {
    type: 'link',
    href: '/info/pot',
    imageSrc: '/images/generic/pot.png',
    i18nTextId: 'Info.Pot.Title',
  },
  {
    type: 'link',
    href: '/info/nature',
    imageSrc: '/images/generic/memo.png',
    i18nTextId: 'Info.Nature.Title',
  },
  {
    type: 'link',
    href: '/info/mainskill',
    imageSrc: '/images/generic/mainSkill.png',
    i18nTextId: 'Info.MainSkill.Index.Title',
  },
  {
    type: 'link',
    href: '/info/subskill',
    imageSrc: '/images/generic/subSkill.png',
    i18nTextId: 'Info.SubSkill.Title',
  },
];
