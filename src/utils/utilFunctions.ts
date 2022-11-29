import axios from 'axios'
import { Character } from '../types/rickyAndMontyApi'
import { rickAndMorty } from './utilVariables'

// takes characterId and returns the character's info
export const getCharacterInfo = async (
  characterId: number,
  characters: Character[] = [],
) => {
  // if character is not available locally, fetch it from the api
  const character = characters.find((v) => v.id === characterId)
  if (character) return character
  try {
    const { data: characterInfo } = await axios.get<Character>(
      `${rickAndMorty.character}/${characterId}`,
    )
    return characterInfo
  } catch (error) {
    console.error(error)
    return 'character not found'
  }
}
