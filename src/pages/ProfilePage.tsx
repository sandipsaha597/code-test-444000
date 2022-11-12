import { Chip, Grid, Typography } from '@mui/material'
import axios from 'axios'
import produce from 'immer'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../AppContext/AppContext'
import ProfileDataList from '../atoms/Lists/Lists'
import { Character } from '../types/rickyAndMontyApi'
import { getCharacterInfo } from '../utils/utilFunctions'
import { rickAndMorty } from '../utils/utilVariables'

const ProfilePage = () => {
  // Characters state have 20 character at a time.
  // Which 20 character depends on the current page
  // "character.data" contains the array of character

  // When the characters are getting fetched the "loading" property becomes true
  // It becomes false when the fetching is done(successful or failed)
  // If successful the data property contains 20 characters with their info
  // If failed the "errorMsg" contains an error message otherwise it stays undefined
  const {
    states: { characters },
  } = useContext<any>(AppContext)

  // All the character's data gets merged together in "profileData" state
  // character's basic info + location's complete info(origin + current location)
  // and details of all the episodes the character was featured in
  const [profileData, setProfileData] = useState<any>({})
  // based on this "characterId" param profileData changes
  const { characterId } = useParams()

  useEffect(() => {
    ;(async () => {
      try {
        // Get character info. If available locally it will return it without making an API call
        // other API calls in this function depends on the character's info
        // that is why it's using await and other API calls are concurrent
        const character: any = await getCharacterInfo(
          Number(characterId),
          characters.data.results || [],
        )
        setProfileData(character)

        // get and set both the character's locations, origin + current location
        // could fetch both the locations at once but the code was getting really complication
        // that's why getting location separately for better readability
        if (character.origin.url) {
          axios.get(character.origin.url).then(({ data }) =>
            setProfileData((profileData: Character) => {
              return produce(profileData, (draft) => {
                draft.origin = data
              })
            }),
          )
        }

        // url can be an empty string
        if (character.location.url) {
          axios.get(character.location.url).then(({ data }) =>
            setProfileData((profileData: Character) => {
              return produce(profileData, (draft) => {
                draft.location = data
              })
            }),
          )
        }

        // Get all episode's info the character is featured in.
        // Create an array of episode ids the character is featured in
        const episodeIds = character.episode.map((v: string) => {
          return v.split('/')[v.split('/').length - 1]
        })

        if (episodeIds.length) {
          // Can fetch multiple episode infos by providing array of episode([1,2,6])
          // or string ('1,2,6')
          // If we pass one episode id (rickAndMorty.episode/5) it will return an Object
          // If we pass multiple episode ids (rickAndMorty.episode/5,4,7) it will return an Array
          axios
            .get(`${rickAndMorty.episode}/${episodeIds}`)
            .then(({ data }) => {
              setProfileData((profileData: Character) => {
                return produce(profileData, (draft) => {
                  // Saving one dimensional Array
                  const temp = [data]
                  draft.episode = temp.flat()
                })
              })
            })
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [characterId, characters])
  return (
    <div>
      <Typography variant="h3" component="h1" gutterBottom>
        Full Profile:
      </Typography>
      <Grid container spacing={5}>
        {/* On small screen it will cover 100% width  */}
        {/* On medium and above 50%*/}
        {/* Character Avatar */}
        <Grid item sm={12} md={6} textAlign="center">
          <img src={profileData.image} alt={profileData.name} />
        </Grid>
        {/* On small screen it will cover 100% width  */}
        {/* On medium and above 50%*/}
        <Grid item sm={12} md={6}>
          {/* Displays profile's all info in a simple list view */}
          <ProfileDataList profileData={profileData} />
        </Grid>

        {/* Episode names section will cover 100% width */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Episodes:
          </Typography>
          {/* if profileData.episode?.[0].id is undefined that means is Loading... */}
          {profileData.episode?.[0].id && (
            // will show a auto sized grid with all the episode names the character is featured in
            <Grid container spacing={2}>
              {profileData.episode?.map((v: any) => (
                <Grid item key={String(v.id)}>
                  <Chip label={v.name} variant="outlined" />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfilePage
