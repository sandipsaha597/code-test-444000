import { Typography } from '@mui/material'
import BrowseAllCharacters from '../organism/BrowseAllCharacters/BrowseAllCharacters'

const HomePage = () => {
  // from this page user can browse all the characters
  // and see their profiles by clicking "See Profile" button
  return (
    <>
      <Typography align="center" variant="h3" component="h1" mb={6} mt={3}>
        Profiles of the Rick & Morty sitcom
      </Typography>
      <BrowseAllCharacters />
    </>
  )
}

export default HomePage
