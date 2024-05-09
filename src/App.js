import { Routes, Route } from 'react-router-dom'
import './App.css'

import AppContext from './context/AppContext'
import { APP_CONTEXT_VALUES } from './context/APP_CONTEXT_VALUES'

import Home from './Home'
import Investors from './investors/Investors'
import Commitments from './investors/commitments/Commitments'
import NotFound from './common/NotFound'
import Navigation from './theme/Navigation'

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
        <Typography variant='h2' component='h1' gutterBottom id='title'>
          Investor App
        </Typography>
        <AppContext.Provider value={APP_CONTEXT_VALUES}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/investors' element={<Investors />} />
            <Route path='/investor/:id' element={<Commitments />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Navigation />
        </AppContext.Provider>
      </Container>
    </ThemeProvider>
  )
}

export default App
