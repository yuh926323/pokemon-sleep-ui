import {v4} from 'uuid';

import {IsoUtcTimestampString} from '@/types/date';
import {PatreonMember} from '@/types/patreon/common/member';
import {PatreonUser} from '@/types/patreon/common/user';
import {PatreonMemberData} from '@/types/patreon/memberData';


const testPatreonMember: PatreonMember = {
  attributes: {
    email: 'test@email.com',
    last_charge_date: new Date('2023-10-01').toISOString() as IsoUtcTimestampString,
    last_charge_status: 'Paid',
    patron_status: 'active_patron',
    pledge_cadence: 1,
  },
  id: v4(),
  type: 'member',
};

const testPatreonUser: PatreonUser = {
  attributes: {
    social_connections: {
      discord: {
        user_id: '@test',
      },
    },
  },
  id: v4(),
  type: 'user',
};

export const testPatreonMemberData: PatreonMemberData[] = [
  // [0] Is Patron, but not in activations
  {
    member: {
      ...testPatreonMember,
      attributes: {
        ...testPatreonMember.attributes,
        email: 'patronNoActivation@email.com',
      },
    },
    user: testPatreonUser,
  },
  // [1] Is Patron, got pending activation key
  {
    member: {
      ...testPatreonMember,
      attributes: {
        ...testPatreonMember.attributes,
        email: 'patronPending@email.com',
      },
    },
    user: testPatreonUser,
  },
  // [2] Is Patron, got active activation
  {
    member: {
      ...testPatreonMember,
      attributes: {
        ...testPatreonMember.attributes,
        email: 'patronActive@email.com',
      },
    },
    user: testPatreonUser,
  },
  // [3] Is Patron, but subscription expired
  {
    member: {
      ...testPatreonMember,
      attributes: {
        ...testPatreonMember.attributes,
        patron_status: 'former_patron',
        email: 'patronExpired@email.com',
      },
    },
    user: testPatreonUser,
  },
  // [4] Is Patron, but payment declined
  {
    member: {
      ...testPatreonMember,
      attributes: {
        ...testPatreonMember.attributes,
        last_charge_status: 'Declined',
        patron_status: 'declined_patron',
        email: 'patronDeclined@email.com',
      },
    },
    user: testPatreonUser,
  },
];

