import React from 'react';

import {Popup} from '@/components/popup';
import {Pokebox, PokeInBox} from '@/types/game/pokebox';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {PokedexMap} from '@/types/mongo/pokemon';
import {PokeboxPokeInBoxUpdateLayout} from '@/ui/team/pokebox/content/edit/layout';


type Props = {
  pokebox: Pokebox,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  editOriginIdx: number | undefined,
  onUpdateCompleted: (updated: PokeInBox) => void,
};

export const PokeboxPokeInBoxUpdatePopup = ({
  pokebox,
  pokedexMap,
  subSkillMap,
  editOriginIdx,
  onUpdateCompleted,
}: Props) => {
  const [data, setData] = React.useState<PokeInBox>();

  React.useEffect(() => {
    if (editOriginIdx === undefined) {
      return;
    }

    setData(pokebox[editOriginIdx]);
  }, [editOriginIdx]);

  return (
    <Popup show={editOriginIdx !== undefined} setShow={() => {
      if (!data) {
        return;
      }

      onUpdateCompleted(data);
    }}>
      {
        data &&
        <PokeboxPokeInBoxUpdateLayout
          pokeInBox={data}
          pokedexMap={pokedexMap}
          subSkillMap={subSkillMap}
          setPokeInBox={setData}
          idx={editOriginIdx}
        />
      }
    </Popup>
  );
};
