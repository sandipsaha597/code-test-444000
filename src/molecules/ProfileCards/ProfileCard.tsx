import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RightAngleIcon } from '../../atoms/Icons/Icons'
import { Character } from '../../types/rickyAndMontyApi'

//  profile card shows basic details of a character
//  By clicking the 'See Profile' button in the card, user goes to profile page of that character which shows all the details
const ProfileCard = ({ character }: { character: Character }) => {
  return (
    <Card>
      {/* character image */}
      <StyledCardMedia
        component="img"
        image={character.image}
        alt={character.name}
      />
      {/* "CardContent" contains character's basic info */}
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          name: {character.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          status: {character.status}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          gender: {character.gender}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          spices: {character.species}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          origin: {character.origin.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          location: {character.location.name}
        </Typography>
      </CardContent>

      {/* Button and other actions goes in the 'CardActions' */}
      <CardActions>
        {/*   By clicking the 'See Profile' button/link below, user goes to profile page of the character which shows all the details of the character */}
        <Link to={`/character/${character.id}`}>
          <Button variant="outlined" endIcon={<RightAngleIcon />}>
            See profile
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default ProfileCard

// Styling image of the card
const StyledCardMedia = styled(CardMedia)`
  &.MuiCardMedia-img {
    object-fit: contain;
    width: 70%;
    margin: auto;
  }
` as typeof CardMedia
