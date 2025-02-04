import {ObjectId} from 'bson';
import {Collection, Filter, MongoError, UpdateOneModel} from 'mongodb';

import {getDataAsArray, getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireAdminOpts} from '@/controller/user/account/type';
import {getActivationKey, removeActivationKeyByKey} from '@/controller/user/activation/key';
import mongoPromise from '@/lib/mongodb';
import {
  activationContact,
  ActivationData,
  ActivationDataAtClient,
  ActivationKey,
  ActivationProperties,
  ActivationStatus,
} from '@/types/mongo/activation';
import {toActivationDataAtClient} from '@/utils/user/activation/utils';


const getCollection = async (): Promise<Collection<ActivationData>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<ActivationData>('activation');
};

export const consumeActivationKey = async (userId: string, key: string): Promise<boolean> => {
  const activationKey = await getActivationKey(key);

  if (!activationKey) {
    return false;
  }

  try {
    await (await getCollection()).insertOne({userId: new ObjectId(userId), ...activationKey});
  } catch (e) {
    if (e instanceof MongoError) {
      return false;
    }

    throw e;
  }

  await removeActivationKeyByKey(activationKey.key);
  return true;
};

type GetActivationDataByFilterOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationData>,
};

export const getActivationDataByFilter = ({executorUserId, filter}: GetActivationDataByFilterOpts) => {
  throwIfNotAdmin(executorUserId);

  return getSingleData(getCollection(), filter);
};

export const getActivationData = async (userId: string): Promise<ActivationStatus | null> => {
  const data = await getSingleData(getCollection(), {userId: new ObjectId(userId)});

  if (!data) {
    return null;
  }

  return data.activation;
};

type GetAllActivationDataOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationData>,
};

export const getAllActivationData = ({executorUserId, filter}: GetAllActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return getDataAsArray(getCollection(), filter);
};

export const getAllActivationDataAsClient = async (): Promise<ActivationDataAtClient[]> => {
  return (await getAllActivationData({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter: {}}))
    .map(toActivationDataAtClient);
};

export const getPaidUserCount = async () => (await getCollection()).countDocuments({source: {$ne: null}});

type UpdateActivationDataPropertiesSingleOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationData>,
  update: ActivationProperties,
};

export const updateActivationDataPropertiesSingle = async ({
  executorUserId,
  filter,
  update,
}: UpdateActivationDataPropertiesSingleOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne(filter, {$set: update});
};

type UpdateActivationDataPropertiesBatchOpts = ControllerRequireAdminOpts & {
  updates: UpdateOneModel<ActivationData>[]
};

export const updateActivationDataPropertiesBatch = async ({
  executorUserId,
  updates,
}: UpdateActivationDataPropertiesBatchOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).bulkWrite(
    updates.map((updateOne) => ({updateOne})),
    {ordered: false},
  );
};

type UpdateActivationDataByKeyOpts = ControllerRequireAdminOpts & ActivationProperties & {
  key: ActivationData['key'],
};

export const updateActivationDataByKey = async ({
  executorUserId,
  key,
  activation,
  expiry,
  source,
  contact,
  isSpecial,
  note,
}: UpdateActivationDataByKeyOpts) => updateActivationDataPropertiesSingle({
  executorUserId,
  filter: {key},
  update: {
    activation,
    expiry,
    source,
    contact,
    isSpecial,
    note,
  },
});

type RemoveActivationDataOpts = ControllerRequireAdminOpts & {
  filter: Filter<ActivationKey>,
};

export const removeActivationDataSingle = async ({executorUserId, filter}: RemoveActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteOne(filter);
};

export const removeActivationDataBatch = async ({executorUserId, filter}: RemoveActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteMany(filter);
};

type RemoveActivationDataByKeyOpts = ControllerRequireAdminOpts & {
  key: ActivationData['key'],
};

export const removeActivationDataByKey = ({executorUserId, key}: RemoveActivationDataByKeyOpts) => (
  removeActivationDataSingle({executorUserId, filter: {key}})
);

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({userId: 1}, {unique: true}),
    collection.createIndex({key: 1}, {unique: true}),
    collection.createIndex({expiry: 1}, {expireAfterSeconds: 0}),
    ...activationContact.map((channel) => (
      collection.createIndex({[`contact.${channel}`]: 1}, {unique: true, sparse: true})
    )),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize user ads free data index', e));
