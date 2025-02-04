import {PatreonSocialConnections} from '@/types/patreon/common/social/main';


// https://docs.patreon.com/#user-v2
export type PatreonUser = {
  type: 'user',
  id: string,
  attributes: {
    social_connections?: PatreonSocialConnections,
  }
};
