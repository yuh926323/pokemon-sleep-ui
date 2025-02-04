import {getActivationPropertiesByPatreonContact} from '@/controller/user/activation/util';
import {ActionSendActivationPayload} from '@/handler/action/activation/type';
import {getPatreonMember} from '@/handler/patreon/api/member/main';
import {PatreonMember} from '@/types/patreon/common/member';
import {isPatronActive} from '@/utils/external/patreon';
import {getActivationExpiry} from '@/utils/user/activation/utils';


export const toActivationPayloadFromPatreon = async (
  member: PatreonMember,
): Promise<ActionSendActivationPayload> => {
  const {id, attributes} = member;
  const {email} = attributes;

  if (!isPatronActive(member)) {
    return {email, activationProperties: null};
  }

  const memberData = await getPatreonMember({userId: id});

  const social = memberData.included[0].attributes.social_connections;
  const existedActivationProperties = (await getActivationPropertiesByPatreonContact(email));

  /* eslint-disable no-console */
  console.log(`>>> Converting Patreon member of ${id} (${email}) to activation payload`);
  if (existedActivationProperties) {
    console.log(`Existed activation properties of ${email} on Patreon:`, JSON.stringify(existedActivationProperties));
  }
  /* eslint-enable no-console */

  return {
    email,
    activationProperties: {
      expiry: getActivationExpiry(member),
      activation: {
        adsFree: true,
        premium: true,
      },
      source: 'patreon',
      contact: {
        patreon: email,
        // Keep the existed ones and overwrite with Discord User ID linked to Patreon if once is available
        ...existedActivationProperties?.contact,
        ...(social?.discord && {discord: `<@${social.discord.user_id}>`}),
      },
      isSpecial: false,
      note: '',
    },
  };
};
