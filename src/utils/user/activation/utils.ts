import {
  ActivationData,
  ActivationDataAtClient,
  ActivationKey,
  ActivationKeyAtClient,
  ActivationProperties,
  ActivationPropertiesAtClient,
} from '@/types/mongo/activation';
import {PatreonMember} from '@/types/patreon/common/member';
import {toIsoDateString} from '@/utils/date';
import {showToast} from '@/utils/toast';
import {isNotNullish} from '@/utils/type';
import {defaultExpiryDays} from '@/utils/user/activation/const';


export const isActivationDataValid = ({source, contact, note}: ActivationPropertiesAtClient) => {
  if (!source && !note) {
    showToast({
      isAlert: true,
      content: 'Missing subscription source!',
    });
    return false;
  }

  if ((source && !contact[source]) || (!source && !Object.values(contact).filter(isNotNullish).length)) {
    showToast({
      isAlert: true,
      content: 'Missing contact of the subscription source!',
    });
    return false;
  }

  return true;
};

export const toActivationKeyAtClient = ({expiry, generatedAt, ...data}: ActivationKey): ActivationKeyAtClient => ({
  ...data,
  expiry: toIsoDateString(expiry),
  generatedAt: toIsoDateString(generatedAt),
});

export const toActivationDataAtClient = ({userId, ...data}: ActivationData): ActivationDataAtClient => ({
  ...toActivationKeyAtClient(data),
  userId: userId.toString(),
});

export const toActivationProperties = ({
  expiry,
  ...data
}: ActivationPropertiesAtClient): ActivationProperties => ({
  ...data,
  expiry: new Date(expiry),
});

export const getActivationExpiry = (member?: PatreonMember): Date => {
  let expiry;

  if (member?.attributes.last_charge_date) {
    const {
      last_charge_date: lastChargeIsoUtc,
      pledge_cadence: cadence,
    } = member.attributes;

    expiry = new Date(lastChargeIsoUtc);
    // 2 days grace period
    expiry.setDate(expiry.getDate() + cadence * 31 + 2);
  } else {
    expiry = new Date();
    expiry.setDate(expiry.getDate() + defaultExpiryDays);
  }

  return expiry;
};
