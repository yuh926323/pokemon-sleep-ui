import React from 'react';

import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth';

import {SignIn} from '@/components/auth/signIn';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {consumeActivationKey} from '@/controller/user/activation/data';
import {PageProps} from '@/types/next/page';


const AccountActivate = async ({searchParams}: PageProps) => {
  const session = await getServerSession(authOptions);
  const activationKey = searchParams?.key;

  if (!session) {
    return <SignIn/>;
  }

  if (typeof activationKey !== 'string' || !activationKey) {
    return <Failed text="Key"/>;
  }

  const activated = await consumeActivationKey(session.user.id, activationKey);
  if (!activated) {
    return <Failed text="Activation Failed"/>;
  }

  // `next-intl` middleware won't intercept this request, so `redirect()` should come from `next` directly
  redirect('/');
};

export default AccountActivate;
