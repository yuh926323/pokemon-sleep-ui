import {MainSkillEffectType, MainSkillTarget} from '@/types/game/pokemon/mainSkill';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const mainSkillEffectTypeI18nId: {
  [type in MainSkillEffectType]: I18nMessageKeysOfNamespace<'UI.MainSkill.EffectType'>
} = {
  strength: 'Strength',
  shards: 'Shards',
  stamina: 'Stamina',
  help: 'Help',
  cooking: 'Cooking',
  random: 'Random',
};

export const mainSkillEffectTypeImageSrc: {[type in MainSkillEffectType]: string} = {
  strength: '/images/generic/energy_white.png',
  shards: '/images/generic/shard_white.png',
  stamina: '/images/generic/mood.png',
  help: '/images/generic/speed.png',
  cooking: '/images/generic/pot.png',
  random: '/images/generic/flash.png',
};

export const mainSkillEffectTargetI18nId: {
  [target in MainSkillTarget]: I18nMessageKeysOfNamespace<'UI.MainSkill.Target'>
} = {
  self: 'Self',
  random: 'Random',
  team: 'Team',
};

export const mainSkillEffectTargetImageSrc: {[target in MainSkillTarget]: string} = {
  self: '/images/mainSkill/target/self.png',
  random: '/images/mainSkill/target/random.png',
  team: '/images/mainSkill/target/team.png',
};

export const mainSkillMaxLevel = 6;
