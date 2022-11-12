import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Grid, Pagination, PaginationItem, Typography } from '@mui/material'
import styled from 'styled-components'
import { AppContext } from '../../AppContext/AppContext'
import ProfileCard from '../../molecules/ProfileCards/ProfileCard'
import { Character } from '../../types/rickyAndMontyApi'

// Can browser all characters in paginated way.
// Each page contains 20 characters.
// By clicking "See Profile" button, the user will go to profile page of a particular character
const BrowseAllCharacters = () => {
  const {
    // Characters state have 20 character at a time.
    // Which 20 character depends on the current page
    // "character.data" contains the array of character

    // When the characters are getting fetched the "loading" property becomes true
    // It becomes false when the fetching is done(successful or failed)
    // If successful the data property contains 20 characters with their info
    // If failed the "errorMsg" contains an error message otherwise it stays undefined
    states: { characters },
    // will fetch and set the characters for a particular page
    // "fetchAndSetCharacters" is a context api action and will set the "characters" state in AppContext
    actions: { fetchAndSetCharacters },
  } = useContext(AppContext)
  // based on this pagenumber character grid changes
  const { pageNumber } = useParams()

  useEffect(() => {
    // Will page fetch and set on page initial load
    // Will reset, fetch and set again whenever the pageNumber changes
    fetchAndSetCharacters(pageNumber)
  }, [pageNumber, fetchAndSetCharacters])
  return (
    <>
      <Grid container spacing={4}>
        {characters.errorMsg ? (
          characters.errorMsg
        ) : characters.loading ? (
          <Typography>Loading</Typography>
        ) : (
          // Profiles of characters display in a grid view of cards
          characters.data.results?.map((character: Character) => (
            // on small screens it shows 1 card in a row, on medium 2 and on large 4 cards/items/profiles
            <Grid key={character.id} item xs={12} sm={6} lg={4}>
              {/* profile card shows basic details of a character */}
              {/* By clicking the "See Profile" button in the card, user goes to profile page of that character which shows all the details  */}
              <ProfileCard character={character} />
            </Grid>
          ))
        )}
      </Grid>

      {/* Mui v5 pagination component. More info: https://mui.com/material-ui/react-pagination/ */}
      {/* Pagination for browsing all character */}
      <StyledPagination
        count={characters.data.info?.pages}
        // Homepage("/") won't have the "pageNumber" param that's why providing a fallback "1" the first page
        page={Number(pageNumber) || 1}
        variant="outlined"
        shape="rounded"
        disabled={characters.loading}
        renderItem={(item) => (
          <PaginationItem
            // using "Link" component provided by react router v6 as root component of every "PaginationItem"
            component={Link}
            // Below "to" prop is a "Link" component prop not a "PaginationItem" prop
            to={`/browseAllCharacters/page/${item.page}`}
            {...item}
          />
        )}
      />
    </>
  )
}

export default BrowseAllCharacters

// Aligning on right side and providing space.
const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`
