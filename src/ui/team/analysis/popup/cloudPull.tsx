import React from 'react';

import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';
import {TeamAnalysisMember} from '@/types/teamAnalysis';


type Props = {
  onCloudPulled: (member: TeamAnalysisMember) => void,
};

export const TeamAnalysisCloudPull = ({onCloudPulled}: Props) => {
  const [memberId, setMemberId] = React.useState('');
  const {actAsync, status} = useUserDataActor();

  if (!actAsync) {
    return null;
  }

  return (
    <FlexForm className="gap-1.5 sm:w-96">
      <Flex>
        <InputBox
          type="text"
          value={memberId}
          onChange={({target}) => setMemberId(target.value)}
        />
      </Flex>
      <Flex className="items-end">
        <button type="submit" className="button-clickable-bg h-9 w-9 p-1" onClick={async () => {
          const updated = await actAsync({
            action: 'load',
            options: {
              type: 'teamAnalysisMember',
              opts: {
                teamMemberId: memberId,
              },
            },
            getStatusOnCompleted: (updated) => (
              !!updated?.user.lazyLoaded.teamAnalysisMember ? 'completed' : 'failed'
            ),
          });
          if (!updated) {
            return;
          }

          const member = updated.user.lazyLoaded.teamAnalysisMember;
          if (!member) {
            return;
          }

          onCloudPulled(member);
        }}>
          {status !== 'waiting' ? actionStatusIcon[status] : <CloudArrowDownIcon/>}
        </button>
      </Flex>
    </FlexForm>
  );
};
