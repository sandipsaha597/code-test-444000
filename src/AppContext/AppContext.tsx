import axios from 'axios'
// Immer is a tiny package that allows us to work with immutable state in a more convenient way.
// Using it to set complicated nested react state without any headache
import produce from 'immer'
import { createContext, useCallback, useState } from 'react'
import { Character, Info } from '../types/rickyAndMontyApi'
import { rickAndMorty } from '../utils/utilVariables'

// TODO: don't have :any
export const AppContext = createContext<any>({})

const AppProvider = ({ children }: any) => {
  // "characters" state have 20 characters at a time.
  // Which 20 character depends on the current page
  // "character.data" contains the array of character

  // When the characters are getting fetched the "loading" property becomes true
  // It becomes false when the fetching is done(successful or failed)
  // If successful the data property contains 20 characters with their info
  // If failed the "errorMsg" contains an error message otherwise it stays undefined
  const [characters, setCharacters] = useState<{
    loading: boolean
    data: Info<Character[]>
    errorMsg?: string
  }>({ loading: true, data: {} })

  // Will fetch and set the characters for a particular page
  // It sets the "characters" state above
  const fetchAndSetCharacters = useCallback(async (pageNumber = 1) => {
    try {
      // setting the "characters.loading" property to true while data is being fetched
      // deleting the "characters.errorMsg" property in-case it exists
      setCharacters((characters) => {
        return produce(characters, (draft) => {
          draft.loading = true
          delete draft.errorMsg
        })
      })
      const { data } = await axios.get(
        // If "pageNumber" is not an integer, the api is returning the page 1 with 200 status code
        `${rickAndMorty.character}/?page=${pageNumber}`,
      )
      setCharacters((characters) => {
        return produce(characters, (draft) => {
          draft.loading = false
          draft.data = data
        })
      })
    } catch (error) {
      setCharacters((characters) => {
        return produce(characters, (draft) => {
          draft.loading = false
          draft.errorMsg = 'Failed to fetch characters'
        })
      })
    }
  }, [])

  // Below states and actions can be used anywhere in the App easily by using the "useContext" hook
  const contextValue = {
    states: {
      characters,
    },
    actions: {
      fetchAndSetCharacters,
    },
  }
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppProvider
