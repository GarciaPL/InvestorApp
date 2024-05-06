import "./App.css";

import Investors from './investors/Investors'

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        className="App"
        component="main"
        sx={{ mt: 8, mb: 2 }}
        maxWidth="sm"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Investor App
        </Typography>
        <Investors />
      </Container>
    </ThemeProvider>
  );
}

export default App;
