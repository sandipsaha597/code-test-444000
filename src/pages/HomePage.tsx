import { Typography } from '@mui/material'
import { useState } from 'react'
import BrowseAllCharacters from '../organism/BrowseAllCharacters/BrowseAllCharacters'

const HomePage = () => {
  const [value, setValue] = useState(10)
  // from this page user can browse all the characters
  // and see their profiles by clicking "See Profile" button
  return (
    <>
      <CustomInput
        value={value}
        onChange={(value: any) => setValue(Number(value.split(',').join('')))}
      />
      <Typography align="center" variant="h3" component="h1" mb={6} mt={3}>
        Profiles of the Rick & Morty sitcom
      </Typography>
      <BrowseAllCharacters />
    </>
  )
}

export default HomePage

const CustomInput = ({ value, onChange }: any) => {
  const change = (e: any) => {
    onChange(e.target.value)
    console.log('change', typeof e.target.value)
  }
  console.log(typeof value)
  return <input value={value.toLocaleString('en-IN')} onChange={change} />
}
