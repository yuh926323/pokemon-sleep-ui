import {Session} from 'next-auth';

import {UserLazyLoadedContent} from '@/types/userData/lazyLoaded';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {UserPreloadedContent} from '@/types/userData/preloaded';
import {UserDataUploadOpts} from '@/types/userData/upload';
import {DeepPartialExceptKey} from '@/utils/type';


export type UserPreloadedData = DeepPartialExceptKey<UserPreloadedContent>;

export type UserLazyLoadedData = Partial<UserLazyLoadedContent>;

export type UserDataActionStatus = 'waiting' | 'processing' | 'completed' | 'failed';

export type UserDataAction = {
  getStatusOnCompleted?: (updated: Session | null) => UserDataActionStatus,
} & ({
  action: 'upload',
  options: UserDataUploadOpts,
} | {
  action: 'load',
  options: UserDataLoadingOpts,
});

export type UserDataActor = (opts: UserDataAction) => void;

export type UserDataActorAsync = (opts: UserDataAction) => Promise<Session | null>;
