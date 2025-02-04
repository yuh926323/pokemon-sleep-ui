import React from 'react';

import {getServerSession} from 'next-auth';

import {authOptions} from '@/const/auth';
import {defaultStaminaCalcConfig, defaultStaminaSkillTrigger} from '@/const/user/settings';
import {I18nProvider} from '@/contexts/i18n';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {StaminaAnalysisClient} from '@/ui/stamina/client';
import {StaminaAnalysisDataProps} from '@/ui/stamina/type';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const StaminaAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    subSkillMap,
  ] = await Promise.all([
    getServerSession(authOptions),
    getSubSkillMap(),
  ]);

  const props: StaminaAnalysisDataProps = {
    preloaded: {
      config: cloneMerge(
        defaultStaminaCalcConfig,
        session?.user.preloaded.settings?.stamina,
      ),
      skillTrigger: cloneMerge(
        defaultStaminaSkillTrigger,
        session?.user.preloaded.settings?.staminaSkillTrigger,
      ),
    },
    subSkillMap,
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Stamina', 'UI.InPage.Team']}>
        <StaminaAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
