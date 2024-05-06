import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './Home'
import Investors from './investors/Investors'
import NotFound from './common/NotFound'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const defaultTheme = createTheme()

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        className='App'
        component='main'
        sx={{ mt: 8, mb: 2 }}
        maxWidth='sm'
      >
        <Typography variant='h2' component='h1' gutterBottom>
          Investor App
        </Typography>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/investors' element={<Investors />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
