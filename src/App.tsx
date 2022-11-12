import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
// app.css only contains global styles
import './App.css'

const App = () => {
  return (
    <Container className="App">
      {/* Routes setup */}
      <Routes>
        {/* The "homepage" shows the app title and displays all character profiles in a grid of cards. */}
        {/* User can browse all character in a paginated manner. Each page shows 20 profiles. */}
        <Route index element={<HomePage />} />
        {/* When the user clicks on <BrowseAllCharacter />'s paginationItem, they visit the below route */}
        <Route
          path="/browseAllCharacters/page/:pageNumber"
          element={<HomePage />}
        />
        {/* The "ProfilePage" shows full profile of a character. All info. */}
        {/* The ":characterId" param determines which profile will the shown */}
        {/* When the user clicks on the "See profile" button on the "<ProfileCard />" component, they visit the below route */}
        <Route path="/character/:characterId" element={<ProfilePage />} />
        {/* 404 page */}
        <Route path="*" element={<h1>Page does not exist</h1>} />
      </Routes>
    </Container>
  )
}

export default App
