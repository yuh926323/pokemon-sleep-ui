'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex';
import {AuthSignInProvider} from '@/ui/auth/signIn/provider';


export const AuthSignInExternal = () => {
  return (
    <Flex direction="col" center className="info-section">
      <AuthSignInProvider provider="google" text="Google"/>
    </Flex>
  );
};
