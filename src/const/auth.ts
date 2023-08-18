import {MongoDBAdapter as mongoDBAdapter} from '@next-auth/mongodb-adapter';
import {AuthOptions} from 'next-auth';
import googleProvider from 'next-auth/providers/google';

import {getUserPreloadedData, uploadUserData} from '@/controller/user/main';
import mongoPromise from '@/lib/mongodb';
import {NextAuthSessionUser} from '@/types/auth';
import {UploadUserDataOpts} from '@/types/userData/upload';


const cookieDomain = process.env.NEXTAUTH_COOKIE_DOMAIN;

if (!cookieDomain) {
  throw new Error('Invalid/missing environment variable `NEXTAUTH_COOKIE_DOMAIN`.');
}

const useSecureCookies = cookieDomain.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';
const hostName = new URL(cookieDomain).hostname;

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: mongoDBAdapter(
    mongoPromise,
    {databaseName: 'auth'},
  ),
  providers: [
    googleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
  },
  callbacks: {
    session: async ({session, user, trigger, newSession}) => {
      const userId = user.id;

      session.user = {
        id: userId,
        preloaded: await getUserPreloadedData(userId),
        lazyLoaded: {},
      } satisfies NextAuthSessionUser;

      if (trigger !== 'update' || !newSession) {
        return session;
      }

      await uploadUserData({userId, opts: newSession satisfies UploadUserDataOpts});
      session.user.preloaded = await getUserPreloadedData(userId);

      return session;
    },
  },
};
