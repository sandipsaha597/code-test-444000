import axios, { AxiosResponse } from 'axios'
import { Episode } from '../../types/rickyAndMontyApi'
import { rickAndMorty } from '../utilVariables'

const episodesMemo: Record<string | number, Episode> = {}
const getEpisodes = async (episodeIds: string[]) => {
  const filteredEpisodeIds = episodeIds.filter((v) => {
    return !episodesMemo[v]
  })

  let axiosResponse:
    | AxiosResponse<Episode[] | Episode>
    | 'evaluated from episodeMemo' = 'evaluated from episodeMemo'
  if (filteredEpisodeIds.length) {
    try {
      // Can fetch multiple episode infos by providing array of episode([1,2,6])
      // or string ('1,2,6')
      // If we pass one episode id (rickAndMorty.episode/5) it will return an Object
      // If we pass multiple episode ids (rickAndMorty.episode/5,4,7) it will return an Array
      const data = await axios.get<Episode[] | Episode>(
        `${rickAndMorty.episode}/${filteredEpisodeIds}`,
      )
      axiosResponse = data
      const { data: episodeData } = data
      const oneDimensionalEpisodeData = [episodeData].flat()
      // memoize data
      // [episodeData].flat()
      oneDimensionalEpisodeData.forEach((v) => {
        episodesMemo[v.id] = v
      })
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }
  const episodeData = episodeIds.map((v) => episodesMemo[v])
  return { episodeData, axiosResponse }
}

export default getEpisodes
