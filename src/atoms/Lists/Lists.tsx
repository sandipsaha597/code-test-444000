import { Typography } from '@mui/material'

// This components shows profile data in a list view
const ProfileDataList = ({ profileData }: any) => {
  return (
    <>
      <ul>
        <li>
          <Typography>Name: {profileData.name}</Typography>
        </li>
        <li>
          <Typography>Gender: {profileData.gender}</Typography>
        </li>
        <li>
          <Typography>Type: {profileData.type}</Typography>
        </li>
        <li>
          <Typography>Species: {profileData.species}</Typography>
        </li>
        <li>
          <Typography>Status: {profileData.status}</Typography>
        </li>
        <li>
          <Typography>Origin: {profileData.origin?.name}</Typography>
        </li>

        {/* if "origin.url" is an empty string or origin.name is unknown  */}
        {/* then origin(.type, .dimension, .residents) won't exist */}
        {profileData.origin?.url && (
          <>
            <li>
              <Typography>Origin Type: {profileData.origin.type}</Typography>
            </li>
            <li>
              <Typography>
                Origin Dimension: {profileData.origin.dimension}
              </Typography>
            </li>
            <li>
              <Typography>
                Origin No. of residents:
                {profileData.origin.residents?.length}
              </Typography>
            </li>
          </>
        )}

        <li>
          <Typography>
            Current Location: {profileData.location?.name}
          </Typography>
        </li>
        {/* if "location.url" is an empty string or location.name is unknown  */}
        {/* then location(.type, .dimension, .residents) won't exist */}
        {profileData.location?.url && (
          <>
            <li>
              <Typography>
                Current Location Type: {profileData.location.type}
              </Typography>
            </li>
            <li>
              <Typography>
                Current Location Dimension: {profileData.location.dimension}
              </Typography>
            </li>
            <li>
              <Typography>
                Current Location No. of residents:
                {profileData.location.residents?.length}
              </Typography>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default ProfileDataList
