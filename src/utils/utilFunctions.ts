import axios from 'axios'
import { Character } from '../types/rickyAndMontyApi'
import { rickAndMorty } from './utilVariables'

// takes characterId and returns the character's info
export const getCharacterInfo = async (
  characterId: number,
  characters?: Character[],
) => {
  // if character is not available locally, fetch it from the api
  let character = {}
  character = characters?.find((v) => v.id === characterId) || {}
  if (Object.keys(character).length === 0) {
    const { data: characterInfo } = await axios.get(
      `${rickAndMorty.character}/${characterId}`,
    )
    character = characterInfo
  }

  return character
}
