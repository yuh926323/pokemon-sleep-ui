import {PokeInBox} from '@/types/game/pokebox';
import {SleepdexData} from '@/types/game/sleepdex';
import {ActivationDataAtClient, ActivationKeyAtClient} from '@/types/mongo/activation';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings} from '@/types/userData/settings';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type UserDataUploadOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox.display',
  data: PokeboxViewerDisplay,
} | {
  type: 'pokebox.create' | 'pokebox.upsert',
  data: PokeInBox,
} | {
  type: 'pokebox.delete',
  data: PokeInBox['uuid'],
} | {
  type: 'sleepdex.mark' | 'sleepdex.unmark',
  data: SleepdexData,
} | {
  type: 'teamAnalysis',
  data: UserTeamAnalysisContent,
} | {
  type: 'cooking',
  data: UserCookingPreset,
} | {
  type: 'settings',
  data: UserSettings,
} | {
  type: 'admin.activation.update.key',
  data: ActivationKeyAtClient,
} | {
  type: 'admin.activation.update.data',
  data: ActivationDataAtClient,
} | {
  type: 'admin.activation.delete',
  data: string,
};
