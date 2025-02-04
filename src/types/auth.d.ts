import {DefaultSession} from 'next-auth';

import {ActivationStatus} from '@/types/mongo/activation';
import {UserLazyLoadedData, UserPreloadedData} from '@/types/userData/main';


export type NextAuthSessionUser = DefaultSession['user'] & {
  id: string,
  preloaded: UserPreloadedData,
  lazyLoaded: UserLazyLoadedData,
  activation: ActivationStatus | null,
  build: string,
};

declare module 'next-auth' {
  interface Session {
    user: NextAuthSessionUser;
  }
}
